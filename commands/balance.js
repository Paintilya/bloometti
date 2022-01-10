const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const functions = require('../functions/functions.js');
const { color, defaultEphemeral } = require('../config.json'); // Import the configured color for the bot


module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('See your current bank balance.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Mention a user to see their balance.')
                .setRequired(false)),

	async execute(interaction) {
        const chosenUser = interaction.options.getUser('user');

        if (chosenUser == null) { 
            const user = await functions.findData(interaction.user.id, "inventories")

            const balance = new MessageEmbed()
            .setColor(color)
            .setAuthor(`${interaction.user.username}`, `${interaction.user.avatarURL()}`)
            .setTitle(`${user.bankBalance} $`)
            .setTimestamp()

            await interaction.reply({ ephemeral: defaultEphemeral, embeds: [balance] });
        } else {
            const user = await functions.findData(chosenUser.id, "inventories");

            const balance = new MessageEmbed()
            .setColor(color)
            .setAuthor(`${user.name}'s balance`, `${chosenUser.avatarURL()}`)
            .setTitle(`${user.bankBalance} $`)
            .setTimestamp()
            .setFooter(`Requested by ${interaction.user.tag}`, `${interaction.user.avatarURL()}`);

            await interaction.reply({ ephemeral: defaultEphemeral, embeds: [balance] });
        }
    }
};