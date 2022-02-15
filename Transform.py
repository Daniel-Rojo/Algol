import json
import math
import asyncio
from algoliasearch.search_client import SearchClient
from algoliasearch.configs import Config
from algoliasearch.http.hosts import Host, HostsCollection
from algoliasearch.search_client import SearchClient
from numpy import trunc


# Opening JSON file
f = open('./data/products.json')

# returns JSON object as
# a dictionary
data = json.load(f)

#---------------------------------------------- Iterating through the json list and adjust the price to a -20% and trunc intead of rounding
for i in range(len(data)):
  data[i]['price'] = (data[i]['price'])*0.80
  data[i]['price'] = trunc(data[i]['price'])
  #print(data[i]['price'])--------------------- Monitoring the list

# Closing file
f.close()

#---------------------------------------------- Transform Modify the json
with open('./data/products.json', 'w') as f:
    json.dump(data, f, indent=2)

f.close()

#---------------------------------------------- API authentication
client = SearchClient.create('HISADDXTSJ', '990315b8fe31facb05ffbee1e3b8016c')
index = client.init_index('DRIndex_Test')
#---------------------------------------------- Upload json
##index = client.init_index('contacts')
#batch = json.load(open('./data/products.json'))
#index.save_objects(batch, {'autoGenerateObjectIDIfNotExist': True})

#---------------------------------------------- Custom Ranking by Popularity and Price
index.set_settings({'customRanking':['desc(popularity)','asc(price)']})
