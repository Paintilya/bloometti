const { SlashCommandBuilder } = require('@discordjs/builders');
const functions = require('../functions/functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ephemeral')
		.setDescription('Toggle the ephemeral mode'),

	async execute(interaction) {
        const currentMode = await functions.getEphemeralMode(interaction.user.id);
        if (currentMode == true) {
            await functions.setEphemeralMode(interaction.user.id, false);
            interaction.reply({ ephemeral: true, content: 'Ephemeral mode toggled off.' });
            return;
        }
        await functions.setEphemeralMode(interaction.user.id, true);
        interaction.reply({ ephemeral: true, content: 'Ephemeral mode toggled on.' });
	}
};