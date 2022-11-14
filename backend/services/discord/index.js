const express = require('express');
const Discord = require('discord.js');
const config = require('./config');
const axios = require('axios');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');

const app = express();
const intents = new Discord.IntentsBitField(3276799)
const client = new Discord.Client({ intents })
const pingeveryone = "@everyone"
const randomgifs = [
    "https://i.imgur.com/A2IfLLl.gif",
    "https://tenor.com/view/monkey-phone-waiting-impatient-annoyed-gif-5043572",
    "https://tenor.com/view/monkey-pissed-mad-angry-furious-gif-4720563",
    "https://tenor.com/view/monkey-wtf-monkey-gasp-monkey-gif-22578374",
    "https://tenor.com/view/monkey-fall-monkey-falling-monke-monke-fall-monkey-shock-gif-25040480",
    "https://tenor.com/view/microphone-man-eat-mic-man-eat-microphone-interview-gif-17227331",
    "https://tenor.com/view/pedro-monkey-puppet-meme-awkward-gif-15268759",
    "https://imgur.com/on8YVnK.gif",
    "https://imgur.com/Yt8hOvA.gif",
];
const subReddits = [
    "r/meme",
    "r/memes"
];

dotenv.config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
client.login(config.token)

async function get_user_info(access_token) {
    const resp = await axios.get("https://discord.com/api/v8/users/@me", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
    console.log("resp = ");
    console.log(resp);
    return resp.data;
}

async function get_user_servers(access_token) {
    const resp = await axios.get("https://discord.com/api/v8/users/@me/guilds", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
    return resp.data;
}

async function check_user_acceptability(access_token) {
    const resp = await get_user_servers(access_token)
    let corresponding = false;

    for (i = 0; i < resp.length; i++) {
        client.guilds.cache.forEach(guild => {
            if (guild.id === resp[i].id) {
                corresponding = true;
            }
        })
    }
    return corresponding;
}

function format_mention(user_id) {
    return `<@${user_id}>`
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

client.login(config.token)

function randomInt(min, max) {
    return (Math.floor(Math.random() * (max - min))) + min;
}

function getRandomPost(posts) {
    const randomIndex = randomInt(0, posts.length);
    return posts[randomIndex].data;
}

app.get('/Discord/announcement', (req, res) => {
    if (!req.body.messageContent) {
        res.statusCode = 400;
        res.send("Empty messageContent");
    } else {
        client.guilds.cache.forEach(guild => {
            const channel = guild.channels.cache.find(c => c.name === 'general')

            if (channel) channel.send(pingeveryone + req.body.messageContent)
                .then(() => console.log('Sent on ' + channel.name))
                .catch(console.error)
            else console.log('On guild ' + guild.name + ' I could not find a channel where I can type.')
        })
        res.statusCode = 200;
        res.send("Message sent to all server");
    }
})

app.get("/Discord/message", async (req, res) => {
    if (!req.body.messageContent) {
        res.statusCode = 400;
        res.send("Empty messageContent");
    }  else if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Empty authorization");
    } else {
        console.log(req.headers.authorization)
        console.log(req.body.messageContent)
        const user_info = await get_user_info(req.headers.authorization)
        const user_acceptability = await check_user_acceptability(req.headers.authorization);
        if (user_acceptability === false) {
            res.statusCode = 400
            res.end("User does not appear in any server the bot is in")
        }
        const channel = client.channels.cache.find(ch => ch.name === process.env.MESSAGES_CHANEL_NAME)
        if (channel)    channel.send(format_mention(user_info.id) + " " + req.body.messageContent)
        if (user_acceptability === true) {
            res.statusCode = 200;
            res.send(`Message sent in chanel: ${process.env.MESSAGES_CHANEL_NAME}`);
        } else {
            res.statusCode = 400;
            res.send(`Could not find channel : ${process.env.MEMES_CHANEL_NAME}`)
        }
    }
});

app.get("/Discord/sendrandommeme", async (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Empty access_token");
    } else {
        const randomIndex = randomInt(0, subReddits.length);
        const user_info = await get_user_info(req.headers.authorization)
        /*
        const user_acceptability = await check_user_acceptability(req.headers.authorization);

        if (user_acceptability === false) {
            res.statusCode = 400
            res.end("User does not appear in any server the bot is in")
        }
        axios
            .get(`https://reddit.com/${subReddits[randomIndex]}/.json`)
            .then((resp) => {
                const {
                    url,
                    subreddit_name_prefixed: subreddit
                } = getRandomPost(resp.data.data.children);

                const channel = client.channels.cache.find(ch => ch.name === process.env.MEMES_CHANEL_NAME)

                if (channel) {
                    channel.send(`${url}`)
                    channel.send(format_mention(user_info.id))
                    res.statusCode = 200;
                    res.send(`Meme sent in chanel : ${process.env.MEMES_CHANEL_NAME}`)
                } else {
                    res.statusCode = 400;
                    res.send(`Could not find channel : ${process.env.MEMES_CHANEL_NAME}`)
                }
            })
            */
        }
});

app.get("/Discord/sendrandomgif", async (req, res) => {

    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Empty access_token");
    } else {
        const user_info = await get_user_info(req.headers.authorization)
        const user_acceptability = await check_user_acceptability(req.headers.authorization);
        if (user_acceptability === false) {
            res.statusCode = 400
            res.end("User does not appear in any server the bot is in")
        }
        const random_gif = randomgifs[randomInt(0, randomgifs.length)];
        const channel = client.channels.cache.get(process.env.GIFS_CHANEL_ID);

        if (channel) {
            channel.send(random_gif)
            channel.send(format_mention(user_info.id))
            res.statusCode = 200;
            res.send(`Gif sent in chanel ${process.env.GIFS_CHANEL_NAME}`)
        } else {
            res.statusCode = 400;
            res.send(`Could not find channel : ${process.env.GIFS_CHANEL_NAME}`)
        }
    }
});

app.get("/Discord/ping", (req, res) => {
    res.statusCode = 200
    res.send("OK")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`);
});