// import {useState} from 'react';

// export default function Start() {
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(null);

//   function isValidEmail(email) {
//     return /\S+@\S+\.\S+/.test(email);
//   }

//   const handleChange = event => {
//     if (!isValidEmail(event.target.value)) {
//       setError('Email is invalid');
//     } else {
//       setError(null);
//     }

//     setMessage(event.target.value);
//   };

//   return (
//     <div>
//       <input
//         id="message"
//         name="message"
//         value={message}
//         onChange={handleChange}
//       />

//       {error && <h2 style={{color: 'red'}}>{error}</h2>}
//     </div>
//   );
// }




import React, { useState } from 'react';
import '../../index.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Start({Login, error, props}) {
    const navigate = useNavigate();

    function login_send(e) {
        e.preventDefault();
        console.log("call")
        axios.get('http://localhost:8090/twitter/login').then(function(response) {
            console.log("respose: ")
            console.log(response.data);
            window.open(response.data);
            window.open(response.data);
        }).catch(e => {
            console.log("error: ")
            console.log(e);
        });
    }

    function gohome() {
        navigate("/home");
    }

    function goregister() {
        navigate("/register");
    }

    function login() {
        navigate("/Login");
    }

    return (
    <form>
        <div classNameName="form-inner">
            <h1>Get started</h1>
            {(error != "") ? ( <div classNameName="error">{error}</div>) : ""}
            <div classNameName="button_twitter">
                <button onClick={login_send}>Continue with Twitter</button>
            </div>
            <div classNameName="register">
                <button onClick={goregister}>Sign up</button>
            </div>
            <div classNameName="login">
                <button onClick={login}>I have an account</button>
            </div>
        </div>
    </form>

  );
}