const { Client, Intents, Permissions } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You are not an admin.");
  if (message.content.indexOf("!") !== 0) return;

  const command = message.content.substr(0, message.content.indexOf(" "));
  const _2space = getPosition(message.content, " ", 2);
  const args = message.content.slice('!').trim().split(/ +/g);
  // const roleStr = message.content.substr(getPosition(message.content, " ", 1)+1, _2space);

  if (command === "!send-dm") {
    const role = message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === args[1]
    );
    if (!role) return message.reply("There is not such a role!");

    for (const member of message.guild.members.cache.values()) {
      for (const memberRole of member.roles.cache.values()) {
        if (memberRole.id === role.id) {
          member.user.send(message.content.substr(_2space));
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
