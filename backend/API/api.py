import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

import json
import datetime
import random
from JetOut.settings import sabre_client_credentials, unsplash_client_credentials
from .models import Keyword, Image

import time

DEFAULT_TIMEOUT = 5
baseSabreUrl = 'https://api-crt.cert.havail.sabre.com'
baseUnsplashUrl = 'https://api.unsplash.com'


class TimeoutHTTPAdapter(HTTPAdapter):
    def __init__(self, *args, **kwargs):
        self.timeout = DEFAULT_TIMEOUT
        if "timeout" in kwargs:
            self.timeout = kwargs["timeout"]
            del kwargs["timeout"]
        super().__init__(*args, **kwargs)

    def send(self, request, **kwargs):
        timeout = kwargs.get("timeout")
        if timeout is None:
            kwargs["timeout"] = self.timeout
        return super().send(request, **kwargs)


http = requests.Session()
retries = Retry(total=10, backoff_factor=1,
                status_forcelist=[429, 500, 502, 503, 504])
http.mount("https://", TimeoutHTTPAdapter(max_retries=retries))


with open('backend/airlines.json') as f:
    data = json.load(f)
    airlineDict = dict(zip([i['iata'] for i in data], data))


with open('backend/airports.json') as f:
    data = json.load(f)
    airportDict = dict(zip([i['code'] for i in data], data))
    domesticList = [i['code'] for i in data if i['country']=='United States']


def printErrors(name, headers, response, params={}, data={}):
    print('$'*25)
    print('writing out response')
    with open('%s.txt' % name, 'w') as f:
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
        request = http.get('%s/search/photos' %
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
    response = http.post('%s/v2/auth/token' %
                         baseSabreUrl, headers=headers, data=body)

    return response.json()['access_token']


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

    response = http.get('%s/v2/shop/flights/fares' %
                        baseSabreUrl, headers=headers, params=params)

    printErrors('getFares', headers, response, params=params)

    with open('backend/travel_data.json', 'w') as f:
        json.dump(response.json(), f)

    data = response.json()

    # with open('backend/travel_data.json') as f:
    #     data = json.load(f)

    return data


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
    response = http.get('%s/v1/shop/flights' %
                        baseSabreUrl, headers=headers, params=params)

    printErrors('getFareDetails', headers, response, params=params)
    with open('backend/fare_data.json', 'w') as f:
        json.dump(response.json(), f)

    data = response.json()

    # with open('backend/fare_data.json') as f:
    #     data = json.load(f)

    return data


def filterFares(faresJson, destinationFilter):
    if faresJson.get('message') == 'No results were found':
        return []

    if destinationFilter == 'domestic':
        faresJson['FareInfo'] = [i for i in faresJson['FareInfo'] if i['DestinationLocation'] in domesticList]
    elif destinationFilter == 'international':
        faresJson['FareInfo'] = [i for i in faresJson['FareInfo'] if i['DestinationLocation'] not in domesticList]
    print('^'*25)
    print(len(faresJson['FareInfo']))

    priceDict = {}
    for fare in faresJson['FareInfo']:
        priceDict.setdefault(int(fare['LowestFare']['Fare']), []).append(fare)

    fares = {}
    for price in sorted(priceDict.keys())[:5]:
        for fare in priceDict[price]:
            fullPrice = fare['LowestFare']['Fare']
            city = airportDict[fare['DestinationLocation']]['city']
            origin = faresJson['OriginLocation']
            imageUrls = getImage(city) + getImage('travel')
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


def filterDetails(faresJson, price):
    fares = [i for i in faresJson['PricedItineraries'] if float(
        i['AirItineraryPricingInfo']['ItinTotalFare']['TotalFare']['Amount']) == price]
    if len(fares) == 0:
        return fares

    return fares
