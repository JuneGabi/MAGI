const { Client } = require("revolt.js");
const { token, prefix } = require('./config.json');

let client = new Client();

client.on("ready", async () => {
    console.info(`Logged in as ${client.user.username}!`);
    client.api.patch("/users/@me", { status: { text: `Hello World!`, presence: "Online" } });
});

client.on("message", async (message) => {
    if (message.content === "Mar") {
        message.channel.sendMessage("Mar!!!!");
    }
});

client.on("message", async (message) => {
    if (message.content === prefix + "test") {
        message.reply("response");
    }
});

client.on("message", async (message) => {
    if (message.content === prefix + "batata") {
        message.reply(`seu nome é: ${message.username}`)
    }
});

client.on("message", async (message) => {
    if (message.content.includes("quem é Heya?")) {
        message.reply("um mané!!! :b");
    }
});

client.on("message", async (message) => {
    if (message.content.includes("linux")) {
        message.reply("i use arch btw");
    }
});

client.on("message", async (message) => {
    if (message.content.includes("furry")) {
        message.reply("L + ratio + you stink");
        message.react("01G83M8KJE4KGQCQT2PP5EH3VT");
    }
});

client.on("message", async (message) => {
    if (message.content.includes("te amo magi")) {
        message.react(encodeURIComponent("❤️"));
    }
});

//admin area

// ban command
client.on("message", async (message) => {
    if (typeof message.content != "string") return;
    if (message.content.startsWith(prefix + "ban")) {
        if (message.member.hasPermission(message.channel.server, "BanMembers") === false) {
            return message.channel.sendMessage("You don't have the permission to ban.");
        }
        let target_id = message.content.split(' ')[1];
        let reason = message.content.split(' ')[2];
        let target = message.channel.server.fetchMember(target_id);
        if ((await target).bannable !== true) {
            message.channel.sendMessage("I can't ban this user.");
        }
        if ((await target).bannable === true) {
            await message.channel.server.banUser(target_id, { reason: reason })
            message.channel.sendMessage(`<@${target_id}> has been banned by <@${message.author_id}> for "${reason}"`);
        }
    }
});

// kick command
client.on("message", async (message) => {
    if (typeof message.content != "string") return;
    if (message.content.startsWith(prefix + "kick")) {
        if (message.member.hasPermission(message.channel.server, "KickMembers") === false) {
            return message.channel.sendMessage("You don't have the permission to kick.");
        }
        let target_id = message.content.split(' ')[1];
        let reason = message.content.split(' ')[2];
        let target = message.channel.server.fetchMember(target_id);
        if ((await target).kickable !== true) {
            message.channel.sendMessage("I can't kick this user.");
        }
        if ((await target).kickable === true) {
            (await target).kick();
            message.channel.sendMessage(`<@${target_id}> has been kicked by <@${message.author_id}> for "${reason}"`);
        }
    }
});

// unban command
client.on("message", async (message) => {
    if (typeof message.content != "string") return;
    if (message.content.startsWith(prefix + "unban")) {
        if (message.member.hasPermission(message.channel.server, "BanMembers") === false) {
            return message.channel.sendMessage("You don't have the permission to unban.");
        }

        if (!await (await message.channel.server.fetchBans()).bans.find(b => b._id.user === target_id)) {
        message.channel.sendMessage(`<@${target_id}> is not banned.`);
        }
        if (await (await message.channel.server.fetchBans()).bans.find(b => b._id.user === target_id)) {
            message.channel.server.unbanUser(target_id);
            message.channel.sendMessage(`<@${target_id}> has been unbanned by <@${message.author_id}>.`);
        }
    }
    
});

// ping command
client.on('message', async (message) => {
    if (message.content === prefix + 'ping') {
        let now = Date.now();
        message.channel.sendMessage(`Pinging...`).then((msg) => {
            msg.edit({ content: `The bots latency is: ${Date.now() - now}ms\nThe APIs Latency is: ${Math.round(client.websocket.ping)}ms`})
        });
    }
});

client.loginBot(token);
