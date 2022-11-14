import React, { useState } from 'react';
import './Twitterrea.css'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';
function Twitterrea() {
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
        <div className="backgtw">
        <button type="button" onClick={services}>
            <div className="gobacktw">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="tw" src="/images/services/twit.png" alt=""/>
                        <div className="nametw">
                            <h1>Twitter</h1>
                        </div>
                    </button>
                    <div className="descriptw">
                        <h3>Created in March 2006, Twitter allows a user to send micro-messages, called tweets,
                            but also to simply share with your community. You can also find out what is
                            happening in the world in real time. These messages are subject to a character limit.</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Choose your twitter action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="tract1"  onClick={(e) => toggleAddPopup(e, 'caca', 'http://github:9065/github/updateUserName')}>
            <div className="traction1">
                <h2>Create and Tweets on behalf of a user</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="tact9">
            <div className="ytaction7">
                <h2></h2>
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

export default Twitterrea;