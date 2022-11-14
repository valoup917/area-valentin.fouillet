import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Calandar.css'
import {useCookies} from 'react-cookie';

function Calandar() {

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
        <div className="backcal">
        <button type="button" onClick={services}>
            <div className="gobackcal">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="cal" src="/images/services/cal.png" alt=""/>
                        <div className="namecal">
                            <h1>Calendar</h1>
                        </div>
                    </button>
                    <div className="descripcal">
                        <h3>First and foremost, a calendar app is a scheduling tool. It allows you to plan
                            out your day by creating blocks in a calendar. Business meetings, appointments,
                            events, daily reminders, work blocks, and more can be scheduled and organized
                            through a calendar app.</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Choose your calendar action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="callact1" onClick={(e) => selectrea(e, '', 'http://google:9115/google/calendar/getUserEvents')}>
            <div className="callaction1">
                <h2>nouvelle événement dans ton calendrier</h2>
            </div>
        </button>
        </center>
        </>
    )
}

export default Calandar;