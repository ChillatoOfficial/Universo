import { Client, Collection } from "discord.js";
import { SlashCommand, PrefixCommand } from "./Command";

export interface BotClient extends Client {
  slashCommands: Collection<string, SlashCommand>;
  prefixCommands: Collection<string, PrefixCommand>;
}