require('dotenv').config();
const axios = require('axios');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = new Map();

const MAX_NUMBER_OF_REQUEST = 15;
const PORT = process.env.PORT;

app.get('/github/ping', (req, res) => {
    res.status(200).json("Ok");
});

app.get('/github/userName', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
        return
    }
    const access_token = req.headers.authorization;
    var email = '';
    var status_code = 400;
    axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' }
    }).then(function (response) {
        email = response.data.id;
        if (response.status === 204) {
            status_code = 400;
        }
        else if (users.has(email) !== true) {
            users.set(email, {'github': {'name': response.data.name}});
            status_code = 400;
        }
        else {
            if (users.get(email)['github']['name'] === undefined) {
                users.get(email)['github']['name'] = response.data.name;
            }
            else if (users.get(email)['github']['name'] !== response.data.name) {
                users.get(email)['github']['name'] = response.data.name;
                status_code = 200;
            }
        }
        console.log(users);
        res.sendStatus(status_code);
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/github/userDescription', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
        return
    }
    const access_token = req.headers.authorization;
    var email = '';
    var status_code = 400;
    axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' }
    }).then(function (response) {
        email = response.data.id;
        if (response.status === 204) {
            status_code = 400;
        }
        else if (users.has(email) !== true) {
            users.set(email, {'github': {'bio': response.data.bio}});
            status_code = 400;
        }
        else {
            if (users.get(email)['github']['bio'] === undefined) {
                users.get(email)['github']['bio'] = response.data.bio;
            }
            else if (users.get(email)['github']['bio'] !== response.data.bio) {
                users.get(email)['github']['bio'] = response.data.bio;
                status_code = 200;
            }
        }
        console.log(users);
        res.sendStatus(status_code);
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.post('/github/updateUserName', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
    } else if (! req.body.name) {
        res.statusCode = 400;
        res.send("Bad info given, need name");
    } else {
        const access_token = req.headers.authorization;
        const new_name = req.body.name;
        axios({
            method: 'patch',
            url: `https://api.github.com/user`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' },
            data: { 'name': new_name }
        }).then(function (response) {
            res.json(response.data);
        }).catch((err) => res.status(503).json({err: err.message}));
    }
})

app.post('/github/updateUserEmail', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
    } else if (! req.body.email) {
        res.statusCode = 400;
        res.send("Bad info given, need email");
    } else {
        const access_token = req.headers.authorization;
        const new_email = req.body.email;
        axios({
            method: 'patch',
            url: `https://api.github.com/user`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' },
            data: { 'email': new_email }
        }).then(function (response) {
            res.json(response.data);
        }).catch((err) => res.status(503).json({err: err.message}));
    }
})

app.post('/github/updateUserDescription', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
    } else if (! req.body.bio) {
        res.statusCode = 400;
        res.send("Bad info given, need bio");
    } else {
        const access_token = req.headers.authorization;
        const new_bio = req.body.bio;
        axios({
            method: 'patch',
            url: `https://api.github.com/user`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' },
            data: { 'bio': new_bio }
        }).then(function (response) {
            res.json(response.data);
        }).catch((err) => res.status(503).json({err: err.message}));
    }
})

app.post('/github/updateEmailVisibility', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
    } else if (! req.body.visibility) {
        res.statusCode = 400;
        res.send("Bad info given, need visibility");
    } else {
        const access_token = req.headers.authorization;
        const visibility = req.body.visibility;
        axios({
            method: 'patch',
            url: `https://api.github.com/user/email/visibility`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' },
            data: { 'visibility': visibility }
        }).then(function (response) {
            res.json(response.data);
        }).catch((err) => res.status(503).json({err: err.message}));
    }
})

