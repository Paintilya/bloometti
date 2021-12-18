const { SlashCommandBuilder } = require('@discordjs/builders');
const { Application } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('Shutdown the bot.'),
	async execute(interaction) {
		await interaction.reply({ content: '🥱', ephemeral: true });
        process.exit(0);
	}
};