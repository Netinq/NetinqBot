const Discord = require("discord.js");

function concoursEvent(message, app) {
  const guild = message.guild;
  if (message.content != "!cc" || message.member.id != "248069530381844481")
    return;
  const row = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId("participer")
      .setLabel("Participer maintenant !")
      .setStyle("SECONDARY")
      .setEmoji("🚀")
  );
  const response = new Discord.MessageEmbed({
    title: "🎲 Concours Dying Light 2 🎲",
    description:
      "Gagnez une copie de Dying Light 2 steam dès maintenant en participant à notre concours évènement, à l'occasion de la sortie du prochaine opus le 4 Février 2021.",
    fields: [
      { name: "\u200B", value: "\u200B" },
      {
        name: "📜 Comment participer ?",
        value:
          "Pour participer vous devez simplement être présent sur le discord et cliquer sur le bouton ci-dessous.",
      },
      { name: "\u200B", value: "\u200B" },
      {
        name: "🚀 Résultat du concours",
        value:
          "Le tirage aura lieu le 03 Février 2022 dans la journée afin de vous permettre de télécharger le jeu en avance !",
      },
    ],
    color: "#2D2D2D",
    thumbnail: { url: guild.iconURL() },
  });
  message.channel.send({
    content: "@everyone",
    embeds: [response],
    components: [row],
  });
}
async function buttonEvent(interaction, app) {
  if (!interaction.isButton() && interaction.button.id != "participer") return;
  await interaction.deferReply({ ephemeral: true });

  const logs = interaction.guild.channels.cache.get("936611656828608542");
  const messages = await logs.messages.fetch();

  let exist = false;
  messages.forEach(
    (message) =>
      (exist = message.content.includes(interaction.user.id) ? true : exist)
  );

  if (exist)
    await interaction.editReply({
      content: "👍 Tu es déjà inscrit au concours !",
      components: [],
    });
  else {
    await interaction.editReply({
      content: "🚀 Tu as bien été inscrit au concours !",
      components: [],
    });
    logs.send({ content: "P:" + interaction.user.id + ":1.0" });
  }
}
async function lots_of_messages_getter(channel, limit = 500) {
  let last_id;
  let all = new Discord.Collection();

  while (true) {
    const options = { limit: 100 };
    if (last_id) {
      options.before = last_id;
    }

    const messages = await channel.messages.fetch(options);
    all = all.concat(messages);
    console.log(all);
    last_id = messages.last().id;

    if (messages.size != 100 || all.size >= limit) {
      break;
    }
  }

  return all;
}
async function tirage(message, app) {
  const guild = message.guild;
  if (message.content != "!tt" || message.member.id != "248069530381844481")
    return;
  const logs = guild.channels.cache.get("936611656828608542");
  const messages = await lots_of_messages_getter(logs);

  let exist = 0;
  messages.forEach(() => exist++);
  const result = messages.random();
  const id = result.toString().split(":")[1];
  const user = await guild.members.fetch(id);

  message.channel.send({
    content: `PARTICIPANTS : ${exist}\nTIRAGE : ${user.user}`,
  });
}

module.exports = {
  concoursEvent,
  buttonEvent,
  tirage,
};
