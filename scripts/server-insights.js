const { Client, Intents } = require("discord.js");
const { token } = require("../config.json");
const fs = require("fs");

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
  let rows = "";
  client.guilds.cache
    .get("903539281727983637")
    .members.fetch()
    .then((val) => {
      for (const mmbr of val.values()) {
        const user = mmbr.user.tag;
        const id = mmbr.id;
        const roles = [...mmbr.roles.cache.values()]
          .map((val) => (val.name === "@everyone" ? null : val.name))
          .join(",");
        rows += user + "," + id + "," + roles + "\n";
      }

      const filename = "./data/server-data.csv";
      fs.writeFile(filename, rows, (err) => {
        if (err) {
          console.log("Error writing to csv file", err);
        } else {
          console.log(`saved as ${filename}`);
        }
      });
    });
});

client.login(token);
