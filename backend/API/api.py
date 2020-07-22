import requests
import json
import datetime
from JetOut.settings import client_credentials
# from JetOut import settings
# client_credentials = settings.client_credentials


baseUrl = 'https://api-crt.cert.havail.sabre.com'

with open('ISO-3166.json') as f:
    data = json.load(f)
    internationalList = ','.join([i['alpha-2']
                                  for i in data if i['alpha-2'] != 'US'])
with open('airlines.json') as f:
    data = json.load(f)
    airlineDict = dict(zip([i['iata'] for i in data], data))

with open('airports.json') as f:
    data = json.load(f)
    airportDict = dict(zip([i['code'] for i in data], data))


def getToken():
    headers = {
        'Authorization': 'Basic %s' % client_credentials,
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    body = {'grant_type': 'client_credentials'}
    request = requests.post('%s/v2/auth/token' %
                            baseUrl, headers=headers, data=body)

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

    # response = requests.get('%s/v2/shop/flights/fares' %
    #                         baseUrl, headers=headers, params=params)

    with open('travel_data.json') as f:
        data = json.load(f)

    return data


def filterFares(faresJson):
    priceDict = {}
    for fare in faresJson['FareInfo']:
        priceDict.setdefault(fare['LowestFare']['Fare'], []).append(fare)

    fares = {}
    for price in sorted(priceDict.keys())[:5]:
        for fare in priceDict[price]:
            fares.setdefault(price, []).append(
                {
                    'departureAirportCode': faresJson['OriginLocation'],
                    'destinationAirportName': airportDict[fare['DestinationLocation']]['name'],
                    'destinationAirportCode': fare['DestinationLocation'],
                    'departureTime': datetime.datetime.strptime(fare['DepartureDateTime'], '%Y-%m-%dT%H:%M:%S'),
                    'returnTime': datetime.datetime.strptime(fare['ReturnDateTime'], '%Y-%m-%dT%H:%M:%S'),
                    'airlines': [{'name': airlineDict[i]['name']} for i in fare['LowestFare']['AirlineCodes']],
                }
            )
    return fares


faresJson = getFares('', 'LAX', 'a', 'a')
fares = filterFares(faresJson)
import os
print(os.getcwd())