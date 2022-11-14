import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import './Weather.css'
import {useCookies} from 'react-cookie';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';

function Weather() {

    const navigate = useNavigate();

    function services() {
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
        <div className="backwth">
        <button type="button" onClick={services}>
            <div className="gobackwth">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="buttongit">
                        <center>
                        <img className="wth" src="/images/services/weather.png" alt=""/>
                        <div className="namewth">
                            <h1>Weather</h1>
                        </div>
                        </center>
                    </button>
                    <center>
                    <div className="descriwth">
                        <h3>Users can access current weather data and forecasts
                            via their webpage and app.</h3>
                    </div>
                    </center>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Choose your weather action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="wthact1" onClick={(e) => selectrea(e, '', 'http://weather:8095/Weather/toHot')}>
            <div className="wthaction1">
                <h2>La température est une température d'été</h2>
            </div>
        </button>
        <button type="button" className="wthact2" onClick={(e) => selectrea(e, '', 'http://weather:8095/Weather/toCold')}>
            <div className="wthaction2">
                <h2>La température est une température d'hiver</h2>
            </div>
        </button>
        <button type="button" className="wthact3" onClick={(e) => selectrea(e, '', 'http://weather:8095/Weather/toWet')}>
            <div className="wthaction3">
                <h2>L'humidité est supérieur à 75%</h2>
            </div>
        </button>
        <button type="button" className="wthact4" onClick={(e) => selectrea(e, '', 'http://weather:8095/Weather/toDry')}>
            <div className="wthaction4">
                <h2>L'humidité est inférieur à 40%</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="wthact5" onClick={(e) => toggleAddPopup('http://weather:8095/Weather/tempusercheckmore')}>
            <div className="wthaction5">
                <h2>La température est supérieur à celle donnée</h2>
            </div>
        </button>
        <button type="button" className="wthact6" onClick={(e) => toggleAddPopup('http://weather:8095/Weather/tempusercheckless')}>
            <div className="wthaction1">
                <h2>La température est inférieur à celle donnée</h2>
            </div>
        </button>
        <button type="button" className="wthact7" onClick={(e) => toggleAddPopup('http://weather:8095/Weather/humusercheckmore')}>
            <div className="wthaction7">
                <h2>L'humidité est supérieur à celle donnée</h2>
            </div>
        </button>
        <button type="button" className="wthact8" onClick={(e) => toggleAddPopup('http://weather:8095/Weather/humusercheckless')}>
            <div className="wthaction8">
                <h2>L'humidité est inférieur à celle donnée</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="wthact9" onClick={(e) => selectrea(e, '', 'http://weather:8095/Weather/below10')}>
            <div className="wthaction9">
                <h2>La température est en dessous de 10 degrés</h2>
            </div>
        </button>
        <button type="button" className="wthact10" onClick={(e) => selectrea(e, '', 'http://weather:8095/Weather/below0')}>
            <div className="wthaction10">
                <h2>La température est en dessous de 0 degrés</h2>
            </div>
        </button>
        <button type="button" className="wthact11" onClick={(e) => selectrea(e, '', 'http://weather:8095/Weather/above20')}>
            <div className="wthaction11">
                <h2>La température est supérieur à 20 degrés</h2>
            </div>
        </button>
        <button type="button" className="wthact12" onClick={(e) => selectrea(e, '', 'http://weather:8095/Weather/above30')}>
            <div className="wthaction12">
                <h2>La température est supérieur à 30 degrés</h2>
            </div>
        </button>
        </center>
        <center>
        </center>
        <center>
        <button type="button" className="wthact13" onClick={(e) => selectrea(e, '', 'http://weather:8095/Weather/verycloudy')}>
            <div className="wthaction13">
                <h2>La temps est nuageux</h2>
            </div>
        </button>
        <button type="button" className="wthact14" onClick={(e) => selectrea(e, '', 'http://weather:8095/Weather/snowing')}>
            <div className="wthaction14">
                <h2>Il neige</h2>
            </div>
        </button>
        <button type="button" className="wthact15" onClick={(e) => selectrea(e, '', 'http://weather:8095/Weather/raining')}>
            <div className="wthaction15">
                <h2>Il pleut</h2>
            </div>
        </button>
        <button type="button" className="wthact16" onClick={(e) => selectrea(e, '', 'http://weather:8095/Weather/windy')}>
            <div className="wthaction7">
                <h2>Le vent est supérieur à 12km</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="wthact17">
            <div className="wthaction18">
                <h2>Check the percentage given in one week of binance usd</h2>
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
export default Weather;