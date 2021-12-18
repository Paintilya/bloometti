const { SlashCommandBuilder } = require('@discordjs/builders');
const { Application, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test command'),
	async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('danger-button')
                    .setLabel('Danger')
                    .setStyle('DANGER'),

                new MessageButton()
                    .setCustomId('success-button')
                    .setLabel('Success')
                    .setStyle('SUCCESS'),

                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('Primary')
                    .setStyle('PRIMARY'),
            );

		await interaction.reply({ ephemeral: true, content: 'Press a button !', components: [row]});
	},
};