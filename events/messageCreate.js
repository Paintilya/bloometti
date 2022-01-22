const functions = require('../functions/functions.js');
const { chattingExpMultiplier, chattingExpDelayInSeconds } = require('../main_parameters.json');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return

        var user = await functions.findData(message.author.id, 'chatting');

        if (user == null) {
            await functions.newUser(message.author.id, message.author.username);
            user = await functions.findData(message.author.id, 'chatting');
        }

        await functions.updateUsername(message.author.id, message.author.username);

        if ((functions.timeSinceEpoch() - user.lastMessageTime) < chattingExpDelayInSeconds) return

        const gainedExperience = functions.randomInt(10, 25) * chattingExpMultiplier;
        const hasLevelledUp = functions.hasLevelledUpChatting(user.level, user.expTowardsNextLevel + gainedExperience);

        if (hasLevelledUp[0]) {
            functions.setChattingStats(message.author.id, message.author.username, user.messageCount + 1, user.exp + gainedExperience, user.level + 1, hasLevelledUp[1], functions.timeSinceEpoch());
            await message.channel.send(`<@${user.discordId}> levelled up to level ${user.level + 1} ! ⏫`);
        } else {
            functions.setChattingStats(message.author.id, message.author.username, user.messageCount + 1, user.exp + gainedExperience, user.level, hasLevelledUp[1], functions.timeSinceEpoch());
        }
    }
}