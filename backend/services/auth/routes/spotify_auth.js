import axios from 'axios'
import querystring from 'query-string'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

export function spotify_login(req, res) {
    console.log("try spotify login");

    const scopes = [
        'user-read-private',
        'user-read-email',
        'playlist-modify-public',
        'playlist-modify-private',
        'playlist-read-private',
        'playlist-read-collaborative',
        'ugc-image-upload',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'app-remote-control',
        'streaming',
        'user-follow-modify',
        'user-follow-read',
        'user-read-playback-position',
        'user-top-read',
        'user-read-recently-played',
        'user-library-modify',
        'user-library-read',
    ];

    const scope = scopes.join(' ');

    return('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            show_dialog: true
        })
    );
};

export async function spotify_callback(req, res) {
    console.log("try to reach callback spotify")

    const authorization_code = req.query.code;
    var access_token = '';
    var mail = '';
    axios({
        method: 'post',
        url: `https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${authorization_code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
    }).then(async function (response) {
        access_token = response.data.access_token;
        await axios.get(
            'http://storage:9145/storage/getmail'
        ).then(async function (response) {
            mail = response.data
            const db_res = await axios.post(
                'http://db:9020/db/ManipulateCredentials/setaccesstoken',
                {
                    mail: mail,
                    service: 'spotify',
                    access_token: access_token,
                }
            )
            console.log(db_res.status)
        })
    }).then(function () {
        res.redirect(`/auth?token=${access_token}`);
    })
    .catch((err) => res.status(500).json({err: err.message}));
};