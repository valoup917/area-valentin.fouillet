import React, { useState, useEffect, useRef } from 'react';
import './Home.css'
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
const axios = require('axios').default;


export default function Dropmenue() {
    function handleClick(e) {
        e.preventDefault();
        console.log("call")
        axios.get('http://localhost:8083/liked_tweets').then(function(response) {
        }).catch(e => {
        });
    }

  return (
    <div style={{ display: 'block',
                  width: 70000,
                  padding: 150 }}>
      <h2>Choose an Action and a Reaction!</h2>
      <Dropdown className="e2e2">
        <Dropdown.Toggle variant="success">
          Action
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
            nouveau post liké
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success">
          Reaction
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
            message du bot discord
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div classNameName="button_letsgo">
            <button onClick={handleClick}>Let's go!</button>
        </div>
    </div>
  );
}
