from pymongo import MongoClient
from termcolor import colored
import sys

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

allCommands = ["seeAllUsers", "findUserById", "exit"]
allUserCollections = ["levels", "users", "actions", "inventories"]
allNonUserCollections = ["progressbars", "profileemojis", "ranks"]
allShopCollections = ["progressbars", "profileemojis"]

class commands():
    
    def seeAllUsers():
        question = colored("Enter collection name > ", "white", attrs=["bold"])
        collection = input(question)
        if collection not in allUserCollections:
            if collection in allNonUserCollections:
                print("This collection does not contain any users...")
            else:
                print("This collection doesn't exist...")
        else:
            print("\n")
            if collection == "levels":
                allUsers = levels.find()
                oddOrEven = 1
                for x in allUsers:
                    name = x["name"]
                    discordID = x["discordID"]
                    levellingExperience = x["levellingExperience"]
                    lastExperienceTime = x["lastExperienceTime"]
                    numberOfMessagesLastMinute = x["numberOfMessagesLastMinute"]
                    if oddOrEven % 2 == 0:
                        print(colored(f"{name} ({discordID}), has {levellingExperience} xp. Last XP award: {lastExperienceTime}. Number of messages last minute: {numberOfMessagesLastMinute}\n\n", "blue"))
                    else:
                        print(colored(f"{name} ({discordID}), has {levellingExperience} xp. Last XP award: {lastExperienceTime}. Number of messages last minute: {numberOfMessagesLastMinute}\n\n", "cyan"))
                    oddOrEven += 1
                askCommand()

            if collection == "users":
                allUsers = users.find()
                oddOrEven = 1
                for x in allUsers:
                    name = x["username"]
                    discordID = x["discordID"]
                    rankID = x["rankID"]
                    rank = ranks.find_one({"rankID": rankID})
                    rankName = rank["rankName"]
                    if oddOrEven % 2 == 0:
                        print(colored(f"{name} ({discordID}), has rank ID {rankID} ({rankName}).\n\n", "blue"))
                    else:
                        print(colored(f"{name} ({discordID}), has rank ID {rankID} ({rankName}).\n\n", "cyan"))
                    oddOrEven += 1
                askCommand()

            if collection == "actions":
                allUsers = actions.find()
                oddOrEven = 1
                for x in allUsers:
                    name = x["name"]
                    discordID = x["discordID"]
                    lastWorkTime = x["lastWorkTime"]
                    lastRobTime = x["lastRobTime"]
                    if oddOrEven % 2 == 0:
                        print(colored(f"{name} ({discordID}). Last work time : {lastWorkTime}. Last rob time : {lastRobTime}.\n\n", "blue"))
                    else:
                        print(colored(f"{name} ({discordID}). Last work time : {lastWorkTime}. Last rob time : {lastRobTime}.\n\n", "cyan"))
                    oddOrEven += 1
                askCommand()

            if collection == "inventories":
                allUsers = inventories.find()
                oddOrEven = 1
                for x in allUsers:
                    name = x["name"]
                    discordID = x["discordID"]
                    bankBalance = x["bankBalance"]
                    equippedProgressBar = x["equippedProgressBar"]
                    equipedProfileEmoji = x["equippedProfileEmoji"]
                    progressBars = x["progressBars"]
                    profileEmojis = x["profileEmojis"]
                    if oddOrEven % 2 == 0:
                        print(colored(f"{name} ({discordID}) has {bankBalance}$. Equipped progress bar: {equippedProgressBar}. Equipped profile emoji: {equipedProfileEmoji}\nProgress bars IDs array: {progressBars}\nProfile emojis array: {profileEmojis}\n\n", "blue"))
                    else:
                        print(colored(f"{name} ({discordID}) has {bankBalance}$. Equipped progress bar: {equippedProgressBar}. Equipped profile emoji: {equipedProfileEmoji}\nProgress bars IDs array: {progressBars}\nProfile emojis array: {profileEmojis}\n\n", "cyan"))
                    oddOrEven += 1
                askCommand()
    
    def findUserById():
        question1 = colored("Enter discord ID > ", "white", attrs=["bold"])
        discordID = int(input(question1))
        question2 = colored("Enter collection name > ", "white", attrs=["bold"])
        collection = input(question2)
        if collection not in allUserCollections:
            if collection in allNonUserCollections:
                print("This collection does not contain any users...")
            else:
                print("This collection doesn't exist...")
        else:
            print("\n")
            if collection == "levels":
                user = levels.find_one({"discordID": discordID})
                name = user["name"]
                discordID = user["discordID"]
                levellingExperience = user["levellingExperience"]
                lastExperienceTime = user["lastExperienceTime"]
                numberOfMessagesLastMinute = user["numberOfMessagesLastMinute"]
                print(colored(f"{name} ({discordID}), has {levellingExperience} xp. Last XP award: {lastExperienceTime}. Number of messages last minute: {numberOfMessagesLastMinute}\n\n", "blue"))
                askCommand()

            if collection == "users":
                user = users.find_one({"discordID": discordID})
                name = user["username"]
                discordID = user["discordID"]
                rankID = user["rankID"]
                rank = ranks.find_one({"rankID": rankID})
                rankName = rank["rankName"]
                print(colored(f"{name} ({discordID}), has rank ID {rankID} ({rankName}).\n\n", "blue"))
                askCommand()

            if collection == "actions":
                user = actions.find_one({"discordID": discordID})
                name = user["name"]
                discordID = user["discordID"]
                lastWorkTime = user["lastWorkTime"]
                lastRobTime = user["lastRobTime"]
                print(colored(f"{name} ({discordID}). Last work time : {lastWorkTime}. Last rob time : {lastRobTime}.\n\n", "blue"))
                askCommand()

            if collection == "inventories":
                user = inventories.find_one({"discordID": discordID})
                name = user["name"]
                discordID = user["discordID"]
                bankBalance = user["bankBalance"]
                equippedProgressBar = user["equippedProgressBar"]
                equipedProfileEmoji = user["equippedProfileEmoji"]
                progressBars = user["progressBars"]
                profileEmojis = user["profileEmojis"]
                print(colored(f"{name} ({discordID}) has {bankBalance}$. Equipped progress bar: {equippedProgressBar}. Equipped profile emoji: {equipedProfileEmoji}\nProgress bars IDs array: {progressBars}\nProfile emojis array: {profileEmojis}\n\n", "blue"))
                askCommand()
    
    def exit():
        print("\n")
        print(colored("Bye!", "red"))
        print("\n")
        sys.exit()

def findCommand(command):
    if command == "seeAllUsers":
        commands.seeAllUsers()
    if command == "findUserById":
        commands.findUserById()
    if command == "exit":
        commands.exit()

def askCommand():
    question = colored("Enter a command > ", "white", attrs=["bold"])
    command = input(question)
    if command not in allCommands:
        print("This command doesn't exist...")
        askCommand()
    else:
        findCommand(command)

def home():
    print(colored("""\



__________.__                                
\______   \  |   ____   ____   _____   ____  
 |    |  _/  |  /  _ \ /  _ \ /     \_/ __ \ 
 |    |   \  |_(  <_> |  <_> )  Y Y  \  ___/ 
 |______  /____/\____/ \____/|__|_|  /\___  >
        \/                         \/     \/ 



    """, "blue"))

    print(colored("A command line tool to access Bloometti's MongoDB database.\n", "blue"))
    askCommand()