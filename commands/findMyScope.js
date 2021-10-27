const Users = require("../db");

module.exports = {
  name: "점수",
  description: "ㄴㄷ!",
  aliases: ["ㅈㅅ", "scope"],

  async execute(msg, args, dadJokes, quizHelpData) {
    let user, name;
    if (!msg.mentions.users.size) {
      user = await Users.findOne({
        where: { userId: msg.author.id },
      });
      name = msg.author.username;
    } else {
      const taggedUser = msg.mentions.users.first();
      user = await Users.findOne({
        where: { userId: taggedUser.id },
      });
      name = taggedUser.username;
    }

    msg.reply(`${name}님의 아재력 포인트는 ${user.score} 입니다!`);
  },
};
