import React from 'react';
import './Spotify.css'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';

function Spotify() {

    const navigate = useNavigate();

    function serv() {
        navigate("/services");
    }
    const [cookies, setCookie] = useCookies(['action']);
    function selectrea(e, actionData, actionRoute) {
        e.preventDefault()
        setCookie('action', {data: actionData, route: actionRoute});
        navigate("/servicesforrea");
    }
    return (
        <>
        <div className="backspot">
        <button type="button" onClick={serv}>
            <div className="gobackspt">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="spt" src="/images/services/spotify.png" alt=""/>
                        <div className="namespot">
                            <h1>Spotify</h1>
                        </div>
                    </button>
                    <div className="descripspt">
                        <h3>Spotify is a digital music, podcast, and video service that gives you access
                            to millions of songs and other content from creators all over the world.</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Choose your spotify action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="sact1" onClick={(e) => selectrea(e, '', 'http://spotify:9125/spotify/userName')}>
            <div className="sreaction1">
                <h2>nom d'utilisateur changé</h2>
            </div>
        </button>
        <button type="button" className="sact2" onClick={(e) => selectrea(e, '', 'http://spotify:9125/spotify/userMail')}>
            <div className="sreaction2">
                <h2>email changé</h2>
            </div>
        </button>
        <button type="button" className="sact3" onClick={(e) => selectrea(e, '', 'http://spotify:9125/spotify/userFollowers')}>
            <div className="sreaction3">
                <h2>nouveau follower</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="sact4" onClick={(e) => selectrea(e, '', 'http://spotify:9125/spotify/userFollowers')}>
            <div className="sreaction4">
                <h2>perte d'un follower</h2>
            </div>
        </button>
        <button type="button" className="sact5" onClick={(e) => selectrea(e, '', 'http://spotify:9125/spotify/userProfileImage')}>
            <div className="sreaction5">
                <h2>photo de profil changé </h2>
            </div>
        </button>
        <button type="button" className="sact6" onClick={(e) => selectrea(e, '', 'http://spotify:9125/spotify/userProduct')}>
            <div className="sreaction6">
                <h2>forfait spotify changé</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="act7">
            <div className="reaction7">
                <h2>Send a custom message</h2>
            </div>
        </button>
        </center>
        </>
    )
}
export default Spotify;