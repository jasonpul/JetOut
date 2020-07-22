import base64

with open('../keys.txt') as f:
    data = f.readlines()
client_id = data[0].split('=')[1].strip()
client_secret = data[1].split('=')[1].strip()

client_id = base64.b64encode(bytes(client_id, 'utf-8'))
client_secret = base64.b64encode(bytes(client_secret, 'utf-8'))
client_credentials = '%s:%s' % (client_id.decode('utf-8'), client_secret.decode('utf-8'))
client_credentials = base64.b64encode(bytes(client_credentials, 'utf-8')).decode('utf-8')
print(client_credentials)