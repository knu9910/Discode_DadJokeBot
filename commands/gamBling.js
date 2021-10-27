const Users = require("../db");
const { getRandomInt, randomJoke } = require("../help/randomJoke");

module.exports = {
  name: "도박",
  description: "ㄴㄷ!",
  aliases: ["ㄷㅂ", "game", "올인", "ㅇㅇ"],

  async execute(msg, args, dadJokes, quizHelpData) {
    const user = await Users.findOne({
      where: { userId: msg.author.id },
    });
    let random = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 3, 4, 10];
    if (isNaN(args[0]) && args[0] !== "올인" && args[0] !== "ㅇㅇ")
      return msg.reply("올바르지 않은 금액이에요");
    if (!args[0]) return msg.reply(`얼마를 도박할지 입력해주세요.`);
    if (user.score < 1000 && args[0] <= 1000)
      return msg.reply(`1000포인트 이상 필요합니다.`);
    if (user.score < args[0]) return msg.reply(`포인트가 부족합니다.`);
    let s1 = args[0];
    if (args[0] === "올인" || args[0] === "ㅇㅇ") s1 = user.score;
    let s2 = randomJoke(random);
    if (s2 === 1) s2 += 1;

    user.score = user.score - s1;
    user.score += s1 * s2;
    await user.save();
    s2 > 0
      ? msg.reply(`축하합니다 ${s2}배 얻었습니다.`)
      : msg.reply(`힘내세요! 모두 잃었습니다.`);
  },
};
