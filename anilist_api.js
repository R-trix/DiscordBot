const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
    anilistSearch: class  {
        constructor(content) {
            this.msgContent = content;
            this.variables = {search: this.msgContent};
            this.url = 'https://graphql.anilist.co';
            this.query = `
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
            this.options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: this.query,
                    variables: this.variables
                })
            };
        }
        animeSearch(msg) {
            fetch(this.url, this.options).then(handleResponse).then(handleData).catch(handleError);

            function handleResponse(response) {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            }
            function handleData(data) {
                let pageData = data.data.Page;
                function name(pageJson) {
                    if ((typeof pageJson.media[0].title.english) === 'string') {
                        return pageJson.media[0].title.english;
                    } else if ((typeof pageJson.media[0].title.romaji) === 'string') {
                        return pageJson.media[0].title.romaji;
                    } else if ((typeof pageJson.media[0].title.native) === 'string') {
                        return pageJson.media[0].title.native;
                    } else {
                        return 'No title found.';
                    }
                }
                function description(pageJson) {
                    if ((typeof pageJson.media[0].description) === 'string') {
                        return pageJson.media[0].description;
                    } else {
                        return 'No description found.';
                    }
                }
                let title = name(pageData);
                //console.log(title);
                let breakRegex = /<br>/gi;
                let summary = description(pageData).replace(breakRegex, '');
                //console.log(summary);
                try {
                    let aniSearch = new Discord.RichEmbed();
                    aniSearch.setTitle(title).setDescription(summary).setColor([Math.round(255*Math.random()),Math.round(255*Math.random()),Math.round(255*Math.random())]);
                    msg.reply(aniSearch);
                } catch (error) {
                    handleError(error);
                }  
            }
            function handleError(error) {
                console.error(error);
            }
        }
    }
}
