const { Client, Intents } = require("discord.js");
const { token } = require("../config.json");
const { setZoData } = require("./google");

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
  client.guilds.cache
    .get("903539281727983637")
    .members.fetch()
    .then((val) => {
      let data = [];
      for (const mmbr of val.values()) {
        const user = mmbr.user.tag;
        const id = mmbr.id;
        const roles = [...mmbr.roles.cache.values()].map((val) =>
          val.name === "@everyone" ? "" : val.name
        );
        const row = [user, id, ...roles];
        data.push(row);
      }
      setZoData(data);
    });
});

client.login(token);
