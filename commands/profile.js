const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');
const { bloomered, defaultEphemeral } = require('../main_parameters.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Show user profile.'),
	async execute(interaction) {
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./media/wallpaper.jpg');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Select the font size and type from one of the natively available fonts
        context.font = '60px Noto Mono';

        // Select the style that will be used to fill the text in
        context.fillStyle = '#ffffff';

        // Actually fill the text with a solid color
        context.fillText(interaction.user.tag.substring(0, interaction.user.tag.length - 5), canvas.width / 2.5, canvas.height / 1.8);

        // Pick up the pen
        context.beginPath();

        // Start the arc to form a circle
        context.arc(125, 125, 100, 0, Math.PI * 2, true);

        // Put the pen down
        context.closePath();

        // Clip off the region you drew on
        context.clip();

        const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'jpg' }));
        context.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
        interaction.reply({ephemeral: defaultEphemeral, files: [attachment]});
	}
};