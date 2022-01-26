from pymongo import MongoClient
from termcolor import colored
import bloomefunctions

#Get Bloometti cluster from MongoDB
cluster = MongoClient('mongodb://localhost:27017')

#Define database tables
levels = cluster["bloometti"]["levels"]
users = cluster["bloometti"]["users"]
actions = cluster["bloometti"]["actions"]
inventories = cluster["bloometti"]["inventories"]
ranks = cluster["bloometti"]["ranks"]
progressbars = cluster["bloometti"]["progressbars"]
profileemojis = cluster["bloometti"]["profileemojis"]

bloomefunctions.home()