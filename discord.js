require('dotenv').config()

const { Client, Intents, Permissions } = require("discord.js");
const { token } = require("./config.json");

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

client.on("messageCreate", (message) => {
  console.log(message.guild.members.cache);
  if (message.author.bot) return;
  if (message.content.indexOf("!") !== 0) return;

  const command = message.content.substr(0, message.content.indexOf(" "));
  const _2space = getPosition(message.content, " ", 2);
  const args = message.content.slice("!").trim().split(/ +/g);
  // const roleStr = message.content.substr(getPosition(message.content, " ", 1)+1, _2space);

  if (command === "!send-dm") {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.reply("You are not an admin.");

    const role = message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === args[1]
    );

    if (!role) return message.reply("There is not such a role!");

    for (const member of message.guild.members.cache.values()) {
      console.log(member.user.username);

      for (const memberRole of member.roles.cache.values()) {
        if (memberRole.id === role.id) {
          let sendString = message.content.substr(_2space);
          let replaceArray = ["username"],
            replaceWith = [member.user.username];

          for (let i = 0; i < replaceArray.length; i++) {
            sendString = sendString.replace(
              new RegExp("{" + replaceArray[i] + "}", "gi"),
              replaceWith[i]
            );
          }

          member.user.send(sendString);
        }
      }
    }
    message.reply("messages sent");
  }
});

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

client.login(token);

function sendMsgToChannel(msg, channel){
  client.channels.get(channel).send(msg);
}