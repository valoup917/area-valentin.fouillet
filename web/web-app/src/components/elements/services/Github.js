import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Github.css'
import {useCookies} from 'react-cookie';

function Github() {
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
        <div className="backgt">
        <button type="button" onClick={services}>
            <div className="gobackgt">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="buttongit">
                        <img className="gitt" src="/images/services/git.png" alt=""/>
                        <div className="namegt">
                            <h1>Github</h1>
                        </div>
                    </button>
                    <div className="descripgt">
                        <h3>GitHub is a code hosting platform for version control and collaboration.
                            It lets you and others work together on projects from anywhere.</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Choose your github action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="gtact1" onClick={(e) => selectrea(e, '', 'http://github:9065/github/userName')}>
            <div className="gtaction1">
                <h2>user name modifié</h2>
            </div>
        </button>
        <button type="button" className="gtact2" onClick={(e) => selectrea(e, '', 'http://github:9065/github/userDescription')}>
            <div className="gtaction2">
                <h2>la déscription a été modifiée</h2>
            </div>
        </button>
        <button type="button" className="gtact3" onClick={(e) => selectrea(e, '', 'http://github:9065/github/userFollowers')}>
            <div className="gtaction3">
                <h2>nouveau follower</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="gtact4" onClick={(e) => selectrea(e, '', 'hhttp://github:9065/github/userFollowers')}>
            <div className="gtaction4">
                <h2>follower perdu</h2>
            </div>
        </button>
        <button type="button" className="gtact5" onClick={(e) => selectrea(e, '', 'http://github:9065/github/userFollowing')}>
            <div className="gtaction5">
                <h2>nouvel utilisateur suivi</h2>
            </div>
        </button>
        <button type="button" className="gtact6" onClick={(e) => selectrea(e, '', 'http://github:9065/github/userFollowing')}>
            <div className="gtaction6">
                <h2>unfollow d'un compte</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="gtact7" onClick={(e) => selectrea(e, '', 'http://github:9065/github/userRepository')}>
            <div className="gtaction7">
                <h2>nouveau repo</h2>
            </div>
        </button>
        </center>
        </>
    )
}
export default Github;