import { SlashCommand } from "../../types/Command";
import {Colors, EmbedBuilder, SlashCommandBuilder} from "discord.js"
import os from "os";

const total = os.totalmem();
const free = os.freemem();
const used = total - free;

const percentUsed = (used / total) * 100;

function createBar(percent: number, size = 20) {
  const filled = Math.round((percent / 100) * size);
  return "█".repeat(filled) + "░".repeat(size - filled);
}

const ping: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("pong!"),
    async execute(interaction){
        await interaction.deferReply({ephemeral: true})
        const report = `
🖥️ OS: ${os.platform()} ${os.release()}
🏗️ Arch: ${os.arch()}
⚙️ Node: ${process.version}

🧠 RAM
Totale: ${(total / 1024 ** 3).toFixed(2)} GB
Libera: ${(free / 1024 ** 3).toFixed(2)} GB
Usata: ${(used / 1024 ** 3).toFixed(2)} GB
[${createBar(percentUsed)}] ${percentUsed.toFixed(1)}%

🧮 CPU: ${os.cpus()[0]?.model}
🔥 Core: ${os.cpus().length}

⏱️ Uptime: ${os.uptime()} sec
`;
        const embed = new EmbedBuilder()
            .setTitle("🌌 Universo")
            .setDescription(report)
            .setColor(Colors.Purple)

        await interaction.followUp({embeds: [embed], ephemeral: true})
    }
}

export default ping