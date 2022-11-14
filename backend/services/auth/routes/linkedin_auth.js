import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI;
const ENCODE_URI = encodeURIComponent(REDIRECT_URI);

export function linkedin_login() {
    console.log("try linkedin login")

    return(
        `https://linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${ENCODE_URI}&scope=r_liteprofile%20r_emailaddress%20w_member_social`
    );
}

export async function linkedin_callback(req, res) {
    console.log("try to reach callback linkedin")

    const auth_code = req.query.code;
    var access_token = '';
    var mail = '';
    axios({
        method: 'post',
        url: `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${auth_code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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
                    service: 'linkedin',
                    access_token: access_token,
                }
            )
            console.log(db_res.status)
        })
    }).then(function () {
        res.redirect(`/auth?token=${access_token}`);
    }).catch((err) => res.status(500).json({err: err.message}));
}