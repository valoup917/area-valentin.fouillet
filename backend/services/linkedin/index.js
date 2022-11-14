const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config()
app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/linkedin/ping', (req, res) => {
    res.status(200).json("Ok");
});

app.get('/linkedin/userEmail', (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400
        res.send("Bad info given, need authorization")
        return
    }
    const access_token = req.headers.authorization;
    axios({
        method: 'get',
        url: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
        headers: { 'Authorization': 'Bearer ' + access_token }
    }).then(function (response) {
        res.send(response.data.elements[0]['handle~'].emailAddress);
    }).catch((err) => res.status(500).json({err: err.message}));
})

app.post('/linkedin/createpost', async (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 400;
        res.send("Bad info given, need authorization");
        return;
    } else if (!req.body.content) {
        res.statusCode = 400;
        res.send("Bad info given, need content");
        return;
    }
    const access_token = req.headers.authorization;
    const content = req.body.content

    axios.get(
        'https://api.linkedin.com/v2/me?projection',
        {
            headers: {
                'Authorization' : `Bearer ${access_token}`
            }
        }
    ).then(async function (result) {
        const user_urn = `urn:li:person:${result.data.id}`

        axios({
            method : 'post',
            url : 'https://api.linkedin.com/v2/ugcPosts',
            headers: {
                "Authorization" : `Bearer ${access_token}`
            },
            data : {
                "author" : user_urn,
                "lifecycleState" : "PUBLISHED",
                "specificContent" : {
                    "com.linkedin.ugc.ShareContent": {
                        "shareCommentary" : {
                            "text" : content
                        },
                        "shareMediaCategory" : "NONE"
                    }
                },
                "visibility" : {
                    "com.linkedin.ugc.MemberNetworkVisibility" : "CONNECTIONS"
                }
            }
        }).then(function (result) {
            res.statusCode = 200
            res.send("Post created")
        }).catch((err) => {
            res.statusCode = 503
            res.send("Service unavailable")
        });
    }).catch(function (err) {
        console.log(err)
        res.statusCode = 404
        res.send("User not found")
    })
})

app.listen(process.env['PORT']);

console.log(`App listening on port ${process.env['PORT']}`);