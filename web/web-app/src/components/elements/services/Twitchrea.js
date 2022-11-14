import React, { useState } from 'react';
import './Twitchrea.css'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';
function Twitchrea() {
    const navigate = useNavigate();
    function services() {
        navigate("/services");
    }
    const [cookies, removeCookie] = useCookies(['email'], ['action']);

    function selectrea(e) {
        removeCookie('action');
        navigate("/services");
    }
    function serv() {
        navigate('/servicesforrea');
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
        <div className="backg">
        <button type="button" onClick={selectrea}>
            <div className="gobacktwitch">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="twitwiiitch" src="/images/services/twitch.png" alt=""/>
                        <div className="nametw">
                            <h1>Twitch</h1>
                        </div>
                    </button>
                    <div className="descriptw">
                        <h3>Twitch is an interactive livestreaming service for content
                            spanning gaming, entertainment, sports,
                            music, and more. There's something for everyone on Twitch !</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Reaction</h1>
                <h5>Choose your twitch reaction</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="twrract1" onClick={(e) => toggleAddPopup('http://twitch:9135/twitch/changeDescription')}>
            <div className="twaction1">
                <h2>Update current user description</h2>
            </div>
        </button>
        <button type="button" className="twrract2" onClick={(e) => area_in_db(e, 'caca', 'http://twitch:9135/twitch/raidUser')}>
            <div className="twrraction2">
                <h2>Create a random raid on users that follows current user</h2>
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
export default Twitchrea;