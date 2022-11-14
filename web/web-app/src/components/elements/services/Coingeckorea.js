import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Coingeckorea.css'

function Coingeckorea() {
    const navigate = useNavigate();
    function services() {
        navigate("/servicesforrea");
    }

    function selectrea() {
        navigate("/servicesforrea");
    }
    return (
        <>
        <div className="backcgk">
        <button type="button" onClick={selectrea}>
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
                <h1>Reactions</h1>
                <h5>Nothing to see here for now...</h5>
                <span role="img" aria-label="sheep">😴</span>
        </div>
        </center>
        <center>
        <button type="button" className="cgkact22">
            <div className="cgkaction22">
                <h2>Secrettt</h2>
            </div>
        </button>
        </center>
        </>
    )
}
export default Coingeckorea;