const telegraf = require('telegraf')
const dotenv = require('dotenv')
const axios = require('axios')
const { createCanvas } = require('canvas')
const fs = require('fs')

dotenv.config()

let bot = new telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply("Hello..Welcome to the Stock Bot")
});

const help_message = "/start - Restart the bot \n/help - List of commands\n/query {arg} - Query the current price for stock price of arg company";

bot.help((ctx) => {
    ctx.reply(help_message)
});

bot.command('query', (ctx) => {
    let words = ctx.message.text.split(" ")

    const width = 1280
    const height = 720

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    if(words[2] === 'daily')
    {
        axios.get(process.env.API_PATH + "function=TIME_SERIES_DAILY" + "&symbol=" + words[1] + "&apikey=" + process.env.API_KEY)
            .then(res => {
                let data = res.data['Daily Time Series']
                let price = null
                let count = 0
                let prev = null

                context.beginPath()
                for(var item in data)
                {
                    const h = parseFloat(data[item]['2. high'])
                    const l = parseFloat(data[item]['3. low'])

                    const curr = (l + h) / 2

                    if(count === 0)
                    {
                        price = data[item.toString()]['4. close']
                    }

                    context.moveTo(1200 - count, 700 - curr/7);   // Move pen to bottom-left corner

                    if(count > 0)
                    {
                        context.lineTo(1210 - count, prev)
                        context.stroke()
                    }

                    context.arc(1200 - count, 700 - curr/7, 2, 0, Math.PI * 2, false)
                    context.fill()
                    prev = 700 - curr/7
                    count = count + 10;
                }


                bot.telegram.sendChatAction(ctx.chat.id, 'upload_photo')
                bot.telegram.sendMessage(ctx.chat.id, price, {
                    reply_to_message_id : ctx.message.message_id
                })

                const buffer = canvas.toBuffer('image/png')

                fs.writeFileSync('./test.png', buffer)

                bot.telegram.sendPhoto(ctx.chat.id, {
                        source : './test.png'
                    },
                    {
                        reply_to_message_id: ctx.message.message_id
                    })
            })
    }
    else if(words[2] === 'weekly')
    {
        axios.get(process.env.API_PATH + "function=TIME_SERIES_WEEKLY" + "&symbol=" + words[1] + "&apikey=" + process.env.API_KEY)
            .then(res => {
                let data = res.data['Weekly Time Series']
                let price = null
                let count = 0
                let prev = null

                context.beginPath()
                for(var item in data)
                {
                    const h = parseFloat(data[item]['2. high'])
                    const l = parseFloat(data[item]['3. low'])

                    const curr = (l + h) / 2

                    if(count === 0)
                    {
                        price = data[item.toString()]['4. close']
                    }

                    context.moveTo(1200 - count, 700 - curr/7);   // Move pen to bottom-left corner

                    if(count > 0)
                    {
                        context.lineTo(1210 - count, prev)
                        context.stroke()
                    }

                    context.arc(1200 - count, 700 - curr/7, 2, 0, Math.PI * 2, false)
                    context.fill()
                    prev = 700 - curr/7
                    count = count + 10;
                }


                bot.telegram.sendChatAction(ctx.chat.id, 'upload_photo')
                bot.telegram.sendMessage(ctx.chat.id, price, {
                    reply_to_message_id : ctx.message.message_id
                })

                const buffer = canvas.toBuffer('image/png')

                fs.writeFileSync('./test.png', buffer)

                bot.telegram.sendPhoto(ctx.chat.id, {
                        source : './test.png'
                    },
                    {
                        reply_to_message_id: ctx.message.message_id
                    })
            })
    }
    else if(words[2] === 'monthly') {
        axios.get(process.env.API_PATH + "function=TIME_SERIES_MONTHLY" + "&symbol=" + words[1] + "&apikey=" + process.env.API_KEY)
            .then(res => {
                let data = res.data['Monthly Time Series']
                let price = null
                let count = 0
                let prev = null

                context.beginPath()
                for(var item in data)
                {
                    const h = parseFloat(data[item]['2. high'])
                    const l = parseFloat(data[item]['3. low'])

                    const curr = (l + h) / 2

                    if(count === 0)
                    {
                        price = data[item.toString()]['4. close']
                    }

                    context.moveTo(1200 - count, 700 - curr/7);   // Move pen to bottom-left corner

                    if(count > 0)
                    {
                        context.lineTo(1210 - count, prev)
                        context.stroke()
                    }

                    context.arc(1200 - count, 700 - curr/7, 2, 0, Math.PI * 2, false)
                    context.fill()
                    prev = 700 - curr/7
                    count = count + 10;
                }


                bot.telegram.sendChatAction(ctx.chat.id, 'upload_photo')
                bot.telegram.sendMessage(ctx.chat.id, price, {
                    reply_to_message_id : ctx.message.message_id
                })

                const buffer = canvas.toBuffer('image/png')

                fs.writeFileSync('./test.png', buffer)

                bot.telegram.sendPhoto(ctx.chat.id, {
                        source : './test.png'
                    },
                    {
                        reply_to_message_id: ctx.message.message_id
                    })
            })
    }
})

bot.launch()
