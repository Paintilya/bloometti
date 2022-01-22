const { SlashCommandBuilder } = require('@discordjs/builders');
const functions = require('../functions/functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get the current ping of the bot.'),

	async execute(interaction, client) {
        const ephemeralMode = await functions.getEphemeralMode(interaction.user.id);
        interaction.reply({ ephemeral: ephemeralMode, content: `Current ping: ${client.ws.ping}ms`});
	}
};