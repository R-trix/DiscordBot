const Discord = require('discord.js')
const fs = require('fs');
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    switch (msg.content) {
        case 'pls roast':
            msg.reply('git gud nerd');
            break;
        case 'ping':
            msg.reply('Pong!')
            break;
        case 'animeme':
            let img = new Discord.RichEmbed();
            let attactchment = Discord.Attachment();
            img.file
            msg.reply()
            break;
        default:
            break;
    }
})

client.login('NTU2NjAyNzUxNDY3OTEzMjE3.D28Jsw.fSzMHJZKyq0WSLkQTTSm2AAiUJY')