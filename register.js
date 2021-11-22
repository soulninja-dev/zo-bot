const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");

const serverCommands = [
  new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Replies with zomad avatar!"),
].map((command) => command.toJSON());

const globalCommands = [
  new SlashCommandBuilder()
    .setName("new")
    .setDescription("Replies with zomad avatar!"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), {
    body: serverCommands,
  })
  .then(() => console.log("Successfully registered server commands."))
  .catch(console.error);

rest
  .put(Routes.applicationCommands(clientId), { body: globalCommands })
  .then(() => console.log("Successfully registered global commands."))
  .catch(console.error);
