const MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://localhost:27017';
const client = new MongoClient(URL);

// A function to verify if a user is a Bloometti developer using it's Discord user ID
// Later will be changed to looking for the rank in the database or something
exports.isDeveloper = async function(userId) {
    await client.connect();
    const dbo = client.db('bloometti');
    const collection = dbo.collection('users');
    const query = { discordId: userId };
    const user = await collection.findOne(query);
    if (user.rankID == 1) return true;
    return false;
};

// Finds the data of a user in the database using it's userId and the desired database collection
exports.findData = async function(userId, collectionName) {
    await client.connect();
    const dbo = client.db('bloometti');
    const collection = dbo.collection(collectionName);
    const query = { discordId: userId };
    const user = await collection.findOne(query);
    return user;
};

// Chooses a random int between min and max, inclusively.
exports.randomInt = function(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
};

// Returns wheter or not the user exists in the database
exports.userExists = async function(userId) {
    await client.connect();
    const dbo = client.db('bloometti');
    const collection = dbo.collection('users');
    const query = { discordId: userId };
    const user = await collection.findOne(query);
    if (user == null) return false;
    return true;
};

// Adds a user to the database
exports.newUser = async function(userId, username) {
    await client.connect();
    const dbo = client.db('bloometti');
    const users = dbo.collection('users');
    const chatting = dbo.collection('chatting');
    const bankAccounts = dbo.collection('bankAccounts');

    const user = {
        discordId: userId,
        username: username,
        rankId: 0,
        ephemeral: false
    }

    const userChatting = {
        discordId: userId,
        username: username,
        messageCount: 0,
        exp: 0,
        level: 0,
        expTowardsNextLevel: 0,
        lastMessageTime: 0
    }

    const userBankAccount = {
        discordId: userId,
        username: username,
        bloomettiDollars: 0
    }

    await users.insertOne(user);
    await chatting.insertOne(userChatting);
    await bankAccounts.insertOne(userBankAccount);
};

// Adds a new collection to the database
exports.newCollection = async function(collectionName) {
    await client.connect();
    const dbo = client.db('bloometti');
    if (dbo.collection(collectionName) !== null) return 'Collection already exists';
    const collection = await dbo.createCollection(collectionName);
};

// Sets chatting stats using parameters
exports.setChattingStats = async function(discordId, username, newMessageCount, newExp, newLevel, newExpTowardsNextLevel, newLastMessageTime) {
    await client.connect();
    const dbo = client.db('bloometti');
    const collection = dbo.collection('chatting');

    const userChatting = {
        $set: {
            discordId: discordId,
            username: username,
            messageCount: newMessageCount,
            exp: newExp,
            level: newLevel,
            expTowardsNextLevel: newExpTowardsNextLevel,
            lastMessageTime: newLastMessageTime
        }
    };
    
    await collection.updateOne({discordId: discordId}, userChatting);
};

// Verify if a user has levelled up and returns an array: [true/false, newExpTowardsNextLevel]
exports.hasLevelledUpChatting = function(level, expTowardsNextLevel) {
    const expNeededToLevelUp = (level * (level + 1)) * 50

    if (expTowardsNextLevel >= expNeededToLevelUp) {
        const newExpTowardsNextLevel = expTowardsNextLevel - expNeededToLevelUp;
        return [true, newExpTowardsNextLevel];
    }
    return [false, expTowardsNextLevel];
}

exports.timeSinceEpoch = function() {
    return Math.round(Date.now() / 1000)
}

exports.templateFunction = function() {
    console.log('Template function');
};