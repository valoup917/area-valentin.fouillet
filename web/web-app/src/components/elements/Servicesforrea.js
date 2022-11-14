import React from 'react';
import './Servicesforrea.css'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';

function Servicesforrea() {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['email'], ['action']);

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

    function register() {
        navigate("/register");
    }
   
    return(
        <div>
            <center>
            <div className="choose-services">
                <h1> Choisis un service pour ta réaction !</h1>
                <span role="img" aria-label="sheep">😃</span>
            </div>
            </center>
            <center>
                <div className="firstrec">
                <center>
                <button type="button" className="button_serv1" onClick={(e) => checkLogForService(e, cookies.email, "discord", "/servicesforrea/discord")}>
                    <center>
                    <div className="discorddd">
                        <img src="/images/services/discord.png" alt=""/>
                        <div className="dis">
                            <h2>Discord</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="serv3" onClick={(e) => checkLogForService(e, cookies.email, "github", "/servicesforrea/github")}>
                    <center>
                    <div className="github">
                        <img src="/images/services/git.png" alt=""/>
                        <div className="gtb">
                            <h2>GitHub</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="serv6" onClick={(e) => checkLogForService(e, cookies.email, "twitter", "/servicesforrea/twitter")}>
                    <center>
                    <div className="twit">
                        <img src="/images/services/twit.png" alt=""/>
                        <div className="twitter">
                            <h2>Twitter</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="serv7" onClick={(e) => checkLogForService(e, cookies.email, "google", "/servicesforrea/gmail")}>
                    <center>
                    <div className="gmail">
                        <img src="/images/services/gmail.png" alt=""/>
                        <div className="icilemail">
                            <h2>Gmail</h2>
                        </div>
                    </div>
                    </center>
                </button>
                </center>
                <center>
                <button type="button" className="serv8" onClick={(e) => checkLogForService(e, cookies.email, "google", "/servicesforrea/calendar")}>
                    <center>
                    <div className="ohhhhhcal">
                        <img src="/images/services/cal.png" alt=""/>
                        <div className="nicecalendar">
                            <h2>Calendar</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="serv9" onClick={(e) => checkLogForService(e, cookies.email, "ipfs", "/servicesforrea/ipfs")}>
                    <center>
                    <div className="ipfs">
                        <img src="/images/services/ipfs.png" alt=""/>
                        <div className="ipfss">
                            <h2>IPFS</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="serv10" onClick={(e) => checkLogForService(e, cookies.email, "spotify", "/servicesforrea/spotify")}>
                    <center>
                    <div className="spot">
                        <img src="/images/services/spotify.png" alt=""/>
                        <div className="spotify">
                            <h2>Spotify</h2>
                        </div>
                    </div>
                    </center>
                </button>
                <button type="button" className="serv12" onClick={(e) => checkLogForService(e, cookies.email, "twitch", "/servicesforrea/twitch")}>
                    <center>
                    <div className="twitch">
                        <img src="/images/services/twitch.png" alt=""/>
                        <div className="twch">
                            <h2>Twitch</h2>
                        </div>
                    </div>
                    </center>
                </button>
                </center>
                <center>
                </center>
                <center>
                <button type="button" className="serv13" onClick={(e) => checkLogForService(e, cookies.email, "google", "/servicesforrea/drive")}>
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
                <button type="button" className="serv14">
                </button>
                </center>
            </div>
            </center>
        </div>
    )
}
export default Servicesforrea;