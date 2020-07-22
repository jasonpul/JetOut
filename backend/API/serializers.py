from rest_framework import serializers


class FareSerializer(serializers.Serializer):
    departureAirportCode = serializers.CharField()
    destinationAirportName =  serializers.CharField()
    destinationAirportCode =  serializers.CharField()
    departureTime =  serializers.DateTimeField(format='%Y-%m-%d')
    returnTime =  serializers.DateTimeField(format='%Y-%m-%d')
    # airlines =  [airlineDict[i]['name'] for i in fare['LowestFare']['AirlineCodes']],