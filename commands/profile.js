const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');
const functions = require('../functions/functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('See your profile.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Mention a user to see their profile.')
                .setRequired(false)),

	async execute(interaction) {
        const chosenUser = interaction.options.getUser('user');
        const ephemeralMode = await functions.getEphemeralMode(interaction.user.id);

        // Progress bar creation: Canvas and background
        const canvas = Canvas.createCanvas(1000, 35);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('./media/wallpaper.jpg');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        var profileEmbed;
        var user;
        var userColor;

        // Determines the embed content depending on the user to display
        if (chosenUser == null) {
            user = await functions.findData(interaction.user.id, 'chatting');
            userColor = await functions.getUserColor(interaction.user.id);

            // If the user does not exist in the database
            if (user == null) {
                await interaction.reply({ ephemeral: ephemeralMode, content: 'This user isn\'t registered yet.' });
                return
            }

            profileEmbed = new MessageEmbed()
            .setColor(userColor)
            .setAuthor(`${interaction.user.username}`, `${interaction.user.avatarURL()}`)
            .addField(`Level ${user.level}`, `${user.expTowardsNextLevel} / ${(user.level * (user.level + 1)) * 50}`, true)
            .setImage('attachment://profile-image.png')
            .setTimestamp()

        } else {
            user = await functions.findData(chosenUser.id, 'chatting');
            userColor = await functions.getUserColor(interaction.user.id);

            // If the user does not exist in the database
            if (user == null) {
                await interaction.reply({ ephemeral: ephemeralMode, content: 'This user isn\'t registered yet.' });
                return
            }

            profileEmbed = new MessageEmbed()
            .setColor(userColor)
            .setAuthor(`${chosenUser.username}`, `${chosenUser.avatarURL()}`)
            .addField(`Level ${user.level}`, `${user.expTowardsNextLevel} / ${(user.level * (user.level + 1)) * 50}`, true)
            .setImage('attachment://profile-image.png')
            .setTimestamp()
            .setFooter(`Requested by ${interaction.user.tag}`, `${interaction.user.avatarURL()}`)
        }

        // Determines the completion percentage of the current level and fills the progress bar accordingly
        const levelCompletionPercentage = Math.floor((user.expTowardsNextLevel / ((user.level * (user.level + 1)) * 100)) * 100);

        context.fillStyle = userColor;
        context.fillRect(0, 0, 1000 * (levelCompletionPercentage / 100), 35);

        // Export the progress bar image as png
        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png'); // Export canvas to an image

        interaction.reply({ephemeral: ephemeralMode, embeds: [profileEmbed], files: [attachment]});
	}
};