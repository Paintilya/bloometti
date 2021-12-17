const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yolo')
		.setDescription('Replies with yolo'),
	async execute(interaction) {
		await interaction.reply('yolo');
	},
};