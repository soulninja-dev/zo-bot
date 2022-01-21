const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const { avatarCommand } = require("./app/avatar/command");
const { sendDmCommand } = require("./app/send-dm/command");
const { newMember } = require("./app/events/newMember");
const { connectDB } = require("./connectdb");
const { web3commands } = require("./app/web3/web3.commands");

// connecting to mongodb
connectDB();

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
  console.log("Bot up and running!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "avatar") {
    await avatarCommand(interaction, true);
  }

  if (commandName === "new") {
    await avatarCommand(interaction, false);
  }
});

// client.on("messageCreate", (message) => {
//   if (message.author.bot) return;
//   if (message.content.indexOf("!") !== 0) return;

//   const command = message.content.substr(0, message.content.indexOf(" "));
//   const args = message.content.slice("!").trim().split(/ +/g);
//   let memberPromise = message.guild.members.fetch();
//   if (command === "!send-dm") {
//     sendDmCommand(message, args, memberPromise);
//   }
// });

// commands: ["!web3 store token", "!web3 me"]
client.on("messageCreate", web3commands);

client.on("guildMemberAdd", (member) => {
  console.log("new Member: " + member.user.username);
  newMember(member);
});

client.login(token);
