import React from 'react';
import './Ipfs.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useCookies} from 'react-cookie';
function Ipfs() {
    const navigate = useNavigate();
    function connect() {
        navigate("/Start");
    }
    function services() {
        navigate("/services");
    }
    const [cookies, setCookie] = useCookies(['action']);
    function selectrea(e, actionData, actionRoute) {
        e.preventDefault()
        setCookie('action', {data: actionData, route: actionRoute});
        navigate("/servicesforrea");
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
                    <h3>The Interplanetary File System, is a peer-to-peer hypermedia addressable content distribution protocol, originally designed by Juan Benet. The core implementation of IPFS is free software written in go.</h3>
                    </div>
                </center>
            </div>
        </div>
        <center>
        <div className="Actions">
            <h1>Actions</h1>
            <h5>Choose your ipfs action</h5>
            <span role="img" aria-label="sheep">😃</span>
        </div>
        <button type="button" className="ipfsact1" onClick={(e) => selectrea(e, '', 'http://ipfs:9030/ipfs/bootstraplist')}>
            <div className="reaction1">
                <h2>Send a 200 if your bootstrap list is greater than 6</h2>
            </div>
        </button>
        </center>
        <center>
        <button type="button" className="ipfsrea3">
            <div className="reaction1">
                <h2>Give you the version of your current IPFS node</h2>
            </div>
        </button>
        </center>
        </>
    )
}
export default Ipfs;