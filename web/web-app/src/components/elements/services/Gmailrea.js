import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Gmailrea.css'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';

function Gmailrea() {
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

    const [name2, setName2] = React.useState('');
    const handleChangeName2 = (event) => {
      setName2(event.target.value);
    };
    

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

    const [isAddPopup2, setIsAddOpen2] = useState(false);
    const toggleAddPopup2 = (actionRoute) => {
        setRoute(actionRoute);
        setIsAddOpen2(!isAddPopup2);
    }

    return (
        <>
        <div className="backgm">
        <button type="button" onClick={selectrea}>
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
                <h1>Reactions</h1>
                <h5>Choose your gmail reaction</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="gract1" onClick={(e) => toggleAddPopup('http://google:9115/google/gmail/updateUserLanguage')}>
            <div className="graction1">
                <h2>Updates language settings</h2>
            </div>
        </button>
        <button type="button" className="gract2" onClick={(e) => toggleAddPopup('http://google:9115/google/gmail/trashMessage')}>
            <div className="graction2">
                <h2>Moves the specified message to the trash</h2>
            </div>
        </button>
        <button type="button" className="gract3" onClick={(e) => toggleAddPopup2('http://google:9115/google/gmail/sendMail')}>
            <div className="graction3">
                <h2>Sends the specified message to the recipients</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="gact6">
            <div className="gaction6">
                <h2>New follower</h2>
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
          {isAddPopup2 && <Popup
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
                <FormControl>
                  <InputLabel htmlFor="component-outlined">Value</InputLabel>
                  <OutlinedInput
                    id="component-outlined"
                    value={name2}
                    onChange={handleChangeName2}
                    label="Value"
                  />
                </FormControl>
                </Box>
              <p className='position'>
              </p>
              <Button onClick={(e) => {handleFields(e, name + ',' + name2, Route);}} variant="outlined" color="success">Valider</Button>
            </>}
            handleClose={toggleAddPopup2}
          />}
        </>
    )
}
export default Gmailrea;