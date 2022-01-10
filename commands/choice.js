const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('choice')
		.setDescription('A command for testing buttons.'),
	async execute(interaction) {
        // Message's buttons creation
        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('yes-choice')
                    .setLabel('Yes')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('no-choice')
                    .setLabel('No')
                    .setStyle('DANGER')
            );

		await interaction.reply({ ephemeral: true, content: 'Yes or no ?', components: [buttons]});

        const authorId = interaction.user.id // Stores the ID of the user that used the command

        // A filter for collected interactions to see if they're from the right user and right button
        const filter = interaction => (interaction.customId === 'yes-choice' && interaction.user.id == authorId) || (interaction.customId === 'no-choice' && interaction.user.id == authorId);
        // Creates a interaction collector on the channel the command was used in with the above filter
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async interaction => {
            if (interaction.customId == 'yes-choice') await interaction.update({ ephemeral: true, content: 'You chose yes!', components: [] }) && collector.stop();
            if (interaction.customId == 'no-choice') await interaction.update({ ephemeral: true, content: 'You chose no!', components: [] }) && collector.stop();
            }
        );

        // Executes when the time runs out
        collector.on('end', interaction => interaction.update({ ephemeral: true, content: 'Time out.', components: [] }));
	}
};