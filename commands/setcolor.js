const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');
const { bloomered, defaultEphemeral } = require('../main_parameters.json');
const functions = require('../functions/functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setcolor')
		.setDescription('Set the color that the bot will use for you.')
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Color code (Hexadecimal, e.g.: "#FE0C56"; use a color picker to find the hex code of a color)')
                .setRequired(true)),

	async execute(interaction) {
        const validHexPattern = /^#[0-9A-F]{6}$/i;
        const valueGiven = interaction.options.getString('color');

        if (validHexPattern.test(valueGiven)) { 
            await functions.setUserColor(interaction.user.id, valueGiven);
            interaction.reply(`Color set to: ${valueGiven}`);
        } else {
            interaction.reply('This isn\'t a valid hex string, please try again.');
        }
	}
};