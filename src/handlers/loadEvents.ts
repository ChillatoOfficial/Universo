import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { BotClient } from "../types/Client";
import { BotEvent } from "../types/Event";

export async function loadEvents(client: BotClient) {
  const clientEventsPath = path.join(__dirname, "..", "events", "client");
  const messageEventsPath = path.join(__dirname, "..", "events", "message");
  const minigamesEventsPath = path.join(__dirname, "..", "events", "minigames")

  const eventFolders = [clientEventsPath, messageEventsPath, minigamesEventsPath];

  for (const folder of eventFolders) {
    if (!fs.existsSync(folder)) continue;

    const files = fs
      .readdirSync(folder)
      .filter(file => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of files) {
      const filePath = path.join(folder, file);
      const fileUrl = pathToFileURL(filePath).href;

      const eventModule = await import(fileUrl);
      const event: BotEvent<any> = eventModule.default;

      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}