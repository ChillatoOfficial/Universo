import { BotEvent } from "../../types/Event";
import { BotClient } from "../../types/Client";

const event: BotEvent<"interactionCreate"> = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const client = interaction.client as BotClient;
    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Errore nel comando /${interaction.commandName}:`, error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "❌ Si è verificato un errore.",
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: "❌ Si è verificato un errore.",
          ephemeral: true
        });
      }
    }
  }
};

export default event;