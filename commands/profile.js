const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');
const { bloomered, defaultEphemeral } = require('../main_parameters.json');
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

        // TODO: mention other user to see their profile. verify that user has data in database

        const canvas = Canvas.createCanvas(1000, 35);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./media/wallpaper.jpg');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        const user = await functions.findData(interaction.user.id, 'chatting');
        const levelCompletionPercentage = Math.floor((user.expTowardsNextLevel / ((user.level * (user.level + 1)) * 100)) * 100);

        context.fillStyle = bloomered;
        context.fillRect(0, 0, 1000 * (levelCompletionPercentage / 100), 35);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

        const profile = new MessageEmbed()
        .setColor(bloomered)
        .setAuthor(`${interaction.user.tag}`, `${interaction.user.avatarURL()}`)
        .addField(`Level ${user.level}`, `${user.expTowardsNextLevel} / ${(user.level * (user.level + 1)) * 100}`, true)
        .setImage('attachment://profile-image.png')
        .setTimestamp()

        interaction.reply({embeds: [profile], files: [attachment]});
	}
};