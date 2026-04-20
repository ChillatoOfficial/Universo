import { EmbedBuilder } from "@discordjs/builders";
import { BotEvent } from "../../types/Event";

let user: string[] = []
var number = 0
const event: BotEvent<"messageCreate"> = {
    name: "messageCreate",
    async execute(message){
        if(message.channel.id == "1494245360674148393") {
            if (user.includes(message.author.id)) return
            if(message.author.bot) return   
            user.splice(0, user.length)
            user.push(message.author.id)
            if (message.content !== (number + 1).toString()) {
                number = 0
                const embed = new EmbedBuilder()
                    .setTitle("❌ errore!")
                    .setDescription("il numero era sbagliato.\nsi riparte da → **1** 🔢")
                    .setThumbnail("https://i.pinimg.com/736x/8d/4f/be/8d4fbebdbf1cf5c924a7e3c538111ebb.jpg")
                    .setFooter({text: "riprendete il conteggio ✦"})
                await message.channel.send({embeds: [embed]})
                await message.react("❌")
                user.splice(0, user.length)
                return
            }
            number++
            await message.react("✅")
            return
        }
    }
}

export default event