import * as dotenv from 'dotenv';
import axios from 'axios';
import url from 'url';

dotenv.config();

let openedWindow;

export function discord_login() {
    console.log("try log discord")

    return(
        `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A8090%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify%20email%20guilds`
    )
}

async function get_user_info(access_token) {
    const resp = await axios.get("https://discord.com/api/v8/users/@me", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
    return resp;
}

export async function discord_callback(req, res) {
    const { code } = req.query
    var access_token = ''
    var mail = ''
    if (code) {
    try {
        const formData = new url.URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code.toString(),
            redirect_uri: process.env.DISCORD_REDIRECT_URI,
        })
        axios.post(
            'https://discord.com/api/v8/oauth2/token',
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        ).then(async function (response) {
            console.log(response.data)
            access_token = response.data.access_token

            await axios.get(
                'http://storage:9145/storage/getmail'
            ).then (async function (response) {
                mail = response.data
                const db_res = await axios.post(
                    'http://db:9020/db/ManipulateCredentials/setaccesstoken',
                    {
                        mail: mail,
                        service: 'discord',
                        access_token: access_token,
                    }
                )
                console.log(db_res.status)
            })
        }).then (function () {
            console.log("acces_token = " + access_token)
            res.redirect(`/auth?token=${access_token}`);
        })
    } catch (err) {
        res.status(500).json({err: err.message})
    }
    }
}