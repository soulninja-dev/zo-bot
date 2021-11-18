const {
  Client,
  Intents,
  MessageAttachment,
  MessageEmbed,
} = require("discord.js");
const { token } = require("./config.json");
const { flow } = require("./zomad-gen.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
});

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "zo") {
    flow().then(async () => {
      const file = new MessageAttachment("./output.png");
      const exampleEmbed = new MessageEmbed()
        .setTitle("Your Avatar")
        .setImage("attachment://output.png");
      client.channels.cache
        .get("903539282835296298")
        .send({ embeds: [exampleEmbed], files: [file] });
    });

    await interaction.reply("cooking up your avatar");
  }
});

client.login(token);
