import os, base64

client_id = os.environ.get('sabre_client_id')
client_secret = os.environ.get('sabre_client_secret')

client_id = base64.b64encode(bytes(client_id, 'utf-8'))
client_secret = base64.b64encode(bytes(client_secret, 'utf-8'))
client_credentials = '%s:%s' % (client_id.decode('utf-8'), client_secret.decode('utf-8'))
client_credentials = base64.b64encode(bytes(client_credentials, 'utf-8')).decode('utf-8')
print(client_credentials)