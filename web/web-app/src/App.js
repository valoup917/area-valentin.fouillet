import './App.css';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/elements/LoginForm.js';
import Home from './components/elements/Home.js';
import Services from './components/elements/Services.js';
import Areas from './components/elements/Areas.js';
import Register from './components/elements/Register.js';
import Start from './components/elements/Getstarted';
import Discord from './components/elements/services/Discord';
import Twitter from './components/elements/services/Twitter';
import Ipfs from './components/elements/services/Ipfs';
import History from './components/elements/History';
import YouTube from './components/elements/services/Youtube';
import Gmail from './components/elements/services/Gmail';
import Github from './components/elements/services/Github';
import Linkedin from './components/elements/services/Linkedin';
import Coingecko from './components/elements/services/Coingecko';
import Calandar from './components/elements/services/Calandar';
import Weather from './components/elements/services/Weather';
import Spotify from './components/elements/services/Spotify';
import Twitch from './components/elements/services/Twitch';
import Drive from './components/elements/services/Drive';
import Servicesforrea from './components/elements/Servicesforrea';
import Discordrea from './components/elements/services/Discordrea';
import Youtuberea from './components/elements/services/Youtuberea';
import Githubrea from './components/elements/services/Githubrea';
import Linkedinrea from './components/elements/services/Linkedinrea';
import Coingeckorea from './components/elements/services/Coingeckorea';
import Twitterrea from './components/elements/services/Twitterrea';
import Gmailrea from './components/elements/services/Gmailrea';
import Calendarrea from './components/elements/services/Calendarrea';
import Ipfsrea from './components/elements/services/Ipfsrea';
import Weatherrea from './components/elements/services/Weatherrea';
import Twitchrea from './components/elements/services/Twitchrea';
import Driverea from './components/elements/services/Driverea';
import Spotifyrea from './components/elements/services/Spotifyrea';
import Muslim from './components/elements/services/Muslim';
import DownloadApk from './components/DownloadApk';
import Riot from './components/elements/services/Riotgames';

function App() {
  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");
  const Login = details => {
    console.log(details);
  }
  const Logout = () => {
    setUser({ name: "", email: ""});
  }

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/Login' element={<LoginForm Login={Login} error={error} />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/areas' element={<Areas/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/start' element={<Start/>}/>
        <Route path='/client.apk' element={<DownloadApk/>}/>
        <Route path='/services/discord' element={<Discord/>}/>
        <Route path='/services/twitter' element={<Twitter/>}/>
        <Route path='/services/youtube' element={<YouTube/>}/>
        <Route path='/services/github' element={<Github/>}/>
        <Route path='/services/linkedin' element={<Linkedin/>}/>
        <Route path='/services/coingecko' element={<Coingecko/>}/>
        <Route path='/services/gmail' element={<Gmail/>}/>
        <Route path='/services/calendar' element={<Calandar/>}/>
        <Route path='/services/riot' element={<Riot/>}/>
        <Route path='/services/spotify' element={<Spotify/>}/>
        <Route path='/services/ipfs' element={<Ipfs/>}/>
        <Route path='/services/weather' element={<Weather/>}/>
        <Route path='/services/twitch' element={<Twitch/>}/>
        <Route path='/services/drive' element={<Drive/>}/>
        <Route path='/servicesforrea/' element={<Servicesforrea/>}/>
        <Route path='/servicesforrea/discord' element={<Discordrea/>}/>
        <Route path='/servicesforrea/youtube' element={<Youtuberea/>}/>
        <Route path='/servicesforrea/github' element={<Githubrea/>}/>
        <Route path='/servicesforrea/linkedin' element={<Linkedinrea/>}/>
        <Route path='/servicesforrea/coingecko' element={<Coingeckorea/>}/>
        <Route path='/servicesforrea/twitter' element={<Twitterrea/>}/>
        <Route path='/servicesforrea/gmail' element={<Gmailrea/>}/>
        <Route path='/servicesforrea/calendar' element={<Calendarrea/>}/>
        <Route path='/servicesforrea/ipfs' element={<Ipfsrea/>}/>
        <Route path='/servicesforrea/weather' element={<Weatherrea/>}/>
        <Route path='/servicesforrea/twitch' element={<Twitchrea/>}/>
        <Route path='/servicesforrea/Drive' element={<Driverea/>}/>
        <Route path='/servicesforrea/spotify' element={<Spotifyrea/>}/>
        <Route path='/services/Muslim' element={<Muslim/>}/>
      </Routes>
      </Router>
    </>
  );
}

export default App;