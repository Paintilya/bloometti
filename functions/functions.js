const MongoClient = require('mongodb').MongoClient;
var Long = require('mongodb').Long;
const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

// A function to verify if a user is a Bloometti developer using it's Discord user ID
// Later will be changed to looking for the rank in the database or something
exports.isDeveloper = async function(userId) {
    await client.connect();
    const dbo = client.db("bloometti");
    const collection = dbo.collection("users");
    const query = { discordID: Long.fromString(userId) };
    const user = await collection.findOne(query);
    if (user.rankID == 1) return true;
    return false;
};

exports.findData = async function(userId, collectionName) {
    await client.connect();
    const dbo = client.db("bloometti");
    const collection = dbo.collection(collectionName);
    const query = { discordID: Long.fromString(userId) };
    const user = await collection.findOne(query);
    return user;
};

exports.randomInt = function(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
};

exports.templateFunction = function() {
    console.log("Template function");
};