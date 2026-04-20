import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { REST, Routes } from "discord.js";
import { config } from "../config";
import { SlashCommand, PrefixCommand } from "../types/Command";
import { BotClient } from "../types/Client";

export async function loadCommands(client: BotClient) {
  const slashPath = path.join(__dirname, "..", "commands", "slash");
  const prefixPath = path.join(__dirname, "..", "commands", "prefix");

  const slashCommandsJson: any[] = [];

  if (fs.existsSync(slashPath)) {
    const slashFiles = fs
      .readdirSync(slashPath)
      .filter(file => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of slashFiles) {
      const filePath = path.join(slashPath, file);
      const fileUrl = pathToFileURL(filePath).href;

      const commandModule = await import(fileUrl);
      const command: SlashCommand = commandModule.default;

      client.slashCommands.set(command.data.name, command);
      slashCommandsJson.push(command.data.toJSON());
    }
  }

  if (fs.existsSync(prefixPath)) {
    const prefixFiles = fs
      .readdirSync(prefixPath)
      .filter(file => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of prefixFiles) {
      const filePath = path.join(prefixPath, file);
      const fileUrl = pathToFileURL(filePath).href;

      const commandModule = await import(fileUrl);
      const command: PrefixCommand = commandModule.default;

      client.prefixCommands.set(command.name, command);

      if (command.aliases?.length) {
        for (const alias of command.aliases) {
          client.prefixCommands.set(alias, command);
        }
      }
    }
  }

  const rest = new REST({ version: "10" }).setToken(config.token);

  if (config.guildId) {
    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: slashCommandsJson }
    );
    console.log(`✅ Slash commands registrati nella guild ${config.guildId}`);
  } else {
    await rest.put(
      Routes.applicationCommands(config.clientId),
      { body: slashCommandsJson }
    );
    console.log("✅ Slash commands registrati globalmente");
  }
}