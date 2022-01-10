const { SlashCommandBuilder } = require('@discordjs/builders');
const functions = require('../functions/functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mongodb')
		.setDescription('Database testing'),

	async execute(interaction) {
        // Verify if user has permission to use the command
        if (!functions.isDeveloper(interaction.user.id)) { await interaction.reply({ ephemeral: true, content: 'You can\'t use this command!'}); return };

        // Finds the user's information
        const user = await functions.findData(interaction.user.id, "users")
        const username = user.username;

        await interaction.reply({ ephemeral: defaultEphemeral, content: `Hello, ${username}` });
    }
};