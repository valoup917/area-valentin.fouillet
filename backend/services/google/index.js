const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const request = require('request');
const nodemailer = require('nodemailer');
const { exit } = require('process');
const bodyParser = require('body-parser');
require('dotenv').config();

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = new Map();

app.get('/google/ping', (req, res) => {
    res.status(200).json("Ok");
});

app.get('/google/gmail/getUserMessages', (req, res) => {
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
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://gmail.googleapis.com/gmail/v1/users/${email}/threads`,
            headers: { 'Authorization': 'Bearer ' + access_token }
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'gmail': {'messages': response.data.resultSizeEstimate}});
                status_code = 400;
            }
            else {
                if (users.get(email)['gmail']['messages'] === undefined) {
                    users.get(email)['gmail']['messages'] = response.data.resultSizeEstimate;
                }
                else if (users.get(email)['gmail']['messages'] !== response.data.resultSizeEstimate) {
                    users.get(email)['gmail']['messages'] = response.data.resultSizeEstimate;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/gmail/getUserDrafts', (req, res) => {
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
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://gmail.googleapis.com/gmail/v1/users/${email}/drafts`,
            headers: { 'Authorization': 'Bearer ' + access_token }
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'gmail': {'drafts': response.data.resultSizeEstimate}});
                status_code = 400;
            }
            else {
                if (users.get(email)['gmail']['drafts'] === undefined) {
                    users.get(email)['gmail']['drafts'] = response.data.resultSizeEstimate;
                }
                else if (users.get(email)['gmail']['drafts'] !== response.data.resultSizeEstimate) {
                    users.get(email)['gmail']['drafts'] = response.data.resultSizeEstimate;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/gmail/getUserLabels', (req, res) => {
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
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://gmail.googleapis.com/gmail/v1/users/${email}/labels`,
            headers: { 'Authorization': 'Bearer ' + access_token }
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'gmail': {'labels': response.data.labels.length}});
                status_code = 400;
            }
            else {
                if (users.get(email)['gmail']['labels'] === undefined) {
                    users.get(email)['gmail']['labels'] = response.data.labels.length;
                }
                else if (users.get(email)['gmail']['labels'] !== response.data.labels.length) {
                    users.get(email)['gmail']['labels'] = response.data.labels.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/gmail/getUserLanguage', (req, res) => {
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
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://gmail.googleapis.com/gmail/v1/users/${email}/settings/language`,
            headers: { 'Authorization': 'Bearer ' + access_token }
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'gmail': {'language': response.data.displayLanguage}});
                status_code = 400;
            }
            else {
                if (users.get(email)['gmail']['language'] === undefined) {
                    users.get(email)['gmail']['language'] = response.data.displayLanguage;
                }
                else if (users.get(email)['gmail']['language'] !== response.data.displayLanguage) {
                    users.get(email)['gmail']['language'] = response.data.displayLanguage;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/gmail/updateUserLanguage', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (!req.body.language) {
        res.statusCode = 400
        res.send("Bad info given, need language")
        return
    }
    const access_token = req.headers.authorization;
    const language = req.body.language;
    var email = '';
    axios({
        method: 'get',
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
    }).then(function (response) {
        axios({
            method: 'put',
            url: `https://gmail.googleapis.com/gmail/v1/users/${email}/settings/language`,
            headers: { 'Authorization': 'Bearer ' + access_token },
            data: { 'displayLanguage': language }
        }).then(function (response) {
            res.json(response.data);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(503).json({err: err.message}));
});

app.get('/google/gmail/getUserFilters', (req, res) => {
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
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://gmail.googleapis.com/gmail/v1/users/${email}/settings/filters`,
            headers: { 'Authorization': 'Bearer ' + access_token }
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'gmail': {'filters': response.data.filter.length}});
                status_code = 400;
            }
            else {
                if (users.get(email)['gmail']['filters'] === undefined) {
                    users.get(email)['gmail']['filters'] = response.data.filter.length;
                }
                else if (users.get(email)['gmail']['filters'] !== response.data.filter.length) {
                    users.get(email)['gmail']['filters'] = response.data.filter.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/gmail/getUserSendAs', (req, res) => {
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
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://gmail.googleapis.com/gmail/v1/users/${email}/settings/sendAs`,
            headers: { 'Authorization': 'Bearer ' + access_token }
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'gmail': {'sendAs': response.data.sendAs.length}});
                status_code = 400;
            }
            else {
                if (users.get(email)['gmail']['sendAs'] === undefined) {
                    users.get(email)['gmail']['sendAs'] = response.data.sendAs.length;
                }
                else if (users.get(email)['gmail']['sendAs'] !== response.data.sendAs.length) {
                    users.get(email)['gmail']['sendAs'] = response.data.sendAs.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/gmail/trashMessage', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (!req.body.message) {
        res.statusCode = 400
        res.send("Bad info given, need message")
        return
    }
    const access_token = req.headers.authorization;
    const message = req.body.message;
    var email = '';
    axios({
        method: 'get',
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://gmail.googleapis.com/gmail/v1/users/${email}/threads`,
            headers: { 'Authorization': 'Bearer ' + access_token }
        }).then(function (response) {
            const messages = response.data.threads;
            var messageId = '';
            messages.forEach(function (element) {
                if (element.snippet === message)
                    messageId = element.id;
            });
            axios({
                method: 'post',
                url: `https://gmail.googleapis.com/gmail/v1/users/${email}/threads/${messageId}/trash`,
                headers: { 'Authorization': 'Bearer ' + access_token }
            }).then(function (response) {
                res.json(response.data);
            }).catch((err) => res.status(500).json({err: err.message}));
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/gmail/sendMail', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (!req.body.toEmail) {
        res.statusCode = 400
        res.send("Bad info given, need toEmail")
        return
    }  else if (!req.body.text) {
        res.statusCode = 400
        res.send("Bad info given, need text")
        return
    }
    const access_token = req.headers.authorization;
    const toEmail = req.body.toEmail;
    const text = req.body.text;
    var email = '';
    axios({
        method: 'get',
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(async function (response) {
        email = response.data.email;
        try {
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: email,
                    clientId: GOOGLE_ID,
                    clientSecret: GOOGLE_SECRET,
                    accessToken: access_token,
                }
            });

            const mailOption = {
                from: `STAIV <${email}>`,
                to: `${toEmail}`,
                subject: 'STAIV Send Mail',
                text: `${text}`,
                html: `<h1>${text}</h1>`,
            };

            const result = await transport.sendMail(mailOption);
            res.json(result);
        } catch (error) {
            res.json(error);
        }
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/calendar/getUserEvents', (req, res) => {
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
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://www.googleapis.com/calendar/v3/calendars/${email}/events`,
            headers: { 'Authorization': 'Bearer ' + access_token }
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'calendar': {'events': response.data.items.length}});
                status_code = 400;
            }
            else {
                if (users.get(email)['calendar']['events'] === undefined) {
                    users.get(email)['calendar']['events'] = response.data.items.length;
                }
                else if (users.get(email)['calendar']['events'] !== response.data.items.length) {
                    users.get(email)['calendar']['events'] = response.data.items.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/calendar/createEvent', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (!req.body.text) {
        res.statusCode = 400
        res.send("Bad info given, need text")
        return
    }
    const access_token = req.headers.authorization;
    const text = req.body.text;
    var email = '';
    axios({
        method: 'get',
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'post',
            url: `https://www.googleapis.com/calendar/v3/calendars/${email}/events/quickAdd`,
            headers: { 'Authorization': 'Bearer ' + access_token },
            data: { 'text': text }
        }).then(function (response) {
            res.json(response.data);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/calendar/deleteEvent', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (!req.body.eventname) {
        res.statusCode = 400
        res.send("Bad info given, need eventname")
        return
    }
    const access_token = req.headers.authorization;
    const event_name = req.body.eventname;
    var email = '';
    axios({
        method: 'get',
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://www.googleapis.com/calendar/v3/calendars/${email}/events`,
            headers: { 'Authorization': 'Bearer ' + access_token }
        }).then(function (response) {
            const events = response.data.items;
            var eventId = '';
            events.forEach(function (element) {
                if (element.summary === event_name)
                    eventId = element.id;
            });
            axios({
                method: 'delete',
                url: `https://www.googleapis.com/calendar/v3/calendars/${email}/events/${eventId}`,
                headers: { 'Authorization': 'Bearer ' + access_token }
            }).then(function (response) {
                res.json('Ok');
            }).catch((err) => res.status(500).json({err: err.message}));
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/drive/listFiles', (req, res) => {
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
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://www.googleapis.com/drive/v3/files`,
            headers: { 'Authorization': 'Bearer ' + access_token }
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'drive': {'files': response.data.files.length}});
                status_code = 400;
            }
            else {
                if (users.get(email)['drive']['files'] === undefined) {
                    users.get(email)['drive']['files'] = response.data.files.length;
                }
                else if (users.get(email)['drive']['files'] !== response.data.files.length) {
                    users.get(email)['drive']['files'] = response.data.files.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/drive/createFile', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (!req.body.fileName) {
        res.statusCode = 400
        res.send("Bad info given, need fileName")
        return
    }
    const access_token = req.headers.authorization;
    const file_name = req.body.fileName;
    axios({
        method: 'post',
        url: `https://www.googleapis.com/upload/drive/v3/files`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        params: { 'uploadType': 'multipart' },
        data: { 'name': file_name }
    }).then(function (response) {
        console.log(response.data);
        res.json(response.data);
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/drive/deleteFile', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (!req.body.fileName) {
        res.statusCode = 400
        res.send("Bad info given, need fileName")
        return
    }
    const access_token = req.headers.authorization;
    const file_name = req.body.fileName;
    axios({
        method: 'get',
        url: `https://www.googleapis.com/drive/v3/files`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        const files = response.data.files;
        var fileId = '';
        files.forEach(function (element) {
            if (element.name === file_name)
                fileId = element.id;
        });
        axios({
            method: 'delete',
            url: `https://www.googleapis.com/drive/v3/files/${fileId}`,
            headers: { 'Authorization': 'Bearer ' + access_token },
        }).then(function (response) {
            console.log(response.data);
            res.json(response.data);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/drive/listComment', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (!req.body.fileName) {
        res.statusCode = 400
        res.send("Bad info given, need fileName")
        return
    }
    const access_token = req.headers.authorization;
    const file_name = req.body.fileName;
    var email = '';
    var status_code = 400;

    axios({
        method: 'get',
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://www.googleapis.com/drive/v3/files`,
            headers: { 'Authorization': 'Bearer ' + access_token },
        }).then(function (response) {
            const files = response.data.files;
            var fileId = '';
            files.forEach(function (element) {
                if (element.name === file_name)
                    fileId = element.id;
            });
            axios({
                method: 'get',
                url: `https://www.googleapis.com/drive/v3/files/${fileId}/comments`,
                headers: { 'Authorization': 'Bearer ' + access_token },
                params: { 'fields': '*' }
            }).then(function (response) {
                if (response.status === 204) {
                    status_code = 400;
                }
                else if (users.has(email) !== true) {
                    users.set(email, {'drive': {'comments': { [fileId]: response.data.comments.length}}});
                    status_code = 400;
                }
                else {
                    if (users.get(email)['drive']['comments'][fileId] === undefined) {
                        users.get(email)['drive']['comments'][fileId] = response.data.comments.length;
                    }
                    else if (users.get(email)['drive']['comments'][fileId] !== response.data.comments.length) {
                        users.get(email)['drive']['comments'][fileId] = response.data.comments.length;
                        status_code = 200;
                    }
                }
                console.log(users);
                res.sendStatus(status_code);
            }).catch((err) => res.status(500).json({err: err.message}));
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/drive/createComment', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (!req.body.fileName) {
        res.statusCode = 400
        res.send("Bad info given, need fileName")
        return
    } else if (!req.body.content) {
        res.statusCode = 400
        res.send("Bad info given, need content")
        return
    }
    const access_token = req.headers.authorization;
    const file_name = req.body.fileName;
    const content = req.body.content;
    axios({
        method: 'get',
        url: `https://www.googleapis.com/drive/v3/files`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        const files = response.data.files;
        var fileId = '';
        files.forEach(function (element) {
            if (element.name === file_name)
                fileId = element.id;
        });
        axios({
            method: 'post',
            url: `https://www.googleapis.com/drive/v3/files/${fileId}/comments`,
            headers: { 'Authorization': 'Bearer ' + access_token },
            params: { 'fields': '*' },
            data: { 'fields': 'name', 'content': content }
        }).then(function (response) {
            console.log(response.data);
            res.json(response.data);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/drive/deleteComment', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    } else if (!req.body.fileName) {
        res.statusCode = 400
        res.send("Bad info given, need fileName")
        return
    } else if (!req.body.content) {
        res.statusCode = 400
        res.send("Bad info given, need content")
        return
    }
    const access_token = req.headers.authorization;
    const file_name = req.body.fileName;
    const content = req.body.content;
    axios({
        method: 'get',
        url: `https://www.googleapis.com/drive/v3/files`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        const files = response.data.files;
        var fileId = '';
        files.forEach(function (element) {
            if (element.name === file_name)
                fileId = element.id;
        });
        axios({
            method: 'get',
            url: `https://www.googleapis.com/drive/v3/files/${fileId}/comments`,
            headers: { 'Authorization': 'Bearer ' + access_token },
            params: { 'fields': '*' }
        }).then(function (response) {
            const comments = response.data.comments;
            var commentId = '';
            comments.forEach(function (element) {
                if (element.content === content)
                    commentId = element.id;
            });
            axios({
                method: 'delete',
                url: `https://www.googleapis.com/drive/v3/files/${fileId}/comments/${commentId}`,
                headers: { 'Authorization': 'Bearer ' + access_token },
            }).then(function (response) {
                console.log(response.data);
                res.json(response.data);
            }).catch((err) => res.status(500).json({err: err.message}));
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/youtube/listLikedVideos', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    const type = 'like';
    const params = {
        part: 'snippet',
        myRating: type,
    };
    var email = '';
    var status_code = 400;

    axios({
        method: 'get',
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://www.googleapis.com/youtube/v3/videos`,
            headers: { 'Authorization': 'Bearer ' + access_token },
            params: {
                ...params,
            },
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'youtube': {'liked': response.data.items.length}});
                status_code = 400;
            }
            else {
                if (users.get(email)['youtube']['liked'] === undefined) {
                    users.get(email)['youtube']['liked'] = response.data.items.length;
                }
                else if (users.get(email)['youtube']['liked'] !== response.data.items.length) {
                    users.get(email)['youtube']['liked'] = response.data.items.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.get('/google/youtube/listDislikedVideos', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    const type = 'dislike';
    const params = {
        part: 'snippet',
        myRating: type,
    };
    var email = '';
    var status_code = 400;

    axios({
        method: 'get',
        url: `https://openidconnect.googleapis.com/v1/userinfo`,
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        email = response.data.email;
        axios({
            method: 'get',
            url: `https://www.googleapis.com/youtube/v3/videos`,
            headers: { 'Authorization': 'Bearer ' + access_token },
            params: {
                ...params,
            },
        }).then(function (response) {
            if (response.status === 204) {
                status_code = 400;
            }
            else if (users.has(email) !== true) {
                users.set(email, {'youtube': {'disliked': response.data.items.length}});
                status_code = 400;
            }
            else {
                if (users.get(email)['youtube']['disliked'] === undefined) {
                    users.get(email)['youtube']['disliked'] = response.data.items.length;
                }
                else if (users.get(email)['youtube']['disliked'] !== response.data.items.length) {
                    users.get(email)['youtube']['disliked'] = response.data.items.length;
                    status_code = 200;
                }
            }
            console.log(users);
            res.sendStatus(status_code);
        }).catch((err) => res.status(500).json({err: err.message}));
    }).catch((err) => res.status(500).json({err: err.message}));
});

app.listen(PORT);

console.log(`App listening on port ${PORT}`);
