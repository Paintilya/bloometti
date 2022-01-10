const { SlashCommandBuilder } = require('@discordjs/builders');
const functions = require('../functions/functions.js');
const { bloomered, defaultEphemeral } = require('../main_parameters.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('imperio')
		.setDescription('Make Bloometti say whatever you want.')
        .addStringOption(option =>
            option.setName('message')
            .setDescription('The message you want Bloometti to say.')
            .setRequired(true)),

	async execute(interaction) {
        // Verify if user has permission to use the command
        if (!functions.isDeveloper(interaction.user.id)) { await interaction.reply({ ephemeral: defaultEphemeral, content: 'You can\'t use this command!'}); return }
        await interaction.channel.send(interaction.options.getString('message'));
        await interaction.reply({ ephemeral: defaultEphemeral, content: 'Message sent.' });
	}
};