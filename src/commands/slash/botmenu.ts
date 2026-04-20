import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, ModalBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types/Command";

const botmenu: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("menu")
        .setDescription("Mostra comandi e altro del bot..."),
    async execute(interaction){
        await interaction.deferReply({ephemeral: true})
        /**
         * BUTTONS
         */

        const btn1 = new ButtonBuilder()
            .setCustomId("menu_1")
            .setLabel("🛰 Generale")
            .setStyle(ButtonStyle.Secondary)
        const btn2 = new ButtonBuilder()
            .setCustomId("menu_2")
            .setLabel("💸 Economia")
            .setStyle(ButtonStyle.Success)

        const btn3 = new ButtonBuilder()
            .setCustomId("menu_3")
            .setLabel("🤣 Divertimento")
            .setStyle(ButtonStyle.Danger)
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([btn1, btn2, btn3])
        /**
         * EMBED
         */
        const embed = new EmbedBuilder()
            .setTitle("☄ Universo Menu")
            .setDescription("Benvenuto su Universo ✨\nUn bot di ultima generazione progettato per offrirti strumenti, funzioni e comandi in modo semplice e rapido.\n\n👇 Seleziona un'opzione dai pulsanti qui sotto")
            .setThumbnail("https://i.pinimg.com/736x/a1/da/a1/a1daa19fb3d7b1fa28993d8926c7c385.jpg")
            .setColor(Colors.Purple)

        await interaction.followUp({embeds:[embed], components: [row], ephemeral: true})

    }
}

export default botmenu