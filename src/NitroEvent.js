const Discord = require("discord.js");

module.exports = function nitroEvent (message, app) {
    const author = message.author;
    const content = message.content.toLowerCase();
    const guild = message.guild;

    if (content.includes('free') && content.includes('nitro') && content.includes('http')) {
        message.delete()

        const response = new Discord.MessageEmbed({
            title: "Avertissement de modération",
            description: "Il semblerait que vous ayez tenté de publier un lien de phishing/arnaque. Veuillez ne pas reproduire se comportement sous peine de sanction sur l'ensemble des discords où ce BOT est présent.",
            color: "#F25A5A",
            thumbnail: {url: guild.iconURL()},
            author: {
                name: app.user.username,
                icon_url: "https://cdn.discordapp.com/icons/890164562047934506/e1e90156c29b107495d614c925289102.webp?size=128"
            },
            footer: {
                text: "Infraction constaté sur le discord "+guild.name,
                icon_url: guild.iconURL()
            }
        })
        author.send({embeds: [response]})
    }
}