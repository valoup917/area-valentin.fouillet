import * as dotenv from 'dotenv'
import axios from 'axios'
import querystring from 'query-string'

dotenv.config();

const CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const REDIRECT_URI = process.env.TWITTER_CALLBACK_URL;
const ENCODE_URI = encodeURIComponent(REDIRECT_URI);

export function twitter_login(req, res) {
    console.log("try twitter login")

    const scopes = [
        'tweet.read',
        'tweet.write',
        'users.read',
        'follows.read',
        'follows.write',
        'like.read',
        'like.write',
        'bookmark.write',
        'bookmark.read',
        'dm.read',
        'offline.access'
    ];

    const scope = encodeURIComponent(scopes.join(' '));

    return(
        `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&state=state&code_challenge=challenge&code_challenge_method=plain`
    );
}

export function twitter_callback(req, res) {
    console.log("try to reach callback twitter")
    const auth_code = req.query.code;
    const buffer = new Buffer([ `${CLIENT_ID}`, `${CLIENT_SECRET}` ].join(':'));
    const basic_auth = (buffer.toString('base64'));
    var access_token = '';
    var mail = '';

    axios({
        method: 'post',
        url: `https://api.twitter.com/2/oauth2/token?grant_type=authorization_code&code=${auth_code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&code_verifier=challenge`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + basic_auth,
        },
    }).then(async function (response) {
        access_token = response.data.access_token;
        await axios.get(
            'http://storage:9145/storage/getmail'
        ).then(async function (resp) {
            mail = resp.data
            const db_res = await axios.post(
                'http://db:9020/db/ManipulateCredentials/setaccesstoken',
                {
                    mail: mail,
                    service: 'twitter',
                    access_token: access_token,
                }
            )
            console.log(db_res.status)
        })
    }).then(function () {
        res.redirect(`/auth?token=${access_token}`);
    }).catch((err) => res.status(500).json({err: err.message}));
}
