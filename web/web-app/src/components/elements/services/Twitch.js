import React from 'react';
import './Twitch.css'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';

function Twitch() {
    const navigate = useNavigate();
    function services() {
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
        <div className="backg">
        <button type="button" onClick={services}>
            <div className="gobacktwitch">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="twitwiiitch" src="/images/services/twitch.png" alt=""/>
                        <div className="nametw">
                            <h1>Twitch</h1>
                        </div>
                    </button>
                    <div className="descriptw">
                        <h3>Twitch is an interactive livestreaming service for content
                            spanning gaming, entertainment, sports,
                            music, and more. There's something for everyone on Twitch !</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Choose your twitch action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="twact1" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userName')}>
            <div className="twaction1">
                <h2>user name modifié</h2>
            </div>
        </button>
        <button type="button" className="twact2" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userEmail')}>
            <div className="twaction2">
                <h2>adresse email modifiée</h2>
            </div>
        </button>
        <button type="button" className="twact3" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userFollowers')}>
            <div className="twaction3">
                <h2>nouveau follower</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="twact4" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userFollowers')}>
            <div className="twaction4">
                <h2>Follower perdu</h2>
            </div>
        </button>
        <button type="button" className="twact5" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userProfileImage')}>
            <div className="twaction5">
                <h2>image profile changé</h2>
            </div>
        </button>
        <button type="button" className="twact6" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userDescription')}>
            <div className="twaction6">
                <h2>la déscription a été modifiée</h2>
            </div>
        </button>
        </center>
        <center>
        <center>
        <button type="button" className="twact7" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userFollowing"')}>
            <div className="twaction7">
                <h2>nouveau follower</h2>
            </div>
        </button>
        <button type="button" className="twact8" onClick={(e) => selectrea(e, '', 'ttp://twitch:9135/twitch/userFollowing')}>
            <div className="twaction8">
                <h2>unfollow d'un compte</h2>
            </div>
        </button>
        <button type="button" className="twact10" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userBlockedUsers')}>
            <div className="twaction10">
                <h2>user débloquer</h2>
            </div>
        </button>
        </center>
        <center></center>
        </center>
        <center>
        </center>
        <center>
        <button type="button" className="tact9">
            <div className="ytaction7">
                <h2></h2>
            </div>
        </button>
        </center>
        </>
    )
}
export default Twitch;