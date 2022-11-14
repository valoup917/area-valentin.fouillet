import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Ipfsrea.css'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popup from '../Popup';
function Ipfsrea() {
    const navigate = useNavigate();
    function services() {
        navigate("/services");
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
        ).then((response) => {
            console.log("response")
            console.log(response)
        }).catch(error => {
            console.log("crash")
            console.log(error)
        })
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
        <div className="backi">
            <div className="disc">
                <center>
                    <button type="button">
                        <img className="ipsfesse" src="/images/services/ipfs.png" alt=""/>
                        <div className="nameipfsss">

                            <h1>Ipfs</h1>
                        </div>
                    </button>
                    <div className="descrip2">
                    <h3>The Interplanetary File System, is a peer-to-peer hypermedia addressable content
                        distribution protocol, originally designed by Juan Benet. The core implementation of IPFS
                        is free software written in go.</h3>
                    </div>
                </center>
            </div>
        </div>
        <center>
        <div className="Actions">
            <h1>Reactions</h1>
            <h5>Choose your ipfs reaction</h5>
            <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="ipfsract1" onClick={(e) => toggleAddPopup('http://ipfs:9030/ipfs/pinadd')}>
            <div className="rreaction1">
                <h2>Give you the pined files</h2>
            </div>
        </button>
        <button type="button" className="ipfsract2" onClick={(e) => toggleAddPopup('http://ipfs:9030/ipfs/bootstrapadd')}>
            <div className="rreaction2">
                <h2>Pin a file in your datastore</h2>
            </div>
        </button>
        <button type="button" className="ipfsract3" onClick={(e) => area_in_db(e, 'caca', 'http://ipfs:9030/ipfs/bootstrapadddefault')}>
            <div className="rreaction3">
                <h2>Add a bootstrap node</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="ipfsract4" onClick={(e) => area_in_db(e, 'caca', 'http://ipfs:9030/ipfs/bootstraprmall')}>
            <div className="rreaction4">
                <h2>Add default bootstrap node</h2>
            </div>
        </button>
        <button type="button" className="ipfsract5" onClick={(e) => toggleAddPopup('http://ipfs:9030/ipfs/filesmkdir')}>
            <div className="rreaction5">
                <h2>Create a directory in MFS</h2>
            </div>
        </button>
        <button type="button" className="ipfsract6" onClick={(e) => toggleAddPopup('http://ipfs:9030/ipfs/pinrm')}>
            <div className="rreaction6">
                <h2>Remove a file pined</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="ipfsract7" onClick={(e) => toggleAddPopup('http://ipfs:9030/ipfs/get')}>
            <div className="rreaction7">
                <h2>Get a file from the networks</h2>
            </div>
        </button>
        <button type="button" className="ipfsract8" onClick={(e) => toggleAddPopup('http://ipfs:9030/ipfs/swarmconnect')}>
            <div className="rreaction8">
                <h2>Connect with swarm to a peer</h2>
            </div>
        </button>
        <button type="button" className="ipfsract9" onClick={(e) => toggleAddPopup('http://ipfs:9030/ipfs/swarmdisconnect')}>
            <div className="rreaction9">
                <h2>Disconnect with swarm to a peer</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="ipfsrrea10" onClick={(e) => area_in_db(e, 'caca', 'http://ipfs:9030/ipfs/shutdown')}>
            <div className="rreaction10">
                <h2>Shut down your node</h2>
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

export default Ipfsrea;