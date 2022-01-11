const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const functions = require('../functions/functions.js');
const { bloomered, defaultEphemeral } = require('../main_parameters.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fish')
		.setDescription('Go fishing to find fishes and treasures !'),
	async execute(interaction) {
        // Message's buttons creation
        const catchButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('fish')
                    .setLabel('Catch!')
                    .setStyle('PRIMARY'),
            );

		await interaction.reply({ ephemeral: defaultEphemeral, content: 'Fishing started'});

        await wait(functions.randomInt(5, 10) * 1000);

        interaction.editReply({ ephemeral: defaultEphemeral, content: 'Something took the bait!', components: [catchButton] });

        const authorId = interaction.user.id // Stores the ID of the user that used the command
        const botAnswer = interaction; // Stores the first interaction, which contains the bot's reply. Used to modify the reply when the collector ends

        // A filter for collected interactions to see if they're from the right user and right button
        const filter = interaction => (interaction.customId === 'fish' && interaction.user.id == authorId);
        // Creates a interaction collector on the channel the command was used in with the above filter
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 1500 });

        collector.on('collect', async interaction => {
            await interaction.update({ ephemeral: defaultEphemeral, content: 'You caught a fish!', components: [] });
            collector.stop(0);
        });

        // Executes when the time runs out
        collector.on('end', (interaction, reason) => {
            if (reason != 0) botAnswer.editReply({ ephemeral: defaultEphemeral, content: 'It got away...', components: [] });
        });
	}
};