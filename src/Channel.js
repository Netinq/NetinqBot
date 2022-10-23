module.exports = class Channel {
    constructor(channel, name, parentID, position) {
        this.channel = channel;
        this.name = name;
        this.parentID = parentID;
        this.position = position;
    }

    async create() {
        return new Promise((resolve, reject) => {
            this.channel.clone({name: this.name}).then((c) => {
                c.setParent(this.parentID);
                c.setPosition(this.position);
                c.edit({position: this.position});
            });
        });
    }
}
