import React, { useState } from 'react';
import './Driverea.css'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';

function Driverea() {
    const navigate = useNavigate();
    function serv() {
        navigate("/services");
    }

    const [cookies, removeCookie] = useCookies(['email'], ['action']);

    function selectrea(e) {
        removeCookie('action');
        navigate("/servicesforrea");
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
        ).then((response) => {
            console.log("response")
            console.log(response)
        }).catch(error => {
            console.log("crash")
            console.log(error)
        })
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
        <div className="backdrive">
        <button type="button" onClick={(e) => selectrea(e, 'caca', 'http://google:9115/google/calendar/createEvent')}>
            <div className="gobackdri">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="driveacar" src="/images/services/drive.png" alt=""/>
                        <div className="namedri">
                            <h1>Drive</h1>
                        </div>
                    </button>
                    <div className="descripdri">
                        <h3>Google Drive is a cloud-based storage solution that allows you to
                            save files online and access them anywhere from any smartphone, tablet,
                            or computer. You can use Drive on your computer or mobile device to securely
                            upload files and edit them online. Drive also makes it easy for others to edit
                            and collaborate on files.</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Reactions</h1>
                <h5>Choose your drive reaction</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="drract1" onClick={(e) => toggleAddPopup('http://google:9115/google/drive/createFile')}>
            <div className="drrreaction1">
                <h2>Create a new file</h2>
            </div>
        </button>
        <button type="button" className="drract2" onClick={(e) => toggleAddPopup('http://google:9115/google/drive/deleteFile')}>
            <div className="drrreaction2">
                <h2>Delete a file</h2>
            </div>
        </button>
        <button type="button" className="drract3" onClick={(e) => toggleAddPopup2('http://google:9115/google/drive/createComment')}>
            <div className="drrreaction3">
                <h2>Add a new comment on a file</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="drrract4" onClick={(e) => toggleAddPopup2('http://google:9115/google/drive/deleteComment')}>
            <div className="drrreeaction4">
                <h2>Delete a comment on a file</h2>
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
    );
}
export default Driverea;