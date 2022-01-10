const functions = require('../functions/functions.js');
const { chattingExpMultiplier, chattingExpDelayInSeconds } = require('../main_parameters.json');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        // TODO: update username every message on all collections so that it stays up to date.

        if (message.author.bot) return

        var user = await functions.findData(message.author.id, 'users');

        if (user == null) {
            await functions.newUser(message.author.id, message.author.username);
            user = await functions.findData(message.author.id, 'chatting');
        }

        // username update here

        if ((functions.timeSinceEpoch() - user.lastMessageTime) < chattingExpDelayInSeconds) return

        const gainedExperience = functions.randomInt(10, 25) * chattingExpMultiplier;
        console.log(gainedExperience);
        const hasLevelledUp = functions.hasLevelledUpChatting(user.level, user.expTowardsNextLevel + gainedExperience);

        if (hasLevelledUp[0]) {
            functions.setChattingStats(message.author.id, message.author.username, user.messageCount + 1, user.exp + gainedExperience, user.level + 1, hasLevelledUp[1], functions.timeSinceEpoch());
            await message.channel.send(`<@${user.discordId}> levelled up to level ${user.level + 1} ! ⏫`);
        } else {
            functions.setChattingStats(message.author.id, message.author.name, user.messageCount + 1, user.exp + gainedExperience, user.level, hasLevelledUp[1], functions.timeSinceEpoch());
        }
    }
}