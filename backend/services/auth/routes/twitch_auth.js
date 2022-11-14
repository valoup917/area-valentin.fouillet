import * as dotenv from 'dotenv'
import axios from 'axios'
import querystring from 'query-string'

dotenv.config()

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const REDIRECT_URI = process.env.TWITCH_REDIRECT_URI;
const ENCODE_URI = encodeURIComponent(REDIRECT_URI);

export function twitch_login(req, res) {
    console.log("try twitch login");

    const scopes = [
        'channel:manage:raids',
        'user:edit',
        'user:read:blocked_users',
        'user:read:email',
        'user:read:follows',
    ];
    const scope = scopes.join(' ');

    return(
        'https://id.twitch.tv/oauth2/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: CLIENT_ID,
                scope: scope,
                redirect_uri: REDIRECT_URI,
            })
    );
}

export async function twitch_callback(req, res) {
    console.log("try to reach callback twitch");

    const auth_code = req.query.code;
    var access_token = '';
    var mail = '';
    axios({
        method: 'post',
        url: `https://id.twitch.tv/oauth2/token?grant_type=authorization_code&code=${auth_code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
    }).then(async function (response) {
        access_token = response.data.access_token;
        await axios.get(
            'http://storage:9145/storage/getmail'
        ).then (async function (response) {
            mail = response.data
            const db_res = await axios.post(
                'http://db:9020/db/ManipulateCredentials/setaccesstoken',
                {
                    mail: mail,
                    service: 'twitch',
                    access_token: access_token,
                }
            )
            console.log(db_res.status)
        })
    }).then(function () {
        res.redirect(`/auth?token=${access_token}`);
    }).catch((err) => res.status(500).json({err: err.message}));
}