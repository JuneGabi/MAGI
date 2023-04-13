const { Client } = require("revolt.js");
const { token, prefix } = require('./config.json');

let client = new Client();

client.on("ready", async () =>
    console.info(`Logged in as ${client.user.username}!`);
    client.api.patch("/users/@me", { status: { text: `Hello World!`, presence: "Online" } });
);

client.on("message", async (message) => {
    if (message.content === prefix + "ping") {
        message.channel.sendMessage("Pong!");
    }
});

client.on("message", async (message) => {
    if (message.content === prefix + "foo") {
        message.channel.sendMessage("bar");
    }
});

client.loginBot(token);
