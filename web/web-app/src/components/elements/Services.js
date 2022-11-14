import React from 'react';
import './Services.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie';

function Services() {
    const [cookies, setCookie] = useCookies(['email']);
    const navigate = useNavigate();
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    async function checkLogForService(e, email, service, redirect) {
        e.preventDefault();
        var status = 0
        await axios({
            method: "GET",
            url: "http://localhost:8080/db/ManipulateLogin/getloginstate",
            params: {
                mail: cookies.email,
            }
          }).then((response) => {
            status = response.status;
          })
          .catch(error => {
            status = error.response.status;
            if (error.response) {
              console.log(error);
            }
          });
        if (status !== 200) {
            return alert("You are not allowed to access this page, please sign in.");
        }
        var status_code = 0;
        var err_status = 0
        await axios({
            method: "GET",
            url:  'http://localhost:8080/auth/isLoggedWith',
            params: {
                email: email, //"test@gmail.com",
                service: service, //"discord"
            }
        }).then(function (response) {
            status_code = response.status
            var response_data = response.data
            console.log("status_code = " + status_code)
            console.log("response_data = " + response_data)
        }).catch(error => {
            if (error.response.status === 400) {
                err_status = error.response.status;
                window.open(error.response.data, '_blank', 'noopener,noreferrer');
            }
        })
        console.log(status);
        if (status_code === 200) {
            await timeout(500);
            navigate(redirect);
        } else {
            await timeout(12000);
            navigate(redirect);
        }
    }

    return(
        <div>
            <center>
            <div className="choose-servicesss">
                <h1> Choisis un service pour ton action !</h1>
                <span role="img" aria-label="sheep">😃</span>
            </div>
            </center>
            <center>
                <div className="firstrec">
                <center>
                <button type="button" className="serviceee2" onClick={(e) => checkLogForService(e, cookies.email, 'google', '/services/youtube')}>
                    <center>
                    <div className="yt">
                        <img src="/images/services/yt.png" alt=""/>
                        <div className="youtube">
                            <h2>Youtube</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="serviceee3" onClick={(e) => checkLogForService(e, cookies.email, 'github', '/services/github')}>
                    <center>
                    <div className="github">
                        <img src="/images/services/git.png" alt=""/>
                        <div className="gtb">
                            <h2>GitHub</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="serviceee4" onClick={(e) => checkLogForService(e, cookies.email, 'linkedin', '/services/linkedin')}>
                    <center>
                    <div className="lk">
                        <img src="/images/services/lk.png" alt=""/>
                        <div className="linked">
                            <h2>Linkedin</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="serviceee5" onClick={(e) => checkLogForService(e, cookies.email, 'coingecko', '/services/coingecko')}>
                    <div className="coin">
                        <img src="/images/services/coingecko.png" alt=""/>
                        <div className="coinnnegeckok">
                            <h2>Coingecko</h2>
                        </div>
                    </div>
                </button>
                </center>
                <center>
                <button type="button" className="servii6" onClick={(e) => checkLogForService(e, cookies.email, 'twitter', '/services/twitter')}>
                    <center>
                    <div className="twit">
                        <img src="/images/services/twit.png" alt=""/>
                        <div className="twitter">
                            <h2>Twitter</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="servii7" onClick={(e) => checkLogForService(e, cookies.email, 'google', '/services/gmail')}>
                    <center>
                    <div className="gmail">
                        <img src="/images/services/gmail.png" alt=""/>
                        <div className="icilemail">
                            <h2>Gmail</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="serviii8" onClick={(e) => checkLogForService(e, cookies.email, 'google', '/services/calendar')}>
                    <center>
                    <div className="ohhhhhcal">
                        <img src="/images/services/cal.png" alt=""/>
                        <div className="nicecalendar">
                            <h2>Calendar</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="serviii9" onClick={(e) => checkLogForService(e, cookies.email, 'ipfs', '/services/ipfs')}>
                    <center>
                    <div className="ipfs">
                        <img src="/images/services/ipfs.png" alt=""/>
                        <div className="ipfss">
                            <h2>IPFS</h2>
                        </div>
                    </div>
                    </center>
                </button>
                </center>
                <center>
                <button type="button" className="servii10" onClick={(e) => checkLogForService(e, cookies.email, 'weather', '/services/spotify')}>
                    <center>
                    <div className="spot">
                        <img src="/images/services/spotify.png" alt=""/>
                        <div className="spotify">
                            <h2>Spotify</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="servii11" onClick={(e) => checkLogForService(e, cookies.email, 'weather', '/services/weather')}>
                    <center>
                    <div className="weath">
                        <img src="/images/services/weather.png" alt=""/>
                        <div className="weather">
                            <h2>Weather</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="servii12" onClick={(e) => checkLogForService(e, cookies.email, 'twitch', '/services/twitch')}>
                    <center>
                    <div className="twitch">
                        <img src="/images/services/twitch.png" alt=""/>
                        <div className="twch">
                            <h2>Twitch</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="serviii13" onClick={(e) => checkLogForService(e, cookies.email, 'google', '/services/drive')}>
                    <center>
                    <div className="drive">
                        <img src="/images/services/drive.png" alt=""/>
                        <div className="drv">
                            <h2>Drive</h2>
                        </div>
                    </div>
                    </center>
                </button>
                </center>
                <center>
                <button type="button" className="servii15" onClick={(e) => checkLogForService(e, cookies.email, 'muslim', '/services/muslim')}>
                    <center>
                    <div className="muslim">
                        <img src="/images/services/muslim.png" alt=""/>
                        <div className="muss">
                            <h2>Muslim</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="servii16" onClick={(e) => checkLogForService(e, cookies.email, 'muslim', '/services/muslim')}>
                    <center>
                    <div className="riot">
                        <img src="/images/services/riotgame.png" alt=""/>
                        <div className="rioo">
                            <h2>Riot Games</h2>
                        </div>
                    </div>
                    </center>
                </button>
                </center>
                <center>
                <button type="button" className="serv14">
                </button>
                </center>
            </div>
            </center>
        </div>
    )
}
export default Services;