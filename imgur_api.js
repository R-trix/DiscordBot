const fetch = require("node-fetch");
const secrets = require('./secrets.json');
const IMGUR_API_CLIENT_ID = secrets.imgur_id;
const IMGUR_API_CLIENT_SECRET = secrets.imgur_secret;

module.exports = {
    imgurApi: class {
        constructor(content) {
            this.msgcontent = content;
            this.queryTerm = this.msgcontent.replace(/\s/g, '%20');
            this.url = 'https://api.imgur.com/3/gallery/search/top/all?q=' + this.queryTerm;
            this.options = {headers: {Authorization: `Client-ID ${IMGUR_API_CLIENT_ID}`}}
        }
        imageSearch(msg) {
            fetch(this.url, this.options).then(handleResponse).then(handleData).catch(handleError);

            function handleResponse(response) {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            }
            function handleData(data) {
                let link = data.data[0].link
                console.log(link);
                msg.reply(link);
            }
            function handleError(error) {
                console.error(error);
            }
        }
    }
}
