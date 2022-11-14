const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const request = require('request');
const querystring = require('query-string');
const { exit } = require('process');
const bodyParser = require('body-parser');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = new Map();

app.get('/spotify/userName', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    var email = '';
    var status_code = 400;

    axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(function (response) {
        email = response.data.id;
        if (response.status === 204) {
            status_code = 400;
        }
        else if (users.has(email) !== true) {
            users.set(email, {'spotify': {'name': response.data.display_name}});
            status_code = 400;
        }
        else {
            if (users.get(email)['spotify']['name'] === undefined) {
                users.get(email)['spotify']['name'] = response.data.display_name;
            }
            else if (users.get(email)['spotify']['name'] !== response.data.display_name) {
                users.get(email)['spotify']['name'] = response.data.display_name;
                status_code = 200;
            }
        }
        console.log(users);
        res.sendStatus(status_code);
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/spotify/userEmail', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(function (response) {
        const email = response.data.id;
        if (response.status === 204) {
            status_code = 400;
        }
        else if (users.has(email) !== true) {
            users.set(email, {'spotify': {'email': response.data.email}});
            status_code = 400;
        }
        else {
            if (users.get(email)['spotify']['email'] === undefined) {
                users.get(email)['spotify']['email'] = response.data.email;
            }
            else if (users.get(email)['spotify']['email'] !== response.data.email) {
                users.get(email)['spotify']['email'] = response.data.email;
                status_code = 200;
            }
        }
        console.log(users);
        res.sendStatus(status_code);
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/spotify/userFollowers', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    var email = '';
    var status_code = 400;

    axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(function (response) {
        email = response.data.id;
        if (response.status === 204) {
            status_code = 400;
        }
        else if (users.has(email) !== true) {
            users.set(email, {'spotify': {'followers': response.data.followers.total}});
            status_code = 400;
        }
        else {
            if (users.get(email)['spotify']['followers'] === undefined) {
                users.get(email)['spotify']['followers'] = response.data.followers.total;
            }
            else if (users.get(email)['spotify']['followers'] !== response.data.followers.total) {
                users.get(email)['spotify']['followers'] = response.data.followers.total;
                status_code = 200;
            }
        }
        console.log(users);
        res.sendStatus(status_code);
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/spotify/userProfileImage', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    var email = '';
    var status_code = 400;

    axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(function (response) {
        email = response.data.id;
        if (response.status === 204) {
            status_code = 400;
        }
        else if (users.has(email) !== true) {
            users.set(email, {'spotify': {'profileImg': response.data.images[0].url}});
            status_code = 400;
        }
        else {
            if (users.get(email)['spotify']['profileImg'] === undefined) {
                users.get(email)['spotify']['profileImg'] = response.data.images[0].url;
            }
            else if (users.get(email)['spotify']['profileImg'] !== response.data.images[0].url) {
                users.get(email)['spotify']['profileImg'] = response.data.images[0].url;
                status_code = 200;
            }
        }
        console.log(users);
        res.sendStatus(status_code);
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/spotify/userProduct', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    var email = '';
    var status_code = 400;

    axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(function (response) {
        email = response.data.id;
        if (response.status === 204) {
            status_code = 400;
        }
        else if (users.has(email) !== true) {
            users.set(email, {'spotify': {'product': response.data.product}});
            status_code = 400;
        }
        else {
            if (users.get(email)['spotify']['product'] === undefined) {
                users.get(email)['spotify']['product'] = response.data.product;
            }
            else if (users.get(email)['spotify']['product'] !== response.data.product) {
                users.get(email)['spotify']['product'] = response.data.product;
                status_code = 200;
            }
        }
        console.log(users);
        res.sendStatus(status_code);
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/spotify/userFollowing', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    var email = '';
    var status_code = 400;

    axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(function (response) {
        email = response.data.id;
        axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me/following?type=artist',
            headers: { 'Authorization': 'Bearer ' + access_token },
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'spotify': {'artists': response.data.artists.total}});
                status_code = 400;
            }
            else {
                if (users.get(email)['spotify']['artists'] === undefined) {
                    users.get(email)['spotify']['artists'] = response.data.artists.total;
                }
                else if (users.get(email)['spotify']['artists'] !== response.data.artists.total) {
                    users.get(email)['spotify']['artists'] = response.data.artists.total;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/spotify/followPlaylist', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (req.body.playlistUrl) {
        res.statusCode = 400
        res.send("Bad info given, need playlistUrl")
        return
    }
    const access_token = req.headers.authorization;
    const playlist_url = req.body.playlistUrl;
    // const playlist_url = "https://open.spotify.com/playlist/3Uv0EZu5gOOEq6mGuPCSrH?si=23d7f521c1d54e75";
    const url_pathname = new URL(playlist_url).pathname;
    const playlist_id = url_pathname.substring('/playlist/'.length, url_pathname.length);

    axios({
        method: 'put',
        url: `https://api.spotify.com/v1/playlists/${playlist_id}/followers`,
        headers: { 'Authorization': 'Bearer ' + access_token },
    }).then(function (response) {
        res.send(response.data);
    }).catch((err) => res.status(503).json({err: err.message}));
})

app.get('/spotify/pausePlayback', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    axios({
        method: 'put',
        url: 'https://api.spotify.com/v1/me/player/pause',
        headers: { 'Authorization': 'Bearer ' + access_token },
    }).then(function (response) {
        res.send(response.data);
    }).catch((err) => res.status(503).json({err: err.message}));
});

app.get('/spotify/resumePlayback', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    axios({
        method: 'put',
        url: 'https://api.spotify.com/v1/me/player/play',
        headers: { 'Authorization': 'Bearer ' + access_token },
    }).then(function (response) {
        res.send(response.data);
    }).catch((err) => res.status(503).json({err: err.message}));
});

app.get('/spotify/skipToNext', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    axios({
        method: 'post',
        url: 'https://api.spotify.com/v1/me/player/next',
        headers: { 'Authorization': 'Bearer ' + access_token },
    }).then(function (response) {
        res.send(response.data);
    }).catch((err) => res.status(503).json({err: err.message}));
});

app.get('/spotify/skipToPrevious', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    axios({
        method: 'post',
        url: 'https://api.spotify.com/v1/me/player/previous',
        headers: { 'Authorization': 'Bearer ' + access_token },
    }).then(function (response) {
        res.send(response.data);
    }).catch((err) => res.status(503).json({err: err.message}));
});

app.get('/spotify/setPlaybackVolume', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (req.body.volume) {
        res.statusCode = 400
        res.send("Bad info given, need req.body.volume")
        return
    }
    const access_token = req.headers.authorization;
    const volume_percent = req.body.volume;
    axios({
        method: 'put',
        url: 'https://api.spotify.com/v1/me/player/volume',
        headers: { 'Authorization': 'Bearer ' + access_token },
        params: { 'volume_percent': volume_percent }
    }).then(function (response) {
        res.send(response.data);
    }).catch((err) => res.status(503).json({err: err.message}));
});

app.listen(PORT);

console.log(`App listening on port ${PORT}`);
