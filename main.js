const Discord = require('discord.js');
const secrets = require('./secrets.json');

const randImg = require('./random_animeme');
const imgur = require('./imgur_api');
const anilist = require('./anilist_api');

const client = new Discord.Client();
const bot_token = secrets.bot_token;
const prefix = '>';
const commands = 
[
    'a','animeme','im','marco','ping','roast'
];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    let content = msg.content.toLowerCase();
    if (content.startsWith(prefix)) {
        [cmdIdx, content] = messageParser(content);
        switch (cmdIdx) {
            case 5:
                msg.reply('git gud nerd');
                break;
            case 4:
                msg.reply('Pong!');
                break;
            case 3:
                msg.reply('Polo!');
                break;
            case 1:
                let randomMeme = new randImg.randImg();
                randomMeme.replyRichEmbed(msg);
                break;
            case 2:
                let image = new imgur.imgurApi(content);
                image.imageSearch(msg);
                break;
            case 0: 
                let info = new anilist.anilistSearch(content);
                info.animeSearch(msg)
                break;
            default:
                msg.channel.send('Unknown Command.');
                break;
        }
    }
})

function messageParser(msgContent) {
    msgContent = msgContent.replace(prefix, '');//remove the command indicator
    let [cmd, followings] = msgContent.split(' ', 2);//separates the command and the followings
    let switchCmdIdx = commands.findIndex( element => { return element === cmd });
    return [switchCmdIdx, followings];
}

client.login(bot_token);