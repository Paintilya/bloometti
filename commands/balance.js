const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const functions = require('../functions/functions.js');
const { bloomered, defaultEphemeral } = require('../main_parameters.json');


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
        var balanceEmbed;

        // Determines the embed content depending on the user to display
        if (chosenUser == null) {
            const user = await functions.findData(interaction.user.id, 'bankAccounts');
            const userColor = await functions.getUserColor(interaction.user.id);

            // If the user does not exist in the database
            if (user == null) {
                await interaction.reply({ ephemeral: defaultEphemeral, content: 'This user isn\'t registered yet.' });
                return
            }

            balanceEmbed = new MessageEmbed()
            .setColor(userColor)
            .setAuthor(`${interaction.user.username} 💳`, `${interaction.user.avatarURL()}`)
            .setDescription(`${user.bloomettiDollars} ฿`)
            .setTimestamp()
            
        } else {
            const user = await functions.findData(chosenUser.id, 'bankAccounts');
            const userColor = await functions.getUserColor(interaction.user.id);

            // If the user does not exist in the database
            if (user == null) {
                await interaction.reply({ ephemeral: defaultEphemeral, content: 'This user isn\'t registered yet.' });
                return
            }

            balanceEmbed = new MessageEmbed()
            .setColor(userColor)
            .setAuthor(`${user.username}'s balance 💳`, `${chosenUser.avatarURL()}`)
            .setDescription(`${user.bloomettiDollars} ฿`)
            .setTimestamp()
            .setFooter(`Requested by ${interaction.user.tag}`, `${interaction.user.avatarURL()}`)
        }

        await interaction.reply({ ephemeral: defaultEphemeral, embeds: [balanceEmbed] });
    }
};