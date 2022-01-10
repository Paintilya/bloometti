const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const functions = require('../functions/functions.js');
const { color, defaultEphemeral } = require('../config.json'); // Import the configured color for the bot

module.exports = {
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restart the bot.'),
	async execute(interaction) {
        // Verify if user has permission to use the command
        if (!await functions.isDeveloper(interaction.user.id)) { await interaction.reply({ ephemeral: true, content: 'You can\'t use this command!'}); return }

        // Message's buttons creation
        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('yes-restart')
                .setLabel('Yes')
                .setStyle('SUCCESS'),

            new MessageButton()
                .setCustomId('no-restart')
                .setLabel('No')
                .setStyle('DANGER'),
        );

        await interaction.reply({ ephemeral: defaultEphemeral, content: 'Are you sure you want to restart the bot ?', components: [buttons] });

        const botAnswer = interaction; // Stores the first interaction, which contains the bot's reply. Used to modify the reply when the collector ends
        const authorId = interaction.user.id // Stores the ID of the user that used the command

        // A filter for collected interactions to see if they're from the right user and right button
        const filter = interaction => (interaction.customId === 'yes-restart' && interaction.user.id == authorId) || (interaction.customId === 'no-restart' && interaction.user.id == authorId);
        // Creates a interaction collector on the channel the command was used in with the above filter
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async interaction => {
                if (interaction.customId == 'yes-restart') { await interaction.update({ ephemeral: defaultEphemeral, content: 'Restarted.', components: [] }); collector.stop(0); process.exit(0); }
                if (interaction.customId == 'no-restart') await interaction.update({ ephemeral: defaultEphemeral, content: 'Restart cancelled.', components: [] }); collector.stop(0);
            }
        );

        // Executes when the time runs out
        collector.on('end', (interaction, reason) => {
            if (reason != 0) botAnswer.editReply({ ephemeral: defaultEphemeral, content: 'Time out.', components: [] });
        });
	}
};