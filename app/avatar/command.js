const { MessageAttachment, MessageEmbed } = require("discord.js");
const { flow } = require("./generator.js");
const tempDir = require("os").tmpdir();

const avatarCommand = async (interaction, ephemeral) => {
  await interaction.deferReply({ ephemeral: ephemeral });
  console.log("making " + interaction.user.username + "'s avatar");
  const uid = await flow();
  console.log("uid: " + uid);
  const file = new MessageAttachment(tempDir + "/" + uid + "-output.png");
  const embedMessage = new MessageEmbed().setImage(
    "attachment://" + uid + "output.png"
  );

  await interaction.editReply({
    embeds: [embedMessage],
    files: [file],
    content:
      "Zo " +
      interaction.user.username +
      ", here is your Zo Avatar! Download the image and use it everywhere! \\z/",
  });
  console.log("sent " + interaction.user.username + "'s avatar");
};

module.exports = { avatarCommand };
