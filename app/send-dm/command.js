const { Permissions } = require("discord.js");
const { getPosition } = require("../utils/utils");

const sendDmCommand = async (message, args, memberPromise) => {
  let members = await memberPromise;
  const _2space = getPosition(message.content, " ", 2);
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
    return message.reply("You are not an admin.");

  const role = message.guild.roles.cache.find(
    (role) => role.name.toLowerCase() === args[1]
  );

  if (!role) return message.reply("There is not such a role!");

  let sendToChannel = "messages sent to: ";

  process.stdout.write("messages sent to: ");

  for (const member of members.values()) {
    if (member.roles.cache.has(role.id)) {
      if (member.user.bot === false) {
        let sendString = message.content.substr(_2space);
        let replaceArray = ["username"],
          replaceWith = [member.user.username];

        for (let i = 0; i < replaceArray.length; i++) {
          sendString = sendString.replace(
            new RegExp("{" + replaceArray[i] + "}", "gi"),
            replaceWith[i]
          );
        }

        try {
          await member.user.send(sendString);
          sendToChannel += member.user.username + ", ";
          process.stdout.write(member.user.username + ", ");
        } catch {
          console.log("\n" + "cant send to" + member.user.username);
        }
      }
    }
  }
  message.reply(sendToChannel);
  console.log("");
};

module.exports = { sendDmCommand };
