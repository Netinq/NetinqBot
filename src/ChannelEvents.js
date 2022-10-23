const {listChannels, checkAndCreate, checkAndDelete} = require("./ChannelUtils");

module.exports = function channelEvent(oldMember, newMember) {
    /* Un utilisateur rejoin */
    if (newMember.channelId != null && oldMember.channelId == null) {
        let name = newMember.channel.name;
        let guild = newMember.guild;

        if (name.includes("#")) {
            let id = parseInt(name.charAt(name.indexOf("#") + 1));
            const channels = listChannels(name, id, guild).sort();
            checkAndCreate(channels, name, id, newMember);
        }
        /* Un utilisateur quitte */
    } else if (newMember.channelId == null && oldMember.channelId != null) {
        let name = oldMember.channel.name;
        let id = parseInt(name.charAt(name.indexOf("#") + 1));
        let guild = oldMember.guild;

        if (name.includes("#")) {
            const channels = listChannels(name, id, guild);
            checkAndDelete(channels);
        }
        /* Un utilisateur move */
    } else if (oldMember.channelId != null && newMember.channelId != null) {
        let name = newMember.channel.name;
        let guild = newMember.guild;

        if (name.includes("#")) {
            let id = parseInt(name.charAt(name.indexOf("#") + 1));
            let channels = listChannels(name, id, guild);
            checkAndCreate(channels, name, id, oldMember);
        }

        name = oldMember.channel.name;
        guild = oldMember.guild;

        if (name.includes("#")) {
            let id = parseInt(name.charAt(name.indexOf("#") + 1));
            const channels = listChannels(name, id, guild);
            checkAndDelete(channels);
        }
    }
}