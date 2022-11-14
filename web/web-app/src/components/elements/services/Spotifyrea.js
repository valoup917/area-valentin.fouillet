import React, { useState } from 'react';
import './Spotifyrea.css'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';

function Spotifyrea() {

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
        <div className="backspot">
        <button type="button" onClick={serv}>
            <div className="gobackspt">
                Back
            </div>
        </button>
            <div className="disc">
                <center>
                    <button type="button" className="button">
                        <img className="spt" src="/images/services/spotify.png" alt=""/>
                        <div className="namespot">
                            <h1>Spotify</h1>
                        </div>
                    </button>
                    <div className="descripspt">
                        <h3>Spotify is a digital music, podcast, and video service that gives you access
                            to millions of songs and other content from creators all over the world.</h3>
                    </div>
                 </center>
            </div>
        </div>
        <center>
        <div className="Actions">
                <h1>Reactions</h1>
                <h5>Choose your spotify reaction</h5>
                <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="sreact1" onClick={(e) => toggleAddPopup('http://spotify:9125/spotify/followPlaylist')}>
            <div className="sreaeaction1">
                <h2>Add the current user as a follower of a playlist</h2>
            </div>
        </button>
        <button type="button" className="sact2" onClick={(e) => area_in_db(e, 'caca', 'http://spotify:9125/spotify/pausePlayback')}>
            <div className="sreaction2">
                <h2>Pause current playback on the user's device</h2>
            </div>
        </button>
        <button type="button" className="sreact3" onClick={(e) => area_in_db(e, 'caca', 'http://spotify:9125/spotify/resumePlayback')}>
            <div className="srreaeaction3">
                <h2>Resume current playback on the user's device</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="resact4" onClick={(e) => area_in_db(e, 'caca', 'http://spotify:9125/spotify/skipToNext')}>
            <div className="sreaction4">
                <h2>Skips to next track in the users queue</h2>
            </div>
        </button>
        <button type="button" className="sact5" onClick={(e) => area_in_db(e, 'caca', 'http://spotify:9125/spotify/skipToPrevious')}>
            <div className="sreaction5">
                <h2>Skips to previous track in the users queue</h2>
            </div>
        </button>
        <button type="button" className="resact6" onClick={(e) => toggleAddPopup('http://spotify:9125/spotify/setPlaybackVolume')}>
            <div className="sreaction6">
                <h2>Set the volume for the users playback device</h2>
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
    )
}
export default Spotifyrea;