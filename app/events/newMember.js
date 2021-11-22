const { flow } = require("../avatar/generator");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const tempDir = require("os").tmpdir();

const newMember = async (member) => {
  console.log("making " + member.user.username + "'s avatar");
  const uid = await flow();
  console.log("uid: " + uid);
  const file = new MessageAttachment(tempDir + "/" + uid + "-output.png");
  const embedMessage = new MessageEmbed().setImage(
    "attachment://" + uid + "output.png"
  );

  try {
    await member.user.send({
      embeds: [embedMessage],
      files: [file],
      content:
        "Zo " +
        member.user.username +
        ", here is your Zo Avatar! Download the image and use it everywhere! \\z/",
    });
    console.log("sent " + member.user.username + "'s avatar");
  } catch {
    console.log("\n" + "cant send to" + member.user.username);
  }
};

module.exports = { newMember };
