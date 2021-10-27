const Users = require("../db");

module.exports = {
  name: "정답",
  description: "ㄴㄷ!",
  aliases: ["ㅈㄷ", "answer"],

  async execute(msg, args, dadJokes, quizHelpData) {
    if (!quizHelpData.answered) {
      if (args[0] === quizHelpData.cAnswer) {
        let user = await Users.findOne({
          where: { userId: msg.author.id },
        });

        user.score += 10000;

        msg.channel.send(
          `정답입니다~ 아재력 뿜뿜~~!\n10000 아재력 포인트 지급! \n
           아재력 포인트: ${user.score}`
        );

        await user.save();

        quizHelpData.answered = true;
        quizHelpData.chance = 3;
      } else {
        msg.channel.send("그걸틀려? 틀니해");
        msg.channel.send(`기회: ${quizHelpData.chance}번 남았습니다.`);
        quizHelpData.chance--;
      }
      if (quizHelpData.chance === 0) {
        msg.channel.send(`기회를 날렸네요 정답: ${quizHelpData.cAnswer}`);
        quizHelpData.chance = 3;
        quizHelpData.answered = true;
      }
    }
  },
};
