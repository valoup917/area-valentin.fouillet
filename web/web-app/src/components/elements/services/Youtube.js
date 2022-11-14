import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Youtube.css'
import {useCookies} from 'react-cookie';

function Youtube() {
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
        <div className="back">
        <button type="button" onClick={services}>
            <div className="gobackyt">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="ytbbb" src="/images/services/yt.png" alt=""/>
                        <div className="nameyt">
                            <h1>Youtube</h1>
                        </div>
                    </button>
                    <div className="descripyt">
                        <h3>YouTube is a video hosting and social media website
                            where users can upload, watch, comment, rate and share streaming videos.</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Choose your youtube action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="ytact1" onClick={(e) => selectrea(e, '', 'http://google:9115/google/youtube/listLikedVideos')}>
            <div className="ytaction1">
                <h2>nouvelle vidéo liké</h2>
            </div>
        </button>
        <button type="button" className="ytact2" onClick={(e) => selectrea(e, '', 'http://google:9115/google/youtube/listDislikedVideos')}>
            <div className="ytaction2">
                <h2>nouvelle vidéo disliké</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="ytact7">
            <div className="ytaction7">
                <h2>Send a custom message</h2>
            </div>
        </button>
        </center>
        </>
    )
}
export default Youtube;