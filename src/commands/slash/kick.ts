import { SlashCommand } from "../../types/Command";
import {PermissionFlagsBits, SlashCommandBuilder} from "discord.js"
const kick: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("kicka un utente")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(op => op
            .setName("user")
            .setDescription("Selezione un utente")
            .setRequired(true)
        ),
    async execute(interaction){
        await interaction.deferReply({ephemeral: true})
        const member = await interaction.guild!.members.fetch(interaction.user.id);

        if (!member.permissions.has(PermissionFlagsBits.KickMembers)) {
            await interaction.reply({
            content: "Non hai il permesso.",
            ephemeral: true
            });
            return;
        }

        const targetu = interaction.options.getUser("user", true)
        const target = await interaction.guild!.members.fetch(targetu.id)
        await target.kick("ciaoo")
        await interaction.followUp({content: `👢 ${targetu.tag} espulso`, ephemeral: true});
    }
}

export default kick