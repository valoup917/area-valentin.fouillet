import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Coingecko.css'
import {useCookies} from 'react-cookie';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';

function Coingecko() {
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

    const handleFields = (value, route) => {
        console.log(value);
        console.log(route);
        setCookie('action', {data: value, route: route});    
    }

    const [isAddPopup2, setIsAddOpen2] = useState(false);
    const toggleAddPopup2 = (actionRoute) => {
        setRoute(actionRoute);
        setIsAddOpen2(!isAddPopup2);
    }

    return (
        <>
        <div className="backcgk">
        <button type="button" onClick={services}>
            <div className="gobackcgk">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="buttongit">
                        <img className="cgk" src="/images/services/coingecko.png" alt=""/>
                        <div className="namegt">
                            <h1>Coingecko</h1>
                        </div>
                    </button>
                    <div className="descripgt">
                        <h3>CoinGecko provides a fundamental analysis of the digital currency market.
                            In addition to tracking price, volume, and market capitalization,
                            CoinGecko tracks community growth, open source code development, major events, and on-chain metrics.</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Actions</h1>
                <h5>Choose your coingecko action</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="cgkact1" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/existingcoin')}>
            <div className="cgkaction1">
                <h2>verifie si le coin donnée existe</h2>
            </div>
        </button>
        <button type="button" className="cgkact2" onClick={(e) => toggleAddPopup2('http://coingecko:9040/coingecko/checkcoinprice')}>
            <div className="cgkaction2">
                <h2>Check if the price of the coin given is correct</h2>
            </div>
        </button>
        <button type="button" className="cgkact3" onClick={(e) => toggleAddPopup2(e, '', 'http://coingecko:9040/coingecko/checkchangeonehourpercentage')}>
            <div className="cgkaction3">
                <h2>Check change in one hour percentage</h2>
            </div>
        </button>
        <button type="button" className="cgkact4" onClick={(e) => toggleAddPopup2(e, '', 'http://coingecko:9040/coingecko/checkchangeonedaypercentage')}>
            <div className="cgkaction4">
                <h2>Check change in one day percentage</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="cgkact5" onClick={(e) => toggleAddPopup2(e, '', 'http://coingecko:9040/coingecko/checkchangeweekpercentage')}>
            <div className="cgkaction5">
                <h2>Check change in one week percentage</h2>
            </div>
        </button>
        <button type="button" className="cgkact6" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/btccheckcoinprice')}>
            <div className="cgkaction1">
                <h2>Check the price given and the actual price of bitcoin</h2>
            </div>
        </button>
        <button type="button" className="cgkact7" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/btccheckonehour')}>
            <div className="cgkaction7">
                <h2>Check the percentage given in one hour of bitcoin</h2>
            </div>
        </button>
        <button type="button" className="cgkact8" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/btccheckoneday')}>
            <div className="cgkaction8">
                <h2>Check the percentage given in one day of bitcoin</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="cgkact9" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/btccheckoneweek')}>
            <div className="cgkaction9">
                <h2>Check the percentage given in one week of bitcoin</h2>
            </div>
        </button>
        <button type="button" className="cgkact10" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/ethcheckcoinprice')}>
            <div className="cgkaction10">
                <h2>Check the price given and the actual price of ethereum</h2>
            </div>
        </button>
        <button type="button" className="cgkact11" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/ethcheckonehour')}>
            <div className="cgkaction11">
                <h2>Check the percentage given in one hour of ethereum</h2>
            </div>
        </button>
        <button type="button" className="cgkact12" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/ethcheckoneday')}>
            <div className="cgkaction12">
                <h2>Check the percentage given in one day of ethereum</h2>
            </div>
        </button>
        </center>
        <center>
        </center>
        <center>
        <button type="button" className="cgkact13" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/ethcheckoneweek')}>
            <div className="cgkaction13">
                <h2>Check the percentage given in one week of ethereum</h2>
            </div>
        </button>
        <button type="button" className="cgkact14" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/binanceusdcheckcoinprice')}>
            <div className="cgkaction14">
                <h2>Check the price given and the price of binance usd</h2>
            </div>
        </button>
        <button type="button" className="cgkact15" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/binanceusdcheckonehour')}>
            <div className="cgkaction15">
                <h2>Check the percentage given in one hour of binance usd</h2>
            </div>
        </button>
        <button type="button" className="cgkact16" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/binanceusdcheckoneday')}>
            <div className="cgkaction7">
                <h2>Check the percentage given in one day of binance usd</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="cgkact17" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/binanceusdcheckoneweek')}>
            <div className="cgkaction18">
                <h2>Check the percentage given in one week of binance usd</h2>
            </div>
        </button>
        <button type="button" className="cgkact18" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/solanacheckcoinprice')}>
            <div className="cgkaction9">
                <h2>Check the price given and the actual price of solana</h2>
            </div>
        </button>
        <button type="button" className="cgkact19" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/solanacheckonehour')}>
            <div className="cgkaction7">
                <h2>Est ce que le prix donnée est égale a celui du solana (~200)</h2>
            </div>
        </button>
        <button type="button" className="cgkact20" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/solanacheckoneday')}>
            <div className="cgkaction8">
                <h2>Est ce que le % donnée est égale a celui de l'évolution en 1 jour du solana</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="cgkact21" onClick={(e) => toggleAddPopup('http://coingecko:9040/coingecko/solanacheckoneweek')}>
            <div className="cgkaction9">
                <h2>Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour du solana</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="cgkact22">
            <div className="cgkaction22">
                <h2>Secrettt</h2>
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
              <Button onClick={() => {handleFields(name + ',' + name2, Route);}} variant="outlined" color="success">Valider</Button>
            </>}
            handleClose={toggleAddPopup2}
          />}
        </>
    )
}
export default Coingecko;