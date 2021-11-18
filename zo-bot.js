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

  if (commandName === "zo") {
    await interaction.deferReply({ ephemeral: true });
    const uid = await flow();
    const file = new MessageAttachment(tempDir + "/" + uid + "-output.png");
    const exampleEmbed = new MessageEmbed()
      .setTitle("Your Avatar")
      .setImage("attachment://" + uid + "output.png");

    await interaction.editReply({
      embeds: [exampleEmbed],
      files: [file],
      content: "Hello Zo!",
    });
  }
});

client.login(token);
