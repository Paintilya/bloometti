const { SlashCommandBuilder } = require('@discordjs/builders');
const functions = require('../functions/functions.js');
const { bloomered, defaultEphemeral } = require('../main_parameters.json');
const MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://localhost:27017';
const client = new MongoClient(URL);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mongodb')
		.setDescription('Database manipulation.'),

	async execute(interaction) {
        await client.connect();
        const dbo = client.db('bloometti');
        const collection = dbo.collection('chatting');
        db.users.find().forEach( function(myDoc) { print( "user: " + myDoc.name ); } );
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
    }
};