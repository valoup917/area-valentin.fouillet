import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_SECRET;

export function github_login() {
    console.log("try github login")

    const scopes = [
        'user',
        'read:org',
        'user:follow',
        'repo',
    ];
    const scope = scopes.join(' ');

    return(
        `https://github.com/login/oauth/authorize?scope=${scope}&client_id=${CLIENT_ID}`
    );
}

export async function github_callback(res, code) {
    console.log("try to reach callback github")
    var access_token = ''
    var mail = ''

    const body = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
    };
    const opts = { headers: { accept: 'application/json' } };

    axios.post(
        'https://github.com/login/oauth/access_token',
        body,
        opts
    ).then(async function (response) {
        access_token = response.data.access_token;
        await axios.get(
            'http://storage:9145/storage/getmail'
        ).then(async function (response) {
            mail = response.data
            const db_res = await axios.post(
                'http://db:9020/db/ManipulateCredentials/setaccesstoken',
                {
                    mail: mail,
                    service: 'github',
                    access_token: access_token,
                }
            )
            console.log(db_res.status)
        })
    }).then(function () {
        res.redirect(`/auth?token=${access_token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
}