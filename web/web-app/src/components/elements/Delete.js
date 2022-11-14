import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


function Delete(action_url, reaction_url) {
    const [cookies, setCookie] = useCookies(['email']);
    console.log(action_url);
    console.log(reaction_url);
    console.log(cookies.email);
  var data = JSON.stringify({
    action: action_url,
    reaction: reaction_url,
    mail: cookies.email,
  });

  var config = {
    method: "delete",
    url: "http://localhost:8080/db/ManipulateAreas/deletespecificarea",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
