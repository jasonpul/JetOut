import requests
import json
import datetime
import random
from JetOut.settings import sabre_client_credentials, unsplash_client_credentials
from .models import Keyword, Image
import time

baseSabreUrl = 'https://api-crt.cert.havail.sabre.com'
baseUnsplashUrl = 'https://api.unsplash.com'

def printErrors(headers, response, params={}, data={}):
    
    print('$'*25)
    print('caught error, writing out...')
    
    with open('error_%u' % int(time.time()), 'w') as f:
        f.write('$'*25 + '\n')
        f.write('headers\n')
        json.dump(headers, f)
        f.write('\n\n')
        
        f.write('$'*25 + '\n')
        f.write('params\n')
        json.dump(params, f)
        f.write('\n\n')
        
        f.write('$'*25 + '\n')
        f.write('data\n')
        json.dump(data, f)
        f.write('\n\n')
        
        f.write('$'*25 + '\n')
        f.write('response\n')
        json.dump(response.json(), f)
        f.write('\n\n')

        f.write('$'*25 + '\n')
        f.write('status code\n')
        f.write('%u' % response.status_code)
        

with open('backend/ISO-3166.json') as f:
    data = json.load(f)
    internationalList = ','.join([i['alpha-2']
                                  for i in data if i['alpha-2'] != 'US'])

with open('backend/airlines.json') as f:
    data = json.load(f)
    airlineDict = dict(zip([i['iata'] for i in data], data))


with open('backend/airports.json') as f:
    data = json.load(f)
    airportDict = dict(zip([i['code'] for i in data], data))


def getImage(query):
    keyword = Keyword.objects.filter(keyword__icontains=query)
    if len(keyword) > 0:
        images = keyword[0].images.all()
    else:
        keyword = Keyword.objects.create(keyword=query)
        params = {
            'client_id': unsplash_client_credentials,
            'query': query,
            'page': 1,
        }
        request = requests.get('%s/search/photos' %
                               baseUnsplashUrl, headers={}, params=params)
        images = [keyword.images.create(url=i['urls']['regular'])
                  for i in request.json()['results'][:5]]
    images = list(images)
    random.shuffle(images)
    return [i.url for i in images][:2]


def getToken():
    headers = {
        'Authorization': 'Basic %s' % sabre_client_credentials,
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    body = {'grant_type': 'client_credentials'}
    request = requests.post('%s/v2/auth/token' %
                            baseSabreUrl, headers=headers, data=body)

    # if request.status_code == 200:
    #     return request.json()['access_token']
    # else:
    #     raise Exception(request.text)

    return request.json()['access_token']


def getFares(token, origin, departureDate, returnDate, destinationFilter=None, minFare=0):
    headers = {
        'Authorization': 'Bearer %s' % token,
        'accept': 'application/json',
    }
    params = {
        'origin': origin,
        'departuredate': departureDate,
        'returndate': returnDate,
        'minfare': minFare,
    }
    if destinationFilter == 'domestic':
        params['location'] = 'US'
    if destinationFilter == 'international':
        params['location'] = internationalList

    response = requests.get('%s/v2/shop/flights/fares' %
                            baseSabreUrl, headers=headers, params=params)
    
    #-----------------------------------
    if response.status_code != 200:
        printErrors(headers, response, params=params)

    with open('backend/travel_data.json', 'w') as f:
        json.dump(response.json(), f)
    
    with open('backend/travel_data.json') as f:
        data = json.load(f)

    return data


def filterFares(faresJson):
    priceDict = {}
    for fare in faresJson['FareInfo']:
        priceDict.setdefault(int(fare['LowestFare']['Fare']), []).append(fare)

    fares = {}
    for price in sorted(priceDict.keys())[:5]:
        for fare in priceDict[price]:
            fullPrice = fare['LowestFare']['Fare']
            city = airportDict[fare['DestinationLocation']]['city']
            origin = faresJson['OriginLocation']
            imageUrls = getImage(city)
            imageUrl1 = imageUrls[0]
            imageUrl2 = imageUrls[1]
            destinationAirportName = airportDict[fare['DestinationLocation']]['name']
            destinationAirportCode = fare['DestinationLocation']
            departureTime = datetime.datetime.strptime(
                fare['DepartureDateTime'], '%Y-%m-%dT%H:%M:%S')
            returnTime = datetime.datetime.strptime(
                fare['ReturnDateTime'], '%Y-%m-%dT%H:%M:%S')
            fares.setdefault(price, []).append(
                {
                    'fullPrice': fullPrice,
                    'departureAirportCode': origin,
                    'imageUrl1': imageUrl1,
                    'imageUrl2': imageUrl2,
                    'destinationName': city,
                    'destinationAirportName': destinationAirportName,
                    'destinationAirportCode': destinationAirportCode,
                    'departureTime': departureTime,
                    'returnTime': returnTime,
                    'airlines': [{'name': airlineDict[i]['name']} for i in fare['LowestFare']['AirlineCodes']],
                }
            )

    fares = [(key, fares[key]) for key in fares.keys()]
    return fares


def getFareDetails(token, origin, destination, departureDate, returnDate, price):

    headers = {
        'Authorization': 'Bearer %s' % token,
        'accept': 'application/json',
    }

    params = {
        'origin': origin,
        'destination': destination,
        'departuredate': departureDate,
        'returndate': returnDate,
        'pointofsalecountry': 'US',

    }
    response = requests.get('%s/v1/shop/flights' %
                            baseSabreUrl, headers=headers, params=params)
    
    #-----------------------------------
    if response.status_code != 200:
        printErrors(headers, response, params=params)
            

    with open('backend/fare_data.json', 'w') as f:
        json.dump(response.json(), f)

    with open('backend/fare_data.json') as f:
        data = json.load(f)
    
    fares = [i for i in data['PricedItineraries'] if float(i['AirItineraryPricingInfo']['ItinTotalFare']['TotalFare']['Amount'])==price]
    return fares