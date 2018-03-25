/////author: pabushabi
/////mail: pabushabi@mail.ru
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '541456695:AAGBesYvLTFskdmppjO0g6zYeMj7FZwNHJI';
const bot = new TelegramBot(TOKEN, {polling: true});

let userList = {
    "id0": "admin"
};
let userListCache = "";

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const resp = 'Привет, я бот';
    bot.sendMessage(chatId, resp);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const resp = 'Это просто бот. Сейчас он почти ничего не умеет, но он быстро учится)';
    bot.sendMessage(chatId, resp);
});

bot.onText(/\/admin (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    if (match[1] === 'admin') {
        bot.sendMessage(chatId, 'admin mode');
        const chatCode = "id" + chatId;
        if (userList[chatCode] === undefined) {
            userList[chatCode] = msg.from.username;
        }
        for (let key in userList) {
            userListCache += userList[key] + " \n";
        }
        bot.sendMessage(chatId, 'List of bot`s users: \n' + userListCache);
    }
    else bot.sendMessage(chatId, 'access denied');
});

bot.onText(/Привет/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет)');
});

bot.onText(/привет/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет)');
});

bot.onText(/\/song/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendAudio(chatId, 'src/songs/song' + Math.round(Math.random() * 9) + '.mp3');
});

bot.onText(/\/pic/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendPhoto(chatId, 'src/pics/pic' + Math.round(Math.random() * 9) + '.jpg');
});

bot.onText(/\/num/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, Math.round(Math.random() * 10));
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    //bot.sendMessage(chatId, JSON.stringify(msg));
    const opts = {
        //reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: [
                ['/pic'], ['/num'], ['/song'], ['/help']
            ]
        })
    };
    bot.sendMessage(chatId, 'Выберите команду: ', opts);
});
