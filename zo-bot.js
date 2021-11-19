const {
  Client,
  Intents,
  MessageAttachment,
  MessageEmbed,
} = require("discord.js");
const tempDir = require("os").tmpdir();
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

  if (commandName === "avatar") {
    await interaction.deferReply({ ephemeral: true });
    const uid = await flow();
    const file = new MessageAttachment(tempDir + "/" + uid + "-output.png");
    const embedMessage = new MessageEmbed()
      .setDescription("Zo " + interaction.user.username + ", here is your Zo Avatar! Download the image and use it everywhere! \\z/")
      .setImage("attachment://" + uid + "output.png");

    await interaction.editReply({
      embeds: [embedMessage],
      files: [file]
    });
  }
});

client.login(token);
