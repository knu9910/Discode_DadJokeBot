const { randomJoke } = require("../help/randomJoke");

module.exports = {
  name: "아재퀴즈",
  description: "ㄴㄷ!",
  aliases: ["ㅇㅈㅋㅈ", "jokeQuiz"],

  async execute(msg, args, dadJokes, quizHelpData) {
    if (quizHelpData.answered) {
      const dadJoke = randomJoke(dadJokes);
      msg.channel.send(`${dadJoke[0]}?`);
      quizHelpData.answered = false;
      quizHelpData.cAnswer = dadJoke[1];
    } else {
      msg.channel.send("아직 퀴즈가 진행중 입니다.");
    }
  },
};
