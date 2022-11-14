import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/joy/Box';

import React, {useState, useEffect} from 'react';
import "../../index.css";
import './Services.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MultiActionAreaCard from './MultiCard';
import { useCookies } from 'react-cookie';

function Areas() {
  const [cookies, setCookie] = useCookies(['email']);

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/db/ManipulateAreas/getareasfrommail', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'mail': cookies.email
      }
    }).then((response) => {
      var areas = response.data;
      areas.forEach(function (element) {
        var url = element[0];
        var list = url.split('/')
        var localhost_url = '';
        for (let index = 0; index < list.length - 2; index++) {
          const element = list[index];
          localhost_url += element + '/';
        }
        var name_url = list[list.length - 2] + '/' + list[list.length - 1];
        element[0] = [localhost_url, name_url];
        url = element[2];
        list = url.split('/')
        var localhost_url = '';
        for (let index = 0; index < list.length - 2; index++) {
          const element = list[index];
          localhost_url += element + '/';
        }
        name_url = list[list.length - 2] + '/' + list[list.length - 1];
        element[2] = [localhost_url, name_url];
      });
      setPost(areas);
      return;
    })
  }, []);

  if (post === null)
    return;
  let cards = post.map(area => {
    return (
      <MultiActionAreaCard area={area} />
    )
  })

  return (
    <section>
      <footer aria-label="Site Footer" className="bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="title">My Applets</h1>
        </div>
      </footer>
      <div className='start-box'>
        <Box
        component="span"
        sx={{ display: 'flex', gap: 10, flexWrap: 'wrap', p: 0, m: 0 }}
        >
          {cards}
        </Box>
      </div>
    </section>
  );
}

export default Areas;
