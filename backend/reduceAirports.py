import json

with open('backend/airports.json') as f:
    data = json.load(f)

newData = [{'code': i['code'], 'city': i['city']} for i in data]
index = sorted([(city['city'], i) for i, city in enumerate(newData)])
newData = [newData[index[i][1]] for i in range(len(newData))]
newData = newData[28:] + [newData[27],] + newData[:27]
with open('backend/reducedAirports.json', 'w') as f:
    json.dump(newData, f)