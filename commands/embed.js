const Discord = require("discord.js");
module.exports = {
  name: "임베드",
  description: "ㄴㄷ!",
  aliases: ["embed", "ㅇㅂㄷ", "뚱이"],

  async execute(msg, args, dadJokes, quizHelpData) {
    let embed = new Discord.MessageEmbed()
      .setTitle("뚱이 봇")
      .setDescription("뚱인데연.")
      .setColor("Green")
      .setFooter("뚱인데연");
    msg.reply(embed);
  },
};
