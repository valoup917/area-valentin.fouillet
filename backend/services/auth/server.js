import express from 'express'
import axios from 'axios'
import session from 'express-session'
import bodyParser from 'body-parser'
import path from 'path';
import { fileURLToPath } from 'url';
import { twitter_login, twitter_callback } from './routes/twitter_auth.js';
import { google_login, google_callback } from './routes/google_auth.js';
import { github_login, github_callback } from './routes/github_auth.js';
import { linkedin_login, linkedin_callback } from './routes/linkedin_auth.js';
import { discord_login, discord_callback } from './routes/discord_auth.js'
import { spotify_login, spotify_callback } from './routes/spotify_auth.js'
import { twitch_login, twitch_callback } from './routes/twitch_auth.js'
import { notion_login, notion_callback } from './routes/notion_auth.js'
import cors from 'cors'

const app = express();
app.use(express.static('.'));
app.use(cors())
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'azerty',
    saveUninitialized: true,
    cookie: {}
}))
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/auth", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get("/auth/ping", (req, res) => {
    res.send("Ok")
})

const services_dict = {
    "twitter": twitter_login,
    "google": google_login,
    "youtube": google_login,
    "calendar": google_login,
    "drive": google_login,
    "gmail": google_login,
    "github": github_login,
    "linkedin": linkedin_login,
    "discord": discord_login,
    "spotify": spotify_login,
    "twitch": twitch_login,
    "muslim": 200,
    "riot": 200,
    "weather": 200,
    "coingecko": 200,
    "ipfs": 200,
    "null": "null",
}

'use strict';
app.get("/auth/isLoggedWith", async (req, res) => {
    var Service = req.query.service
    const Email = req.query.email

    if (Service == "calendar" || Service == "youtube" || Service == "drive" || Service == "gmail") {
        Service = "google";
    } 

    console.log("is `" + Email + "` logged with `" + Service + "`")

    if (Service == null || Service.length <= 2) {
        res.status(400).send("'service' key is missing")
        return
    }
    if (Email == null || Email.length <= 2) {
        res.status(400).send("'email' key is missing")
        return
    }

    for (const [key, val] of Object.entries(services_dict)) {
        if (Service === key) {
            if (typeof(val) === 'number') {
                res.status(200).send("No logging required")
                return
            }
            break
        }
        if (key === "null") {
            res.status(404).send("Service `" + Service + "` not found")
            return
        }
    }
    var status_code = 401
    var response_data = ''
    await axios({
        method: "get",
        url:  "http://db:9020/db/ManipulateCredentials/checkserviceloggedin",
        params: {
            mail: Email,
            service: Service
        }
    }).then((response) => {
        console.log(response.data)
        console.log(response.status)
        status_code = response.status
        response_data = response.data
    }).catch(error => {
        if (error.response && error.response.data) {
            if (error.response.status !== 401) {
                console.log(error.response.status)
                status_code = error.response.status;
                response_data = error.response.data;
            }
            else {
                status_code = error.response.status;
                response_data = error.response.data;
            }
        } else {
            status_code = error.response.status;
            response_data = error.response.data;
        }
    })
    console.log("status_code = " + status_code)
    console.log("response_data = " + response_data)
    if (status_code != 401) {
        res.status(status_code).send(response_data)
        return
    }

    for(const [key, val] of Object.entries(services_dict)) {
        if (Service === key) {
            const oauth2_link = val(req, res)
            res.status(400).send(oauth2_link)
            return
        }
        if (key === "null") {
            res.status(404).send("Service `" + Service + "` not found")
            return
        }
    }
})

// -------------- TWITTER --------------

app.get("/auth/twitter/login", (req, res) => {
    console.log(twitter_login());
})

app.get("/auth/twitter/callback", (req, res) => {
    twitter_callback(req, res);
})

// -------------- TWITCH --------------

app.get("/auth/twitch/callback", (req, res) => {
    twitch_callback(req, res)
})

// -------------- GOOGLE --------------

app.get("/auth/google/login", (req, res) => {
    const tmp = services_dict.google(req, res)
    console.log(tmp)
    res.send(tmp)
})

app.get("/auth/google/callback", (req, res) => {
    google_callback(req, res)
})

// -------------- GITHUB --------------

app.get('/auth/github/callback', ({ query: { code } }, res) => {
    github_callback(res, code);
});

// -------------- LINKEDIN --------------

app.get('/auth/linkedin/callback', (req, res) => {
    linkedin_callback(req, res);
});

// -------------- DISCORD  --------------

app.get('/auth/discord/login', (req, res) => {
    console.log(discord_login(req, res));
})

app.get('/auth/discord/callback', (req, res) => {
    discord_callback(req, res);
})

// -------------- SPOTIFY  --------------

app.get('/auth/spotify/callback', (req, res) => {
    spotify_callback(req, res);
})

// -------------- NOTION  --------------

// app.get('/auth/notion/callback', (req, res) => {
//     notion_callback(req, res);
// })

// -------------- NOTION  --------------

app.post('/auth/login', async (req, res) => {
    if (!req.body.mail) {
        res.statusCode = 400
        res.send("Bad info given, need mail")
        return
    } else if (!req.body.password) {
        res.statusCode = 400
        res.send("Bad info given, need password")
        return
    }
    if (!req.body.service) {
        await axios({
            method : 'get',
            url: 'http://db:9020/db/ManipulateLogin/checkaccess',
            headers: {},
            data: {
                mail: req.body.mail,
                password: req.body.password,
            }
        }).then (function (resp) {
            res.statusCode = resp.status
            res.send(resp.data)
        }).catch(function (err) {
            res.statusCode = err.response.status
            res.send(err.response.data)
        })
    } else {
        await axios({
            method : 'get',
            url: 'http://db:9020/db/ManipulateLogin/loginwithcredentials',
            headers: {},
            data: {
                mail: req.body.mail,
                service: req.body.service,
                access_token: req.body.password,
            }
        }).then (function (resp) {
            res.statusCode = resp.status
            res.send(resp.data)
        }).catch(function (err) {
            res.statusCode = err.response.status
            res.send(err.response.data)
        })
    }
})

app.post('/auth/register', (req, res) => {
    if (!req.body.mail) {
        res.statusCode = 400
        res.send("Bad info given, need mail")
    } else if (!req.body.password) {
        res.statusCode = 400
        res.send("Bad info given, need password")
    }
    if (!req.body.service) {
        axios({
            method : 'post',
            url: 'http://db:9020/db/ManipulateLogin/newlogin',
            headers: {},
            data: {
                mail: req.body.mail,
                password: req.body.password,
            }
        }).then (function (resp) {
            res.statusCode = resp.status
            res.send(resp.data)
        }).catch(function (err) {
            res.statusCode = err.response.status
            res.send(err.response.data)
        })
    } else {
        axios({
            method : 'post',
            url: 'http://db:9020/db/ManipulateLogin/registerwithcredentials',
            headers: {},
            data: {
                mail: req.body.mail,
                service: req.body.service,
                access_token: req.body.password,
            }
        }).then (function (resp) {
            res.statusCode = resp.status
            res.send(resp.data)
        }).catch(function (err) {
            res.statusCode = err.response.status
            res.send(err.response.data)
        })
    }
})

// --------------------------------------

app.listen(process.env.PORT, () =>
    console.log("Listening on port " + process.env.PORT)
)