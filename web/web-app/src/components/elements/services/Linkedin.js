import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Linkedin.css'
import {useCookies} from 'react-cookie';

function Linkedin() {
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
        <div className="backlk">
        <button type="button" onClick={services}>
            <div className="gobacklk">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="lkd" src="/images/services/linkedin.png" alt=""/>
                        <div className="namelk">
                            <h1>Linkedin</h1>
                        </div>
                    </button>
                    <div className="descriplk">
                        <h3>LinkedIn is the world's largest professional network on the internet.
                            You can use it to find the right job or internship, connect and strengthen
                            professional relationships, and learn the skills you need to succeed in your career.</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Choose your linkedIn action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="lkact1" onClick={(e) => selectrea(e, '', 'http://linkedin:9075/linkedin/userEmail')}>
            <div className="ytaction1">
                <h2>adresse email modifié</h2>
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

export default Linkedin;
