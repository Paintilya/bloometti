const { SlashCommandBuilder } = require('@discordjs/builders');
const functions = require('../functions/functions.js');
const { bloomered, defaultEphemeral } = require('../main_parameters.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mongodb')
		.setDescription('Database manipulation.'),

	async execute(interaction) {
        // Verify if user has permission to use the command
        //if (!functions.isDeveloper(interaction.user.id)) { await interaction.reply({ ephemeral: true, content: 'You can\'t use this command!'}); return };
        const user = await functions.findData(interaction.user.id, 'users');
        console.log(user.username);
    

    }
};