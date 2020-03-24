// import {Extra, Markup} from "telegraf";

const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf('541456695:AAGBesYvLTFskdmppjO0g6zYeMj7FZwNHJI');
const axios = require('axios');

bot.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`Response time: ${ms}ms`)
});

bot.start((ctx) => ctx.reply('Привет'));
bot.help((ctx) => ctx.reply('Это просто бот. Сейчас он ничего не умеет, но скоро научится'));

bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears(/привет/gi, (ctx) => {
    ctx.reply(`Hey there, ${ctx.from.first_name}!`);
});

const boops = ["boop!", "boop", "boop?", "booooop!", "boop-beep!", "beep!", "boo..", "beep-beep"];

bot.hears(/beep/gi, (ctx) => {
    const answer = Math.floor(Math.random() * boops.length);
    ctx.reply(boops[answer] + ` ${ctx.from.first_name} (${ctx.from.username})`)
});

bot.command('pic', ctx => {
    const extra = Extra.markup(Markup.inlineKeyboard(
        [Markup.callbackButton('I want more!', "more")]));
    extra.caption = "Doge!";
    axios.get('http://shibe.online/api/shibes?count=[1-100]')
        .then(data => {
            console.log(data.data[0]);
            ctx.replyWithPhoto(data.data[0], extra)
        })
        .catch(err => {
            console.log(err);
            ctx.reply('Something get wrong, please try later')
        })
});

bot.action('more', (ctx) => {
    const extra = Extra.markup(Markup.inlineKeyboard(
        [Markup.callbackButton('I want more!', "more")]));
    extra.caption = "Doge!";
    axios.get('http://shibe.online/api/shibes?count=[1-100]')
        .then(data => {
            console.log(data.data[0]);
            ctx.replyWithPhoto(data.data[0], extra)
        })
        .catch(err => {
            console.log(err);
            ctx.reply('Something get wrong, please try later')
        })
});

bot.on('message', ctx => {
    console.log(ctx.from.username + ' => ' + ctx.message.text);
});

bot.on('inline_query', (ctx) => {
    const result = [];
    // Explicit usage
    ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

    // Using context shortcut
    ctx.answerInlineQuery(result)
});

bot.launch()
    .then(() => {
        console.log('working...');
    });

module.exports = bot;