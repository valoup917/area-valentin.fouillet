import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Githubrea.css'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';

function Githubrea() {
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
        <div className="backgt">
        <button type="button" onClick={selectrea}>
            <div className="gobackgt">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="buttongit">
                        <img className="gitt" src="/images/services/git.png" alt=""/>
                        <div className="namegt">
                            <h1>Github</h1>
                        </div>
                    </button>
                    <div className="descripgt">
                        <h3>GitHub is a code hosting platform for version control and collaboration.
                            It lets you and others work together on projects from anywhere.</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Reactions</h1>
                <h5>Choose your github reaction</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="gtract1" onClick={(e) => toggleAddPopup('http://github:9065/github/updateUserName')}>
            <div className="gtraction1">
                <h2>Update user name</h2>
            </div>
        </button>
        <button type="button" className="gtract2" onClick={(e) => toggleAddPopup('http://github:9065/github/updateUserEmail')}>
            <div className="gtraction2">
                <h2>Update user email</h2>
            </div>
        </button>
        <button type="button" className="gtract3" onClick={(e) => toggleAddPopup('http://github:9065/github/updateUserDescription')}>
            <div className="gtraction3">
                <h2>Update user description</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="gtract4" onClick={(e) => toggleAddPopup('http://github:9065/github/updateEmailVisibility')}>
            <div className="gtraction4">
                <h2>Update user email visibility (private or public)</h2>
            </div>
        </button>
        <button type="button" className="gtract5" onClick={(e) => toggleAddPopup2('http://github:9065/github/createRepository')}>
            <div className="gtraction5">
                <h2>Create a new repository on current user profile</h2>
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
export default Githubrea;