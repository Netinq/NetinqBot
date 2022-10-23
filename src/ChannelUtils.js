const Channel = require("./Channel")

function checkName(channels, nameplus, id) {
    channels.forEach((channel) => {
        while (channel.name == nameplus) {
            nameplus = nameplus.replace("#" + id, "#" + (id + 1));
            id++;
        }
    });
    return nameplus;
}

function listChannels(name, id, guild) {
    const channelName = name.replace("#" + id, "");
    return guild.channels.cache.filter((c) => c.name.includes(channelName)).sort();
}

function checkAndCreate(channels, name, id, member) {
    let required = true;
    channels.forEach((channel) => required = channel.members.size == 0 ? false : required);

    if (required) {
        const lastChannel = (channels) => [...channels][channels.size-1][1];
        new Channel(member.channel, checkName(channels, name, id), member.channel.parentId, lastChannel(channels).position + 1).create();
    }
}

function checkAndDelete(channels) {
    let empty = 0;
    channels.forEach((channel) => {
        if (channel.members.size == 0) empty++;
        if (empty >= 2 && channel.members.size == 0) channel.delete();
    });
}

module.exports = {
    checkName,
    listChannels,
    checkAndCreate,
    checkAndDelete
}