import { Collection, GatewayIntentBits, Message, TextChannel } from "discord.js";
import { config } from "./config";
import { loadCommands } from "./handlers/loadCommands";
import { loadEvents } from "./handlers/loadEvents";
import { BotClient } from "./types/Client";

const client: BotClient = new (require("discord.js").Client)({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.slashCommands = new Collection();
client.prefixCommands = new Collection();

(async () => {
  await loadCommands(client);
  await loadEvents(client);
  await client.login(config.token);
})();