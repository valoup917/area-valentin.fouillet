import React, { useState } from 'react';
import './Drive.css'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';

function Drive() {
    const navigate = useNavigate();
    function serv() {
        navigate("/servicesforrea");
    }
    const [cookies, setCookie] = useCookies(['action']);
    function selectrea(e, actionData, actionRoute) {
        e.preventDefault()
        setCookie('action', {data: actionData, route: actionRoute});
        navigate("/servicesforrea");
    }

    const [name, setName] = React.useState('');
    const handleChangeName = (event) => {
      setName(event.target.value);
    };

    const [name2, setName2] = React.useState('');
    const handleChangeName2 = (event) => {
      setName2(event.target.value);
    };

    const [Route, setRoute] = useState(false);


    const [isAddPopup, setIsAddOpen] = useState(false);
    const toggleAddPopup = (actionRoute) => {
        setRoute(actionRoute);
        setIsAddOpen(!isAddPopup);
    }

    const handleFields = (value, route) => {
        console.log(value);
        console.log(route);
        setCookie('action', {data: value, route: route});    
    }

    return (
        <>
        <div className="backdrive">
        <button type="button" onClick={serv}>
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
                <h1>Actions</h1>
                <h5>Choose your drive action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="dract2" onClick={(e) => selectrea(e, '', 'http://google:9115/google/drive/listFiles')}>
            <div className="drreaction2">
                <h2>nouveau fichier dans ton drive</h2>
            </div>
        </button>
        <button type="button" className="dract3" onClick={(e) => toggleAddPopup('http://google:9115/google/drive/listComment')}>
            <div className="drreaction3">
                <h2>nouveau commentaire dans fichier drive</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="dract7">
            <div className="drreaction7">
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
              <Button onClick={() => {handleFields(name, Route);}} variant="outlined" color="success">Valider</Button>
            </>}
            handleClose={toggleAddPopup}
          />}
        </>
    );
}
export default Drive;