app.get('/github/userFollowers', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
        return
    } 
    const access_token = req.headers.authorization;
    var email = '';
    var status_code = 400;
    axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' }
    }).then(function (response) {
        email = response.data.id;
        axios({
            method: 'get',
            url: `https://api.github.com/user/followers`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' },
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'github': {'followers': response.data.length}});
                status_code = 400;
            }
            else {
                if (users.get(email)['github']['followers'] === undefined) {
                    users.get(email)['github']['followers'] = response.data.length;
                }
                else if (users.get(email)['github']['followers'] !== response.data.length) {
                    users.get(email)['github']['followers'] = response.data.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);    
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/github/userFollowing', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
        return
    } 
    const access_token = req.headers.authorization;
    var email = '';
    var status_code = 400;
    axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' }
    }).then(function (response) {
        email = response.data.id;
        axios({
            method: 'get',
            url: `https://api.github.com/user/following`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' },
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'github': {'following': response.data.length}});
                status_code = 400;
            }
            else {
                if (users.get(email)['github']['following'] === undefined) {
                    users.get(email)['github']['following'] = response.data.length;
                }
                else if (users.get(email)['github']['following'] !== response.data.length) {
                    users.get(email)['github']['following'] = response.data.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/github/userRepository', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
        return
    } 
    const access_token = req.headers.authorization;
    var email = '';
    var status_code = 400;
    axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' }
    }).then(function (response) {
        email = response.data.id;
        axios({
            method: 'get',
            url: `https://api.github.com/user/repos`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' },
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'github': {'repositories': response.data.length}});
                status_code = 400;
            }
            else {
                if (users.get(email)['github']['repositories'] === undefined) {
                    users.get(email)['github']['repositories'] = response.data.length;
                }
                else if (users.get(email)['github']['repositories'] !== response.data.length) {
                    users.get(email)['github']['repositories'] = response.data.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.post('/github/createRepository', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
    } else if (! req.body.repository) {
        res.statusCode = 400;
        res.send("Bad info given, need repository");
    } else if (! req.body.description) {
        res.statusCode = 400;
        res.send("Bad info given, need description");
    } else {
        const access_token = req.headers.authorization;
        const repository_name = req.body.repository;
        const repository_description = req.body.description;
        axios({
            method: 'post',
            url: `https://api.github.com/user/repos`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' },
            data: { "name": repository_name, "description": repository_description }
        }).then(function (response) {
            res.json(response.data);
        }).catch((err) => res.status(503).json({err: err.message}));
    }
})

app.get('/github/userCommits', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
        return
    } 
    const access_token = req.headers.authorization;
    var email = '';
    var status_code = 400;
    axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' }
    }).then(function (response) {
        email = response.data.id;
        axios({
            method: 'get',
            url: `https://api.github.com/user/repos`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' },
        }).then(function (response) {
            var request_number = 0;
            const repositories = response.data;
            repositories.forEach(function (element) {
                if (request_number === MAX_NUMBER_OF_REQUEST)
                    return;
                const owner = element.owner.login;
                const repository = element.name;
                axios({
                    method: 'get',
                    url: `https://api.github.com/repos/${owner}/${repository}/commits`,
                    headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' },
                }).then(function (response) {
                    if (response.status === 204) {
                        status_code = 400;
                    }
                    else if (users.has(email) !== true) {
                        users.set(email, {'github': {'commits': { [repository]: response.data.length}}});
                        status_code = 400;
                    }
                    else {
                        if (users.get(email)['github']['commits'][repository] === undefined) {
                            users.get(email)['github']['commits'][repository] = response.data.length;
                            status_code = 400;
                        }
                        else if (users.get(email)['github']['commits'][repository] !== response.data.length) {
                            users.get(email)['github']['commits'][repository] = response.data.length;
                            status_code = 200;
                        }
                    }
                    res.sendStatus(status_code);
                }).catch(function (err) {
                    if (err.response) {
                        // Request made and server responded
                        console.log(err.response.data);
                        const status = err.response.status;
                        if (status === 409) {
                            status_code = 400;
                            if (users.has(email) !== true) {
                                users.set(email, {'github': {'commits': { [repository]: 0}}});
                            }
                            else {
                                users.get(email)['github']['commits'][repository] = 0;
                            }
                            res.sendStatus(status_code);
                            return;
                        }
                    }
                });
                request_number++;
            });
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.get('/github/userBranches', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
        return
    } 
    const access_token = req.headers.authorization;
    var email = '';
    var status_code = 400;
    axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' }
    }).then(function (response) {
        email = response.data.id;
        axios({
            method: 'get',
            url: `https://api.github.com/user/repos`,
            headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' },
        }).then(function (response) {
            var request_number = 0;
            const repositories = response.data;
            repositories.forEach(function (element) {
                if (request_number === MAX_NUMBER_OF_REQUEST)
                    return;
                const owner = element.owner.login;
                const repository = element.name;
                axios({
                    method: 'get',
                    url: `https://api.github.com/repos/${owner}/${repository}/branches`,
                    headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/vnd.github+json' },
                }).then(function (response) {
                    if (response.status === 204) {
                        status_code = 400;
                    }
                    else if (users.has(email) !== true) {
                        users.set(email, {'github': {'branches': { [repository]: response.data.length}}});
                        status_code = 400;
                    }
                    else {
                        if (users.get(email)['github']['branches'][repository] === undefined) {
                            users.get(email)['github']['branches'][repository] = response.data.length;
                        }
                        else if (users.get(email)['github']['branches'][repository] !== response.data.length) {
                            users.get(email)['github']['branches'][repository] = response.data.length;
                            status_code = 200;
                        }
                    }
                    console.log(users);
                    res.sendStatus(status_code);
                }).catch((err) => res.status(500).json({err: err.message}));
                request_number++;
            });
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.listen(PORT);

console.log(`App listening on PORT ${PORT}`);
