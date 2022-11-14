import React from 'react';
import './Discord.css'
import { useNavigate } from 'react-router-dom'

function Discord() {
    const navigate = useNavigate();
    function serv() {
        navigate("/services");
    }
    return (
        <>
        <div className="backdis">
        <button type="button" onClick={serv}>
            <div className="goback">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="discord" src="/images/services/discord.png" alt=""/>
                        <div className="name">
                            <h1>Discord</h1>
                        </div>
                    </button>
                    <div className="descrip">
                        <h3>Launched in 2015, Discord is a platform for people with similar interests to share and communicate.
                        It is popular among the gaming community as it provides a way for gamers to communicate with each other and build a
                        community outside of the games themselves.</h3>
                    </div>
                 </center>

            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Nothing to see here for now ...</h5>
                <span role="img" aria-label="sheep">😴</span>
        </div>
        </center>
        <center>
        <button type="button" className="act7">
            <div className="reaction7">
                <h2>Send a custom message</h2>
            </div>
        </button>
        </center>
        </>
    );
}

export default Discord;