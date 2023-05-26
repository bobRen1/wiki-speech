const axios = require('axios');
const yandexkit = require('../yandexkit');

module.exports = async function wikipedia(ctx) {
    const response = await axios.get('https://ru.wikipedia.org/w/api.php', {
        params: {
            format: 'json',
            action: 'query',
            prop: 'extracts',
            exintro: '',
            explaintext: '',
            redirects: 1,
            titles: ctx.message.text,
        }
    });

    const { pages } = response.data.query;

    if (pages['-1']) {
        ctx.reply(`По запросу "${ctx.message.text}" ничего не найдено`);
        return;
    }

    const page = Object.keys(pages)[0];
    let text = pages[page].extract.replaceAll('\n', ' ').slice(0, 300);
    text = text.slice(0, text.lastIndexOf('.'));

    const voiceFile = await yandexkit(text);
    if (!voiceFile) {
        ctx.reply('Voice file not found');
        return;
    }

    ctx.sendVoice({ source: file });
}