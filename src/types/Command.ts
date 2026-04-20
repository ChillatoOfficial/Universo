import {ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder} from "discord.js"

export interface SlashCommand {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}

export interface PrefixCommand {
    name: string,
    description: string,
    aliases: string[],
    execute: (message: Message, args: string[]) => Promise<void>
}