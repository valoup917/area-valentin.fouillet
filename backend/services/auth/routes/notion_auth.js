import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config();

const CLIENT_ID = process.env.NOTION_CLIENT_ID;
const CLIENT_SECRET = process.env.NOTION_CLIENT_SECRET;
const REDIRECT_URI = process.env.NOTION_CALLBACK_URI;
const ENCODE_URI = encodeURIComponent(REDIRECT_URI);

export function notion_login(req, res) {
    console.log("try notion login");

    const scopes = [
        '',
    ];
    const scope = scopes.join(' ');

    return(
        `https://api.notion.com/v1/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&owner=user&redirect_uri=${ENCODE_URI}`
    );
}

export async function notion_callback(req, res) {
    console.log("try to reach callback notion")

    const authorization_code = req.query.code;
    const buffer = new Buffer([ `${CLIENT_ID}`, `${CLIENT_SECRET}` ].join(':'));
    const basic_auth = (buffer.toString('base64'));
    var access_token = '';
    var refresh_token = '';

    axios({
        method: 'post',
        url: `https://api.notion.com/v1/oauth/token?grant_type=authorization_code&code=${authorization_code}&redirect_uri=${REDIRECT_URI}`,
        headers: {
            "Authorization": "Basic " + basic_auth,
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "grant_type": "authorization_code",
            "code": authorization_code,
            "redirect_uri": REDIRECT_URI,
        })
    }).then(async function (response){
        access_token = response.data.access_token;
        // const db_res = await axios.post(
        //     'http://10.68.247.191:9020/db/ManipulateCredentials/setaccesstoken',
        //     {
        //         mail: 'test@gmail.com',
        //         service: 'notion',
        //         access_token: access_token,
        //     }
        // )
        // console.log(db_res.status)
        console.log(response.data);
    }).then(function () {
        res.redirect(`/auth?token=${access_token}`);
    }).catch((err) => res.status(500).json({err: err.message}));
}