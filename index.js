/////author: pabushabi
/////mail: pabushabi@mail.ru
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '541456695:AAGBesYvLTFskdmppjO0g6zYeMj7FZwNHJI';
const bot = new TelegramBot(TOKEN, {polling: true});
const axios = require('axios');


const opts = {
    reply_markup: JSON.stringify({
        keyboard: [
            // ['🌁/pic', '3⃣/num'], ['ℹ/help']
            []
        ],
        // inline_keyboard: [
        //     [{text: "like", callback_data: "1"}], [{text: "dislike", callback_data: "-1"}]
        // ]
    })
};

bot.onText(/\/start/, msg => {
    const chatId = msg.chat.id;
    const resp = 'Привет, я бот';
    bot.sendMessage(chatId, resp, opts);
});

bot.onText(/\/help/, msg => {
    const chatId = msg.chat.id;
    const resp = `Это просто бот. Сейчас он почти ничего не умеет, но он быстро учится)
Отправьте команду "текст имя исполнителя - название песни" и бот отправит вам текст песни`;
    bot.sendMessage(chatId, resp, opts);
});

bot.onText(/привет/gi, msg => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет)');
});

bot.onText(/текст (.+)/gi, (msg, match) => {
    const chatId = msg.chat.id;
    console.log(match[1]);
    let artist = match[1].slice(0, match[1].indexOf('-') - 1);
    console.log(artist);
    let song = match[1].slice(match[1].indexOf('-') + 1);
    console.log(song);
    axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
        .then(res => {
            console.log(res.data.lyrics);
            bot.sendMessage(chatId, res.data.lyrics)
        })
        .catch(err => {
            console.log('---' + err);
            bot.sendMessage(chatId, 'Something get wrong, please try again later')
        });
});

bot.onText(/\/pic/, msg => {
    const chatId = msg.chat.id;
    axios.get('http://shibe.online/api/shibes?count=[1-100]')
        .then(data => {
            console.log(data.data[0]);
            bot.sendPhoto(chatId, data.data[0], {caption: "Doge!"}, opts)
        })
        .catch(err => {
            console.log(err);
            bot.sendMessage(chatId, 'Something get wrong, please try later')
        })
});

// bot.onText(/кино/gi, msg => {
//     const chatId = msg.chat.id;
//     axios({
//         "method": "GET",
//         "url": "https://imdb8.p.rapidapi.com/title/find",
//         "headers": {
//             "content-type": "application/octet-stream",
//             "x-rapidapi-host": "imdb8.p.rapidapi.com",
//             "x-rapidapi-key": "SIGN-UP-FOR-KEY"
//         }, "params": {
//             "q": "game of thr"
//         }
//     })
//         .then((response) => {
//             console.log(response)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// });

bot.on("callback_query", msg => {
    console.log(msg.data);
    console.log(msg);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    //bot.sendMessage(chatId, JSON.stringify(msg));
    console.log(`${chatId}:${msg.from.username} => ${msg.text}`);
    // console.log(msg);

    // bot.(chatId,"", opts);
});

console.log(`working...`);