import React, { useState } from 'react'
import './Discordrea.css'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';

function Discordrea () {

    const navigate = useNavigate();

    const [cookies, removeCookie] = useCookies(['email'], ['action']);
    function serv() {
        navigate('/servicesforrea');
    }
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
        <div className="backdis">
        <button type="button" onClick={serv}>
            <div className="goback">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="discorde" src="/images/services/discord.png" alt=""/>
                        <div className="namededis">
                            <h1>Discord</h1>
                        </div>
                    </button>
                    <div className="descrip">
                        <h3>Launched in 2015, Discord is a platform for people with similar interests to share and communicate.
                        It is popular among the gaming community as it provides a way for gamers to communicate with each other and build a
                        community outside of the games themselves.</h3>
                    </div>
                 </center>

            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Reactions</h1>
                <h5>Choose your discord reaction</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="act1" onClick={(e) => area_in_db(e, 'caca', 'http://discord:9010/Discord/sendrandommeme')}>
            <div className="reaction1">
                <h2>Send a random meme on a channel</h2>
            </div>
        </button>
        <button type="button" className="act2" onClick={(e) => area_in_db(e, 'caca', 'http://discord:9010/Discord/sendrandomgif')}>
            <div className="reaction2">
                <h2>Send a random Gif on a channel</h2>
            </div>
        </button>
        <button type="button" className="act3"onClick={(e) => toggleAddPopup('http://discord:9010/Discord/message')}>
            <div className="reaction3">
                <h2>Send a custom message</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="act7">
            <div className="reaction7">
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
    );
}
export default Discordrea;