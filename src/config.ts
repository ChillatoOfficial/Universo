export const config = {
  token: "",
  clientId: "",
  guildId: "",
  prefix: "!",
};

export const guild = {
    welcomechannel: "1384900744829993042"
}

if (!config.token) throw new Error("TOKEN mancante nel file");
if (!config.clientId) throw new Error("CLIENT_ID mancante nel file");