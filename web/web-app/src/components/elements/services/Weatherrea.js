import React from 'react';
import './Weatherrea.css'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';

function Weatherrea() {

    const navigate = useNavigate();
    function services() {
        navigate("/servicesforrea");
    }
    const [cookies, removeCookie] = useCookies(['email'], ['action']);

    function selectrea(e) {
        removeCookie('action');
        navigate("/services");
    }

    async function area_in_db(e, reaction, reaction_data) {
        e.preventDefault()
        const mail = cookies.email
        const action = cookies.action.route
        const action_data = cookies.action.data

        await axios.post(
            'http://localhost:8080/db/ManipulateAreas/newarea',
            {
                mail: mail,
                action: action,
                action_data: action_data,
                reaction: reaction,
                reaction_data: reaction_data,
            }
        )
        selectrea()
    }
    return (
        <>
        <div className="backwth">
        <button type="button" onClick={services}>
            <div className="gobackwth">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="buttongit">
                        <center>
                        <img className="wth" src="/images/services/weather.png" alt=""/>
                        <div className="namewth">
                            <h1>Weather</h1>
                        </div>
                        </center>
                    </button>
                    <center>
                    <div className="descriwth">
                        <h3>Users can access current weather data and forecasts
                            via their webpage and app.</h3>
                    </div>
                    </center>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Reactions</h1>
                <h5>Nothing to see here for now...</h5>
                <span role="img" aria-label="sheep">😴</span>
        </div>
        <button type="button" className="wthract1">
            <div className="wthraction1">
                <h2>Check if temperature is above 20 degrees</h2>
            </div>
        </button>
        </center>
    </>
    )
}

export default Weatherrea;