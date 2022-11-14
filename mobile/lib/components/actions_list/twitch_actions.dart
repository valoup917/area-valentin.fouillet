import 'package:flutter/material.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
class TwitchActions extends StatefulWidget {
  const TwitchActions({
    super.key,
    required this.email,
  });
  final String email;

  @override
  State<TwitchActions> createState() => _TwitchActionsState();
}

class _TwitchActionsState extends State<TwitchActions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<CardActions> cards =
      [
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "User name modifié",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          textColor: Colors.white,
          route: "http://twitch:9135/twitch/userName",

        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "Adresse email modifiée",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userEmail",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "Nouveau follower",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userFollowers",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "Follower perdu",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userFollowers",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "Image de profil changée",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userProfileImage",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "La déscription a été modifiée",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userDescription",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "Nouvel utilisateur suivi",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userFollowing",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "Unfollow d'un compte",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userFollowing",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "Nouvel utilisateur bloqué",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userBlockedUsers",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "Nouvel utilisateur débloqué",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userBlockedUsers",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "Nouvelle playlist ajoutée",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userPlaylists",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "Playlist supprimée",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userPlaylists",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "Nouvelle vidéo ajoutée",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userVideos",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/twitch.png",
          text: "Vidéo supprimée",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          route: "http://twitch:9135/twitch/userVideos",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image:  isDarkMode ? "img/back_dark.png" : "img/back_clear.png",
          text: "back",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "",

          textColor: Colors.white,
        ),
      ];
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    return Scaffold(
      body:  Column(
        children: [
          AppBarStaive(w: w, h: h, showMenu: false),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.only(bottom: 25, top: 0),
              itemCount: cards.length,
              shrinkWrap: false,
              itemBuilder: (BuildContext context, int index) {
                return Column(
                  children: [cards[index]]
                );
              }
            ),
          ),
        ],
      ),
    );
  }
}