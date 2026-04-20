import { guild } from "../../config";
import { BotEvent } from "../../types/Event";
import {Colors, EmbedBuilder} from "discord.js"
const event: BotEvent<"guildMemberAdd"> = {
    name: "guildMemberAdd",
    execute(member){
        const channel = member.guild.channels.cache.get(guild.welcomechannel)
        if (!channel || !channel.isTextBased()) return;

        const embed = new EmbedBuilder()
            .setTitle("🌌 Benvenuto in Universo")
            .setDescription("Sei entrato in un posto diverso dal solito.\nQui puoi conoscere persone, parlare liberamente e trovare il tuo spazio.")
            .setColor(Colors.Purple)
            .setFields(
                [
                    {name: "🚀 Inizia da →", value: "<#1484510647436841082>", inline: true},
                    {name: "🎭 Scegli i tuoi ruoli →", value: "<#1483465296344907916>", inline: true},
                    {name: "💬 Entra in chat →", value: "<#1384906687768563824>", inline: true}
                ]
            )
            .setThumbnail(member.user.displayAvatarURL())
        channel.send({embeds: [embed]})
        member.send("ciaoo").catch(err => console.log(err))

    }
}

export default event