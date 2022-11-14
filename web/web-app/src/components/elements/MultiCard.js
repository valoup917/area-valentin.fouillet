import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import { useCookies } from "react-cookie";
import React, { useState, useEffect, Component } from "react";
import "../../index.css";
import "./Services.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import "./Popup.css";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaCalendar, FaMosque } from "react-icons/fa";
import { GiGecko } from "react-icons/gi";
import {
  SiRiotgames,
  SiIpfs,
  SiYoutube,
  SiGithub,
  SiGoogledrive,
  SiDiscord,
  SiTwitter,
  SiTwitch,
  SiLinkedin,
  SiSpotify,
  SiGmail,
} from "react-icons/si";
import "./HOne.css";

const description = {
  // coingecko
  "coingecko/existingcoin": "Est ce que la crypto donnée existe",
  "coingecko/checkcoinprice":
    "Est ce que le prix donné de la cypto donnée est juste",
  "coingecko/checkchangeonehourpercentage":
    "Est ce que le hour change volume donné de la cypto donnée est juste",
  "coingecko/checkchangeonedaypercentage":
    "Est ce que le day change volume donné de la cypto donnée est juste",
  "coingecko/checkchangeweekpercentage":
    "Est ce que le week change volume donné de la cypto donnée est juste",
  "coingecko/btccheckcoinprice":
    "Est ce que le prix donnée est égale a celui du bitcoin (~200)",
  "coingecko/btccheckonehour":
    "Est ce que le % donnée est égale a celui de l'évolution en 1h du bitcoin",
  "coingecko/btccheckoneday":
    "Est ce que le % donnée est égale a celui de l'évolution en 1 jour du bitcoin",
  "coingecko/btccheckoneweek":
    "Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour du bitcoin",
  "coingecko/ethcheckcoinprice":
    "Est ce que le prix donnée est égale a celui de l'ether (~200)",
  "coingecko/ethcheckonehour":
    "Est ce que le % donnée est égale a celui de l'évolution en 1h de l'ether",
  "coingecko/ethcheckoneday":
    "Est ce que le % donnée est égale a celui de l'évolution en 1 jour de l'ether",
  "coingecko/ethcheckoneweek":
    "Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour de l'ether",
  "coingecko/binanceusdcheckcoinprice":
    "Est ce que le prix donnée est égale a celui du binance (~200)",
  "coingecko/binanceusdcheckonehour":
    "Est ce que le % donnée est égale a celui de l'évolution en 1h du binance",
  "coingecko/binanceusdcheckoneday":
    "Est ce que le % donnée est égale a celui de l'évolution en 1 jour du binance",
  "coingecko/binanceusdcheckoneweek":
    "Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour du binance",
  "coingecko/solanacheckcoinprice":
    "Est ce que le prix donnée est égale a celui du solana (~200)",
  "coingecko/solanacheckonehour":
    "Est ce que le % donnée est égale a celui de l'évolution en 1h du solana",
  "coingecko/solanacheckoneday":
    "Est ce que le % donnée est égale a celui de l'évolution en 1 jour du solana",
  "coingecko/solanacheckoneweek":
    "Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour du solana",
  // gmail
  "gmail/getUserMessages": "Nouveau mail",
  "gmail/getUserDrafts": "Nouveau draft",
  "gmail/updateUserLanguage": "Change la langue de gmail",
  "gmail/getUserFilters": "Nouveau filtre",
  "gmail/getUserSendAs": "Nouveau sendAs",
  "gmail/trashMessage": "Met un message à la poubelle",
  "gmail/sendMail": "nvoie un mail avec un message à un utilisateur",
  // calendar
  "calendar/getUserEvents": "Nouvelle événement dans ton calendrier",
  "calendar/createEvent": "Créer un évènement",
  "calendar/deleteEvent": "Supprime un évènement",
  // drive
  "drive/listFiles": "Nouveau fichier dans ton drive",
  "drive/createFile": "Créer un fichier",
  "drive/deleteFile": "Supprime un fichier",
  "drive/listComment": "Nouveau commentaire dans un de tes fichier drive",
  "drive/createComment": "Créer un nouveau commentaire sur un fichier",
  "drive/deleteComment": "Supprime un commentaire sur un fichier",
  // youtube
  "youtube/listLikedVideos": "Nouvelle vidéo likée",
  "youtube/listDislikedVideos": "Nouvelle vidéo dislikée",
  // Discord
  "Discord/message": "Envoyer un message sur un chanel random",
  "Discord/sendrandommeme": "Envoyer un meme random",
  "Discord/sendrandomgif": "Envoyer un random gif",
  // ipfs
  "ipfs/bootstraplist": "Plus de 6 pair sur la boostrap list",
  "ipfs/pinadd": "Pin un fichier",
  "ipfs/bootstrapadd": "Ajout une boostrap node",
  "ipfs/bootstrapadddefault": "Ajout une boostrap node par default",
  "ipfs/bootstraprmall": "Supprime tout les boostrap nodes",
  "ipfs/filesmkdir": "Créer un dossier dans MFS",
  "ipfs/pinrm": "Supprime un fichier pin",
  "ipfs/get": "Telecharger un fichier sur le reseau",
  "ipfs/swarmconnect": "Se connecter à un nouveau peer",
  "ipfs/swarmdisconnect": "Se déconnecter d'un peer",
  "ipfs/shutdown": "Déconnecter son noeud",
  // spotify
  "spotify/userName": "Nom d'utilisateur changé",
  "spotify/userMail": "Email changé",
  "spotify/userFollowers": "Nouveau follower",
  "spotify/userProfileImage": "Photo de profil changé",
  "spotify/userProduct": "Forfait spotify changé",
  "spotify/userFollowing": "Nouvel artist follow",
  "spotify/followPlaylist": "Follow cette nouvelle playlist",
  "spotify/pausePlayback": "Mettre sur pause la musique",
  "spotify/resumePlayback": "Reprendre la musique",
  "spotify/skipToNext": "Mettre la prochaine musique",
  "spotify/skipToPrevious": "Mettre la musique précédente",
  "spotify/setPlaybackVolume": "Regler le volume de la musique",
  // twitch
  "twitch/userName": "User name modifié",
  "twitch/userEmail": "Adresse email modifiée",
  "twitch/userDescription": "La déscription a été modifiée",
  "twitch/userProfileImage": "Image de profil changée",
  "twitch/changeDescription": "Changer de bio",
  "twitch/userFollowers": "Nouveau follower",
  "twitch/userBlockedUsers": "Nouvel utilisateur bloqué",
  "twitch/userPlaylists": "Nouvelle playlist ajoutée",
  "twitch/userFollowing": "Nouvel utilisateur suivi",
  "twitch/userVideos": "Nouvelle vidéo ajoutée",
  "twitch/raidUser": "Raid un utilisateur qui te suis",
  // twitter
  "twitter/createTweet": "Poster un tweet",
  "twitter/name": "Nom d'utilisateur changé",
  "twitter/username": "Username changé",
  "twitter/bookmarks": "Nouveau tweet dans les signets",
  "twitter/messages": "Nouveau message",
  "twitter/userTweets": "Nouveau tweet publié",
  "twitter/following": "Nouveau following",
  "twitter/followers": "Nouveau follower",
  "twitter/likingUsers": "Nouveau like",
  "twitter/retweetedBy": "Nouveau retweet",
  "twitter/likedTweets": "Nouveau tweet liké",
  // github
  "github/userName": "User name modifié",
  "github/userDescription": "La déscription a été modifiée",
  "github/userFollowers": "Nouveau follower",
  "github/userFollowing": "Nouvel utilisateur suivi",
  "github/userRepository": "Nouveau repository",
  "github/userCommits": "Nouveau commit",
  "github/userBranches": "Nouvelle branche",
  "github/updateUserName": "Changer de nom d'utilisateur",
  "github/updateUserEmail": "Changer d'adresse email",
  "github/updateUserDescription": "Changer de bio",
  "github/updateEmailVisibility": "Changer de profil privé ou public",
  "github/createRepository": "Créer un nouveau repository",
  // weather
  "Weather/toHot": "La température est une température d'été",
  "Weather/toCold": "La température est une température d'hiver",
  "Weather/toWet": "L'humidité est supérieur à 75%",
  "Weather/toDry": "L'humidité est inférieur à 40%",
  "Weather/tempusercheckmore": "La température est supérieur à celle donnée",
  "Weather/tempusercheckless": "La température est inférieur à celle donnée",
  "Weather/humusercheckmore": "L'humidité est supérieur à celle donnée",
  "Weather/humusercheckless": "L'humidité est inférieur à celle donnée",
  "Weather/below10": "La température est en dessous de 10 degrés",
  "Weather/below0": "La température est en dessous de 0 degrés",
  "Weather/above20": "La température est supérieur à 20 degrés",
  "Weather/above30": "La température est supérieur à 30 degrés",
  "Weather/verycloudy": "La temps est nuageux",
  "Weather/snowing": "Il neige",
  "Weather/raining": "Il pleut",
  "Weather/windy": "Le vent est supérieur à 12km",
  // riot
  "riotgame/maintenance": "Une maintenance est en cours sur LOL",
  "riotgame/maintenace": "Une maintenance est en cours sur LOL",
  "riotgame/ischampioninrotation":
    "Est ce que le champion donné est en rotation",
  // muslim
  "salat/asr": "C'est l'heure du asr",
  "salat/dhuhr": "C'est l'heure du dhuhr",
  "salat/fajr": "C'est l'heure du fajr",
  "salat/firstthird": "C'est l'heure du firstthird",
  "salat/imsak": "C'est l'heure du imsak",
  "salat/isha": "C'est l'heure du isha",
  "salat/lastthird": "C'est l'heure du lastthird",
  "salat/maghrib": "C'est l'heure du maghrib",
  "salat/midnight": "C'est l'heure du midnight",
  "salat/sunrise": "C'est l'heure du sunrise",
  "salat/sunset": "C'est l'heure du sunset",
  // linkedin
  "linkedin/userEmail": "Adresse email modifiée",
  "linkedin/createpost": "Créer un post linkedin",
};

