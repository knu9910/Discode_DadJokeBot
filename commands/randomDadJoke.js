const { randomJoke, dataset } = require("../help/randomJoke");
module.exports = {
  name: "아재개그",
  description: "ㄴㄷ!",
  aliases: ["ㅇㅈㄱㄱ", "dadjoke"],

  async execute(msg, args) {
    msg.channel.send(randomJoke(dataset));
  },
};
