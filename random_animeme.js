const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    randImg: class {
        constructor() {
            do {
                this.imgId = Math.ceil(58*Math.random()); // 58 images, one is randomly selected by number
            } while (this.imgId === 0);        
            this.imgFileName = this.imgId + '.png';
            this.imgPath = fs.readFileSync('./Animemes/'+ this.imgFileName + '/');
        }
        replyRichEmbed(msgData) {
            let img = new Discord.RichEmbed().attachFile(this.imgPath);
            msgData.reply(img);
        }
    }
}