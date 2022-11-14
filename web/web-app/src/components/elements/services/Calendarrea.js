import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Calendarrea.css'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';

function Calandarrea() {

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

    const [name, setName] = React.useState('');
    const handleChangeName = (event) => {
      setName(event.target.value);
    };

    const [Route, setRoute] = useState(false);

    const [isAddPopup, setIsAddOpen] = useState(false);
    const toggleAddPopup = (actionRoute) => {
        setRoute(actionRoute);
        setIsAddOpen(!isAddPopup);
    }

    function handleFields(e, value, route) {
        console.log(value);
        console.log(route);
        area_in_db(e, route, value);
    }

    return (
        <>
        <div className="backcal">
        <button type="button" onClick={selectrea}>
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
                <h1>Reactions</h1>
                <h5>Choose your calendar reaction</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="callract1" onClick={(e) => toggleAddPopup('http://google:9115/google/calendar/createEvent')}>
            <div className="callraction1">
                <h2>Create an event</h2>
            </div>
        </button>
        <button type="button" className="callract2" onClick={(e) => toggleAddPopup('http://google:9115/google/calendar/createEvent')}>
            <div className="callraction2">
                <h2>Delete an event</h2>
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
        {isAddPopup && <Popup
            content={<>
              <b className="title">Ajouter une value</b>
              <p className="position">
              </p>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                <FormControl>
                  <InputLabel htmlFor="component-outlined">Value</InputLabel>
                  <OutlinedInput
                    id="component-outlined"
                    value={name}
                    onChange={handleChangeName}
                    label="Value"
                  />
                </FormControl>
                </Box>
              <p className='position'>
              </p>
              <Button onClick={(e) => {handleFields(e, name, Route);}} variant="outlined" color="success">Valider</Button>
            </>}
            handleClose={toggleAddPopup}
          />}
        </>
    )
}

export default Calandarrea;