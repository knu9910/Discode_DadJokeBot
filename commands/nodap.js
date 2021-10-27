module.exports = {
  name: "노답",
  description: "ㄴㄷ!",
  aliases: ["노답", "ㄴㄷ", "nodap"],
  
  async execute(msg, args) {
    if (!msg.mentions.users.size) {
      return msg.reply("사용자 태그를 지정해야합니다!");
    }
    const taggedUser = msg.mentions.users.first();
    msg.channel.send(`답이 없네~: ${taggedUser}`);
  },
};
