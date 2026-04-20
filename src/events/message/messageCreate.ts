import { BotEvent } from "../../types/Event";
import { config } from "../../config";
import { BotClient } from "../../types/Client";

const event: BotEvent<"messageCreate"> = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/\s+/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    const client = message.client as BotClient;
    const command = client.prefixCommands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args);
    } catch (error) {
      console.error(error);
      await message.reply("❌ Errore durante l'esecuzione del comando.");
    }
  }
};

export default event;