const toFind = {
  Discord: <SiDiscord />,
  Weather: <TiWeatherPartlySunny />,
  calendar: <FaCalendar />,
  coingecko: <GiGecko />,
  github: <SiGithub />,
  gmail: <SiGmail />,
  ipfs: <SiIpfs />,
  linkedin: <SiLinkedin />,
  spotify: <SiSpotify />,
  twitter: <SiTwitter />,
  twitch: <SiTwitch />,
  youtube: <SiYoutube />,
  drive: <SiGoogledrive />,
  riotgame: <SiRiotgames />,
  salat: <FaMosque />,
};

function getObjKey(obj, objKey) {
  for (const [key, value] of Object.entries(obj)) {
    if (objKey === key) return value;
  }
}

function Delete(action_url, reaction_url, email) {
  console.log(action_url);
  console.log(reaction_url);
  var data = JSON.stringify({
    action: action_url,
    reaction: reaction_url,
    mail: email,
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

function ret(data, bool) {
  if (bool === 1) {
    const sep = data.split("/");
    const obj = getObjKey(toFind, sep[0]);
    return obj;
  } else {
    console.log("data", data);
    const obj = getObjKey(description, data);
    return obj;
    // return 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica';
  }
}

function DeleteProduct(action_url, reaction_url, email) {
  console.log(action_url);
  console.log(reaction_url);
  Delete(action_url, reaction_url, email);
  window.location.reload();
}

export default function MultiActionAreaCard(props) {
  const [cookies, setCookie] = useCookies(["email"]);
  const [isDelPopup, setIsDelOpen] = useState(false);
  const toggleDelPopup = () => {
    setIsDelOpen(!isDelPopup);
  };
  const handleDelete = (e, action_url, reaction_url, email) => {
    e.preventDefault();
    toggleDelPopup();
    return DeleteProduct(action_url, reaction_url, email);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <p>Action :</p>
            <b className="padding">{ret(props.area[0][1], 3)}</b>
            <p>Reaction :</p>
            <b className="padding">{ret(props.area[2][1], 3)}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ display: "flex" }}>
        <CardActions title="Delete this AREA">
          <IconButton onClick={toggleDelPopup}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <div className="area-image-n">
          <Box sx={{ display: "flex" }}>
            {ret(props.area[0][1], 1)}
            <p className="separation"></p>
            {ret(props.area[2][1], 1)}
          </Box>
          <p className="sep-between-logos"></p>
          <Stack spacing={2} direction="row">
            <p className="sep-between-linear"></p>
            {props.area[1] === false ? (
              <>
                <Box sx={{ width: "100%" }}>
                  <div className="linear-progress-fst">
                    <LinearProgress />
                  </div>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ width: "100%" }}>
                  <div className="linear-progress-fst">
                    <LinearProgress
                      variant="determinate"
                      value={100}
                      color="success"
                    />
                  </div>
                </Box>
              </>
            )}
            {props.area[3] === false ? (
              <>
                <Box sx={{ width: "100%" }}>
                  <div className="linear-progress-snd">
                    <LinearProgress />
                  </div>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ width: "100%" }}>
                  <div className="linear-progress-fst">
                    <LinearProgress
                      variant="determinate"
                      value={100}
                      color="success"
                    />
                  </div>
                </Box>
              </>
            )}
          </Stack>
        </div>
      </Box>
      {isDelPopup && (
        <Popup
          content={
            <>
              <b className="title">Supprimer une Action-REAction</b>
              <p className="position"></p>
              <Alert severity="info">
                Êtes-vous sûr de vouloir supprimer cette AREA ?
              </Alert>
              <p className="position"></p>
              <Button
                onClick={(e) => {
                  handleDelete(
                    e,
                    props.area[0][0] + props.area[0][1],
                    props.area[2][0] + props.area[2][1],
                    cookies.email
                  );
                }}
                variant="outlined"
                color="error"
              >
                Supprimer
              </Button>
            </>
          }
          handleClose={toggleDelPopup}
        />
      )}
    </Card>
  );
}
