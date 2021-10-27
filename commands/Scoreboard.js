const Discord = require("discord.js");
const Users = require("../db");
module.exports = {
  name: "점수판",
  description: "ㄴㄷ!",
  aliases: ["ㅈㅅㅍ", "score", "ㅅㅇ", "순위"],

  async execute(msg, args, dadJokes, quizHelpData) {
    let users = await Users.findAll();

    users.sort((a, b) => {
      return b.score - a.score;
    });
    let ranking = 0;
    let score = 0;

    for (let user of users) {
      console.log(user.userId === msg.author.id);
      ranking++;

      if (user.userId === msg.author.id) {
        score = user.score;
        break;
      }
    }

    let embed = new Discord.MessageEmbed()
      .setTitle(`${msg.author.username} 님의 순위`)
      .setDescription(`서버 순위: ${ranking}/${users.length}`)
      .setColor("#red")
      .setFooter(`아재 포인트: ${score}`);
    msg.reply(embed);
  },
};
