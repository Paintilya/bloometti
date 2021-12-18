const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');
    
const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationGuildCommands(clientId, "841818810482425896"))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationGuildCommands(clientId, "841818810482425896")}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
            console.log("Removed command.")
        }
        return Promise.all(promises);
    });

/*
**************************
     Very rudimentary
**************************
*/