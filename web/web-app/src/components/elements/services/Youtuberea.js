import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Youtuberea.css'
import {useCookies} from 'react-cookie';

function Youtuberea() {
    const navigate = useNavigate();
    function services() {
        navigate("/services");
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
        <div className="back">
        <button type="button" onClick={selectrea}>
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
                <h1>Reactions</h1>
                <h5>Nothing to see here for now...</h5>
                <span role="img" aria-label="sheep">😴</span>
        </div>
        <button type="button" className="ytact7">
            <div className="ytaction7">
                <h2>Send a custom message</h2>
            </div>
        </button>
        </center>
        </>
    )
}
export default Youtuberea;