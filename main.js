const Discord = require('discord.js')
const fs = require('fs');
const fetch = require("node-fetch");

const client = new Discord.Client()
const anHook = new Discord.Webhook(client) ;
anHook.token = 'yhQghPjrcRFSsPEdkEHKTvDO7byyoWz06d735sUax8uVI-c041k1zUjK9u3zbG8tVg39';//'8me7WuW9u3dSxkmMEKNjCzfAo3a0OpDYhaYH_OEFtJBks_n4E7oq7rXAdHC4B_OgoBYc';
anHook.id = '556708705538801664';//'556689729844936714';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    switch (msg.content) {
        case 'pls roast':
            msg.reply('git gud nerd');
            break;
        case 'ping':
            msg.reply('Pong!');
            break;
        case 'marco':
            msg.reply('polo!');
            break;
        case 'animeme':
            let randomMeme = new randImg;
            let img = new Discord.RichEmbed();
            img.attachFile(randomMeme.imgPath);
            msg.reply(img);
            //console.log('Img data: ' + randomMeme);
            break;
        case '>a stuffing':
            animeCallApi();
            break;
        default:
            break;
    }
})

class randImg {
    constructor() {
        this.imgId = Math.round(58*Math.random()); // 58 images, one is randomly selected by number
        this.imgFileName = this.imgId + '.png';
        this.imgPath = fs.readFileSync('./Animemes/'+ this.imgFileName + '/');
    }
}

function animeCallApi() {
    // Here we define our query as a multi-line string
    let query = `
    query ($search: String) { # Define which variables will be used in the query (id)
        Page (page: 1, perPage: 1) {
            media (search: $search, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
                title {
                    romaji
                    english
                    native
                }
                description
            }
        }
    }
    `;

    // Define our query variables and values that will be used in the query request
    let variables = {
        search: 'Kimi No Na Wa'
    };

    // Define the config we'll need for our Api request
    let url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    // Make the HTTP Api request
    fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }
    function handleData(data) {
        console.log(JSON.stringify(data));
        try {
            anHook.sendMessage(JSON.stringify(data));
        } catch (error) {
            handleError(error);
        }    
    }
    function handleError(error) {
        console.error(error);
    }
}


client.login('NTU2NjAyNzUxNDY3OTEzMjE3.D28Jsw.fSzMHJZKyq0WSLkQTTSm2AAiUJY')