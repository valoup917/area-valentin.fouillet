import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const REDIRECT_URI = process.env.GOOGLE_CALLBACK_URL;
const ENCODE_URI = encodeURIComponent(REDIRECT_URI);

export function google_login() {
    console.log("try google login");

    const scopes = [
        'email',
        encodeURIComponent('https://www.googleapis.com/auth/drive'),
        encodeURIComponent('https://www.googleapis.com/auth/drive.metadata.readonly'),
        encodeURIComponent('https://mail.google.com/'),
        encodeURIComponent('https://www.googleapis.com/auth/youtube'),
        encodeURIComponent('https://www.googleapis.com/auth/gmail.settings.basic'),
        encodeURIComponent('https://www.googleapis.com/auth/calendar'),
    ];
    const scope = scopes.join(' ');

    return(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=online&redirect_uri=${ENCODE_URI}&response_type=code&client_id=${GOOGLE_ID}`
    );
}

export async function google_callback(req, res) {
    console.log("try to reach callback google")
    const authorization_code = req.query.code;
    var access_token = '';
    var mail = '';

    axios({
        method: 'post',
        url: `https://oauth2.googleapis.com/token?grant_type=authorization_code&code=${authorization_code}&redirect_uri=${REDIRECT_URI}&client_id=${GOOGLE_ID}&client_secret=${GOOGLE_SECRET}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(async function (response) {
        access_token = response.data.access_token;
    }).then(async function (response) {

        await axios.get(
            'http://storage:9145/storage/getmail'
        ).then(function (response) {
            mail = response.data;
            console.log(mail)
        }).catch (() => mail = "empty")

    }).then(async function (response) {
        const tmp = await axios.get(
                `http://db:9020/db/ManipulateLogin/getloginstate?mail=${mail}`
                ).then (async function (response) {

                    const db_res = await axios.post(
                        'http://db:9020/db/ManipulateCredentials/setaccesstoken',
                        {
                            mail: mail,
                            service: 'google',
                            access_token: access_token,
                        }
                    )
                    console.log(db_res.status)

            }).catch (async function (resp) {

                if (resp.response.status == 404) {

                    console.log("404")

                    const temp = await axios({

                        method: 'get',
                        url: `https://openidconnect.googleapis.com/v1/userinfo`,
                        headers: { 'Authorization': 'Bearer ' + access_token }

                    }).then(function (response) {

                        mail = response.data.email;
                        console.log(mail)

                    }).then (async function () {

                        const db_res = await axios.post(
                            'http://db:9020/db/ManipulateLogin/registerwithcredentials',
                            {
                                mail: mail,
                                service: 'google',
                                access_token: access_token,
                            }
                            ).catch (async function () {

                                const db_res = await axios.post(
                                    'http://db:9020/db/ManipulateLogin/loginwithcredentials',
                                    {
                                        mail: mail,
                                        service: 'google',
                                        access_token: access_token
                                    }
                                )

                            })

                    }).then (async function () {
                        await axios.post(
                            'http://storage:9145/storage/store',
                            {
                                "mail": mail
                            }
                        )
                    })

                } else {

                    console.log("something else")

                    const db_res = await axios.post(
                        'http://db:9020/db/ManipulateLogin/loginwithcredentials',
                        {
                            mail: mail,
                            service: 'google',
                            access_token: access_token
                        }
                    ).catch (function (err) {
                        console.log(err)
                        res.status(400).send("loginwithcredentials failed")
                    })
                    console.log(db_res.status)

                }
            })
    }).then(function () {

        res.redirect(`/auth?token=${access_token}`);
    })
    .catch((err) => res.status(500).json({err: err.message}));
}