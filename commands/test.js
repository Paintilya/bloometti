const { SlashCommandBuilder } = require('@discordjs/builders');
const { Application, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('A command for testing.'),
	async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('yes')
                    .setLabel('Yes')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('no')
                    .setLabel('No')
                    .setStyle('DANGER')
            );

		await interaction.reply({ ephemeral: true, content: 'Yes or no ?', components: [row]});

        const filter = interaction => (interaction.customId === 'yes' || interaction.customId === 'no') && interaction.user.id === '364532141083852821';

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async interaction => {
            if (interaction.customId === 'yes') {
                await interaction.update({ ephemeral: true, content: 'Yes was clicked!', components: [] });
                collector.stop();
            } else {
                await interaction.update({ ephemeral: true, content: 'No was clicked!', components: [] });
                collector.stop();
            }
        });
	}
};