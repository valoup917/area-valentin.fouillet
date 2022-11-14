const express = require('express');
const axios = require('axios');
const querystring = require('query-string');
const bodyParser = require('body-parser');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = new Map();

app.get('/twitch/userName', (req, res) => {
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
        url: `https://api.twitch.tv/helix/users`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
    }).then(function (response) {
        const userId = (response.data.data[0].id);
        if (response.status === 204) {
            status_code = 400;
        }
        else if (users.has(userId) !== true) {
            users.set(userId, {'twitch': {'name': response.data.data[0].display_name}});
            status_code = 400;
        }
        else {
            if (users.get(userId)['twitch']['name'] === undefined) {
                users.get(userId)['twitch']['name'] = response.data.data[0].display_name;
            }
            else if (users.get(userId)['twitch']['name'] !== response.data.data[0].display_name) {
                users.get(userId)['twitch']['name'] = response.data.data[0].display_name;
                status_code = 200;
            }
        }
        console.log(users);
        res.sendStatus(status_code);
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/twitch/userDescription', (req, res) => {
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
        url: `https://api.twitch.tv/helix/users`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
    }).then(function (response) {
        const userId = (response.data.data[0].id);
        if (response.status === 204) {
            status_code = 400;
        }
        else if (users.has(userId) !== true) {
            users.set(userId, {'twitch': {'description': response.data.data[0].description}});
            status_code = 400;
        }
        else {
            if (users.get(userId)['twitch']['description'] === undefined) {
                users.get(userId)['twitch']['description'] = response.data.data[0].description;
            }
            else if (users.get(userId)['twitch']['description'] !== response.data.data[0].description) {
                users.get(userId)['twitch']['description'] = response.data.data[0].description;
                status_code = 200;
            }
        }
        console.log(users);
        res.sendStatus(status_code);
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/twitch/userProfileImage', (req, res) => {
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
        url: `https://api.twitch.tv/helix/users`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
    }).then(function (response) {
        const userId = (response.data.data[0].id);
        if (response.status === 204) {
            status_code = 400;
        }
        else if (users.has(userId) !== true) {
            users.set(userId, {'twitch': {'profileImg': response.data.data[0].profile_image_url}});
            status_code = 400;
        }
        else {
            if (users.get(userId)['twitch']['profileImg'] === undefined) {
                users.get(userId)['twitch']['profileImg'] = response.data.data[0].profile_image_url;
            }
            else if (users.get(userId)['twitch']['profileImg'] !== response.data.data[0].profile_image_url) {
                users.get(userId)['twitch']['profileImg'] = response.data.data[0].profile_image_url;
                status_code = 200;
            }
        }
        console.log(users);
        res.sendStatus(status_code);
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/twitch/userEmail', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    axios({
        method: 'get',
        url: `https://api.twitch.tv/helix/users`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
    }).then(function (response) {
        const userId = (response.data.data[0].id);
        if (response.status === 204) {
            status_code = 400;
        }
        else if (users.has(userId) !== true) {
            users.set(userId, {'twitch': {'email': response.data.data[0].email}});
            status_code = 400;
        }
        else {
            if (users.get(userId)['twitch']['email'] === undefined) {
                users.get(userId)['twitch']['email'] = response.data.data[0].email;
            }
            else if (users.get(userId)['twitch']['email'] !== response.data.data[0].email) {
                users.get(userId)['twitch']['email'] = response.data.data[0].email;
                status_code = 200;
            }
        }
        console.log(users);
        res.sendStatus(status_code);
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/twitch/changeDescription', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (req.body.description) {
        res.statusCode = 400
        res.send("Bad info given, need description")
        return
    }
    const access_token = req.headers.authorization;
    const new_description = req.body.description;
    axios({
        method: 'put',
        url: `https://api.twitch.tv/helix/users?description=${new_description}`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
    }).then(function (response) {
        res.json(response.data);
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/twitch/userFollowers', (req, res) => {
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
        url: `https://api.twitch.tv/helix/users`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
    }).then(function (response) {
        const userId = (response.data.data[0].id);
        email = (response.data.data[0].email);
        axios({
            method: 'get',
            url: `https://api.twitch.tv/helix/users/follows?to_id=${userId}`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(userId) !== true) {
                users.set(userId, {'twitch': {'followers': response.data.total}});
                status_code = 400;
            }
            else {
                if (users.get(userId)['twitch']['followers'] === undefined) {
                    users.get(userId)['twitch']['followers'] = response.data.total;
                }
                else if (users.get(userId)['twitch']['followers'] !== response.data.total) {
                    users.get(userId)['twitch']['followers'] = response.data.total;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/twitch/userBlockedUsers', (req, res) => {
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
        url: `https://api.twitch.tv/helix/users`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
    }).then(function (response) {
        const userId = (response.data.data[0].id);
        email = (response.data.data[0].email);
        axios({
            method: 'get',
            url: `https://api.twitch.tv/helix/users/blocks?broadcaster_id=${userId}`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(userId) !== true) {
                users.set(userId, {'twitch': {'blockedUsers': response.data.data.length}});
                status_code = 400;
            }
            else {
                if (users.get(userId)['twitch']['blockedUsers'] === undefined) {
                    users.get(userId)['twitch']['blockedUsers'] = response.data.data.length;
                }
                else if (users.get(userId)['twitch']['blockedUsers'] !== response.data.data.length) {
                    users.get(userId)['twitch']['blockedUsers'] = response.data.data.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/twitch/userPlaylists', (req, res) => {
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
        url: `https://api.twitch.tv/helix/soundtrack/playlists`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
    }).then(function (response) {
        const userId = (response.data.data[0].id);
        if (response.status === 204) {
            status_code = 400;
        }
        else if (users.has(userId) !== true) {
            users.set(userId, {'twitch': {'playlists': response.data.data.length}});
            status_code = 400;
        }
        else {
            if (users.get(userId)['twitch']['playlists'] === undefined) {
                users.get(userId)['twitch']['playlists'] = response.data.data.length;
            }
            else if (users.get(userId)['twitch']['playlists'] !== response.data.data.length) {
                users.get(userId)['twitch']['playlists'] = response.data.data.length;
                status_code = 200;
            }
        }
        console.log(users);
        res.sendStatus(status_code);
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/twitch/userFollowing', (req, res) => {
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
        url: `https://api.twitch.tv/helix/users`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
    }).then(function (response) {
        const userId = (response.data.data[0].id);
        email = (response.data.data[0].email);
        axios({
            method: 'get',
            url: `https://api.twitch.tv/helix/streams/followed?user_id=${userId}`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(userId) !== true) {
                users.set(userId, {'twitch': {'following': response.data.data.length}});
                status_code = 400;
            }
            else {
                if (users.get(userId)['twitch']['following'] === undefined) {
                    users.get(userId)['twitch']['following'] = response.data.data.length;
                }
                else if (users.get(userId)['twitch']['following'] !== response.data.data.length) {
                    users.get(userId)['twitch']['following'] = response.data.data.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);    
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/twitch/userVideos', (req, res) => {
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
        url: `https://api.twitch.tv/helix/users`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
    }).then(function (response) {
        const userId = (response.data.data[0].id);
        email = (response.data.data[0].email);
        axios({
            method: 'get',
            url: `https://api.twitch.tv/helix/videos?user_id=${userId}`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(userId) !== true) {
                users.set(userId, {'twitch': {'videos': response.data.data.length}});
                status_code = 400;
            }
            else {
                if (users.get(userId)['twitch']['videos'] === undefined) {
                    users.get(userId)['twitch']['videos'] = response.data.data.length;
                }
                else if (users.get(userId)['twitch']['videos'] !== response.data.data.length) {
                    users.get(userId)['twitch']['videos'] = response.data.data.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);    
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/twitch/raidUser', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    axios({
        method: 'get',
        url: `https://api.twitch.tv/helix/users`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
    }).then(function (response) {
        const userId = (response.data.data[0].id);
        axios({
            method: 'get',
            url: `https://api.twitch.tv/helix/users/follows?to_id=${userId}`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
        }).then(function (response) {
            const limit = response.data.total;
            const datas = response.data.data;
            const random = Math.floor(Math.random() * (limit + 1));
            const fromId = datas[random].from_id;
            axios({
                method: 'post',
                url: `https://api.twitch.tv/helix/raids?from_broadcaster_id=${userId}&to_broadcaster_id=${fromId}`,
                headers: { 'Authorization': 'Bearer ' + access_token, 'Client-Id': CLIENT_ID }
            }).then(function (response) {
                res.json(response.data);
            }).catch((err) => res.status(500).json({err: err.message}));        
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.listen(PORT);

console.log(`App listening on port ${PORT}`);
