module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;
        
            try {
                if (interaction.commandName == 'ping') {
                    command.execute(interaction, client);
                    return
                }
                command.execute(interaction);
            } catch (error) {
                console.error(error);
                interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
}