const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const client = new Discord.Client();
const fs = require("fs");
const Users = require("./db");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const { dataset, changeData } = require("./help/randomJoke");

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const dadJokes = changeData(dataset);
const quizHelpData = { answered: true, chance: 3, cAnswer: "" };

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
  for (let alias of command.aliases) {
    client.aliases.set(alias, command);
  }
}

client.on("ready", async () => {
  console.log(`${client.user.tag} 봇에 로그인 하였습니다!`);
  await Users.sync();
});

client.on("message", async (msg) => {
  if (msg.content === "누구쎄용") {
    if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join();
      const dispatcher = connection.play("./dd.mp3");
      dispatcher.on("start", () => {
        console.log("audio.mp3 is now playing!");
      });
    } else {
      msg.reply("먼저 방에 들어가");
    }
  }
  if (
    (msg.content.startsWith("누구") && msg.content !== "누구쎄용") ||
    msg.content === "ㄴㄱ"
  ) {
    msg.channel.send("뚱인데요");
  }

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  await Users.findOrCreate({
    where: { userId: msg.author.id },
    defaults: {
      score: 0,
    },
  });

  if (!client.commands.has(commandName) && !client.aliases.has(commandName))
    return;

  const command =
    client.commands.get(commandName) || client.aliases.get(commandName);

  try {
    command.execute(msg, args, dadJokes, quizHelpData);
  } catch (err) {
    console.error(err);
    msg.reply(`Error command!`);
  }
});

client.login(token);
