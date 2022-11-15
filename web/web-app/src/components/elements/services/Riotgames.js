import React, { useState } from 'react';
import './Riotgames.css'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';

function Riot() {

    const navigate = useNavigate();

    function serv() {
        navigate("/services");
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
        <div className="backspot">
        <button type="button" onClick={serv}>
            <div className="gobackspt">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="riooo" src="/images/services/riotgame.png" alt=""/>
                        <div className="nameriot">
                            <h1>Riot game</h1>
                        </div>
                    </button>
                    <div className="descripriot">
                        <h3>You know LOL ??</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Choisissez une action riot</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="riotact1" onClick={(e) => selectrea(e, '', 'http://riotgame:9140/riotgame/maintenance')}>
            <div className="rioteaction1">
                <h2>Maintenance en cours</h2>
            </div>
        </button>
        <button type="button" className="riotact2" onClick={(e) => toggleAddPopup('http://riotgame:9140/riotgame/ischampioninrotation')}>
            <div className="rioteaction2">
                <h2>Champion donnée en rotation</h2>
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
              <Button onClick={() => {handleFields(name, Route);}} variant="outlined" color="success">Valider</Button>
            </>}
            handleClose={toggleAddPopup}
          />}
        </>
    )
}
export default Riot;