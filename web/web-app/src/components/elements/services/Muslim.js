import React from 'react';
import './Muslim.css'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';


function Muslim() {
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
        <div className="backmuslim">
        <button type="button" onClick={serv}>
            <div className="gobackmusl">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="coucoulesmusulmans" src="/images/services/muslim.png" alt=""/>
                        <div className="namemus">
                            <h1>Muslim</h1>
                        </div>
                    </button>
                    <div className="descripmusul">
                        <h3>You are Muslim and you want to know the prayer times? Use Muslim!</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Choose your muslim action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="musact1" onClick={(e) => selectrea(e, '', 'http://salat:9455/salat/fajr')}>
            <div className="musaction1">
                <h2>Fajr</h2>
            </div>
        </button>
        <button type="button" className="musact2" onClick={(e) => selectrea(e, '', 'http://salat:9455/salat/dhuhr')}>
            <div className="musaction2">
                <h2>Dhuhr</h2>
            </div>
        </button>
        <button type="button" className="musact3" onClick={(e) => selectrea(e, '', 'http://salat:9455/salat/asr')}>
            <div className="musaction3">
                <h2>Asr</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="musact4" onClick={(e) => selectrea(e, '', 'http://salat:9455/salat/maghrib')}>
            <div className="musaction4">
                <h2>Maghreb</h2>
            </div>
        </button>
        <button type="button" className="musact5" onClick={(e) => selectrea(e, '', 'http://salat:9455/salat/isha')}>
            <div className="musaction4">
                <h2>Isha</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="dract7">
            <div className="drreaction7">
                <h2>Send a custom message</h2>
            </div>
        </button>
        </center>
        </>
    );
}
export default Muslim;