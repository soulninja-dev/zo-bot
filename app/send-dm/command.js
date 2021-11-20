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

  console.log("messages sent to: ");

  for (const member of message.guild.members.cache.values()) {
    console.log(member.user.username + ", ");

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
};

module.exports = { sendDmCommand };
