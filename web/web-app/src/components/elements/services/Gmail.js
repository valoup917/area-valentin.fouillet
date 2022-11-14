import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Gmail.css';
import {useCookies} from 'react-cookie';


function Gmail() {
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
        <div className="backgm">
        <button type="button" onClick={services}>
            <div className="gobackgml">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="buttongit">
                        <img className="gml" src="/images/services/gmail.png" alt=""/>
                        <div className="namegml">
                            <h1>Gmail</h1>
                        </div>
                    </button>
                    <div className="descripgml">
                        <h3>Gmail is a free email service for individuals provided by Google.
                            Messages received on a Gmail account can be read via an email client,
                            a mobile application or with a web browser.</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Choose your gmail action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="gact1" onClick={(e) => selectrea(e, '', 'http://google:9115/google/gmail/getUserMessages')}>
            <div className="gaction1">
                <h2>nouveau mail</h2>
            </div>
        </button>
        <button type="button" className="gact2" onClick={(e) => selectrea(e, '', 'http://google:9115/google/gmail/getUserDrafts')}>
            <div className="gaction2">
                <h2>nouveau draft</h2>
            </div>
        </button>
        <button type="button" className="gact3" onClick={(e) => selectrea(e, '', 'http://google:9115/google/gmail/getUserFilters')}>
            <div className="gaction3">
                <h2>nouveau filtre</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="gact4" onClick={(e) => selectrea(e, '', 'http://google:9115/google/gmail/getUserSendAs')}>
            <div className="gaction4">
                <h2>nouveau send as</h2>
            </div>
        </button>
        </center>
        </>
    )
}
export default Gmail;