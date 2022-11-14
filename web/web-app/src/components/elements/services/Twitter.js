import React from 'react';
import './Twitter.css'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';

function Twitter() {
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
        <div className="backgtw">
        <button type="button" onClick={services}>
            <div className="gobacktw">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="tw" src="/images/services/twit.png" alt=""/>
                        <div className="nametw">
                            <h1>Twitter</h1>
                        </div>
                    </button>
                    <div className="descriptw">
                        <h3>Created in March 2006, Twitter allows a user to send micro-messages, called tweets,
                            but also to simply share with your community. You can also find out what is
                            happening in the world in real time. These messages are subject to a character limit.</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div classNameName="Actions">
                <h1>Actions</h1>
                <h5>Choose your twitter action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="tact1" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userName')}>
            <div className="taction1">
                <h2>New tweet on signets</h2>
            </div>
        </button>
        <button type="button" className="tact2" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userEmail')}>
            <div className="taction2">
                <h2>New tweet puplied</h2>
            </div>
        </button>
        <button type="button" className="tact3" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userFollowers')}>
            <div className="taction3">
                <h2>New message</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="tact4" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userFollowers')}>
            <div className="taction4">
                <h2>New follower</h2>
            </div>
        </button>
        <button type="button" className="tact5" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userProfileImage')}>
            <div className="taction5">
                <h2>New follow</h2>
            </div>
        </button>
        <button type="button" className="tact6" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userDescription')}>
            <div className="taction6">
                <h2>New like</h2>
            </div>
        </button>
        </center>
        <center>
        <center>
        <button type="button" className="tact7" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userFollowing')}>
            <div className="taction7">
                <h2>New retweet</h2>
            </div>
        </button>
        <button type="button" className="tact8" onClick={(e) => selectrea(e, '', 'http://twitch:9135/twitch/userBlockedUsers')}>
            <div className="taction8">
                <h2>New liked tweet</h2>
            </div>
        </button>
        </center>
        <center></center>
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

export default Twitter;