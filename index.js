const { Telegraf } = require('telegraf');
const wiki = require('./controllers/wiki');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Приветствую!'));

bot.on('message', wiki);
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));