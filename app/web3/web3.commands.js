const { UserModel } = require("../../models/user.model");

const web3commands = async (message) => {
  let prefix = "!web3";
  let messageArray = message.content.split(" ");
  if (messageArray[0] !== prefix) {
    return;
  } else messageArray = messageArray.slice(1);
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  if (cmd === "store") {
    const walletid = args[0];
    if (!walletid || walletid.length === 0) {
      return message.reply("No wallet id given");
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(args[0])) {
      return message.reply("Invalid ETH wallet address");
    }
    const userid = message.author.id;
    UserModel.create({ userid: userid, walletid: walletid })
      .then((data) => {
        return message.reply("Saved to db successfully");
      })
      .catch((err) => {
        if (err.code === 11000) {
          return message.reply("Wallet already has a user");
        }
        return message.reply("Error while saving to db");
      });
  } else if (cmd === "me") {
    const userid = message.author.id;
    const user = await UserModel.findOne({ userid: userid });
    if (!user) {
      return message.reply("No wallet address found");
    }
    message.reply(`Wallet address: ${user.walletid}`);
  }
};

module.exports = { web3commands };
