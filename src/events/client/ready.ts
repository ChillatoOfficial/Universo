import { BotEvent } from "../../types/Event";

const event: BotEvent<"ready"> = {
    name: "ready",
    execute(){
        console.log("ciaoo")
    }
}

export default event