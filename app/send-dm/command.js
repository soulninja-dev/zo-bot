const { Permissions } = require("discord.js");
const { getPosition } = require("../utils/utils");

const sendDmCommand = (message, args) => {
  const _2space = getPosition(message.content, " ", 2);
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
    return message.reply("You are not an admin.");

  const role = message.guild.roles.cache.find(
    (role) => role.name.toLowerCase() === args[1]
  );

  if (!role) return message.reply("There is not such a role!");

  process.stdout.write("messages sent to: ");

  for (const member of role.members.values()) {
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
    process.stdout.write(member.user.username + ", ");
  }
  message.reply("messages sent");
  console.log("");
};

module.exports = { sendDmCommand };
