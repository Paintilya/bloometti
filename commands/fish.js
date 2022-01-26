const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const functions = require('../functions/functions.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fish')
		.setDescription('Go fishing to find fishes and treasures !'),
	async execute(interaction) {
        const ephemeralMode = await functions.getEphemeralMode(interaction.user.id);
        // Message's buttons creation
        const catchButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('fish')
                    .setLabel('Catch!')
                    .setStyle('PRIMARY'),
            );

        const animation_images = fs.readdirSync('./media/fishing/boats/boat1/catch_animation').filter(file => file.endsWith('.png'));
        var animation = [];

        for (const image of animation_images) {
            const frame = `../media/fishing/boats/boat1/catch_animation/${image}`;
            animation.push(frame);
        }

        console.log(animation);

        var attachment = new MessageAttachment('./media/fishing/boats/boat1/boat1.png');

        const start = new MessageEmbed()
        .setColor(bloomered)
        .setTitle('The fishing session has started.')
        .setImage('attachment://boat1.png')
        .setTimestamp()

        await interaction.reply({ ephemeral: ephemeralMode, embeds: [start], files: [attachment]});

        await wait(functions.randomInt(5, 10) * 1000);

        attachment = new MessageAttachment('./media/fishing/boats/boat1/boat1_indicator.png');

        const indicator = new MessageEmbed()
        .setColor(bloomered)
        .setTitle('The fishing session has started.')
        .setImage('attachment://boat1_indicator.png')
        .setTimestamp()
        
        await interaction.editReply({ ephemeral: ephemeralMode, embeds: [indicator], files: [attachment]});
        await interaction.editReply({ ephemeral: ephemeralMode, embeds: [indicator], files: [attachment]});

        const authorId = interaction.user.id // Stores the ID of the user that used the command
        const botAnswer = interaction; // Stores the first interaction, which contains the bot's reply. Used to modify the reply when the collector ends

        // A filter for collected interactions to see if they're from the right user and right button
        const filter = interaction => (interaction.customId === 'fish' && interaction.user.id == authorId);
        // Creates a interaction collector on the channel the command was used in with the above filter
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 1500 });

        collector.on('collect', async interaction => {
            await interaction.update({ ephemeral: ephemeralMode, content: 'You caught a fish!', components: [] });
            collector.stop(0);
        });

        // Executes when the time runs out
        collector.on('end', (interaction, reason) => {
            if (reason != 0) botAnswer.editReply({ ephemeral: ephemeralMode, content: 'It got away...', components: [] });
        });
	}
};