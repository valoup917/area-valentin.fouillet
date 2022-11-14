import 'package:flutter/material.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
class SpotifyActions extends StatefulWidget {
  const SpotifyActions({
    super.key,
    required this.email,
  });
  final String email;

  @override
  State<SpotifyActions> createState() => _SpotifyActionsState();
}

class _SpotifyActionsState extends State<SpotifyActions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<CardActions> cards =
      [
        CardActions(
          email: widget.email,
          image: "img/spotify.png",
          text: "nom d'utilisateur changé",
          shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          textColor: const Color.fromARGB(255, 255, 255, 255),
          route: "http://spotify:9125/spotify/userName",

        ),
        CardActions(
          email: widget.email,
          image: "img/spotify.png",
          text: "email changé",
          shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          route: "http://spotify:9125/spotify/userMail",

          textColor: const Color.fromARGB(255, 255, 255, 255),
        ),
        CardActions(
          email: widget.email,
          image: "img/spotify.png",
          text: "nouveau follower",
          shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          route: "http://spotify:9125/spotify/userFollowers",

          textColor: const Color.fromARGB(255, 255, 255, 255),
        ),
        CardActions(
          email: widget.email,
          image: "img/spotify.png",
          text: "perte d'un follower",
          shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          route: "http://spotify:9125/spotify/userFollowers",

          textColor: const Color.fromARGB(255, 255, 255, 255),
        ),
        CardActions(
          email: widget.email,
          image: "img/spotify.png",
          text: "photo de profil changé",
          shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          route: "http://spotify:9125/spotify/userProfileImage",

          textColor: const Color.fromARGB(255, 255, 255, 255),
        ),
        CardActions(
          email: widget.email,
          image: "img/spotify.png",
          text: "forfait spotify changé",
          shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          route: "http://spotify:9125/spotify/userProduct",

          textColor: const Color.fromARGB(255, 255, 255, 255),
        ),
        CardActions(
          email: widget.email,
          image: "img/spotify.png",
          text: "nouvel artist follow",
          shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          route: "http://spotify:9125/spotify/userFollowing",

          textColor: const Color.fromARGB(255, 255, 255, 255),
        ),
        CardActions(
          email: widget.email,
          image: "img/spotify.png",
          text: "nouvel artist unfollow",
          shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          route: "http://spotify:9125/spotify/userFollowing",

          textColor: const Color.fromARGB(255, 255, 255, 255),
        ),
        CardActions(
          email: widget.email,
          image:  isDarkMode ? "img/back_dark.png" : "img/back_clear.png",
          text: "back",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "",

          textColor: Colors.black,
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
              itemCount: cards.length,
              padding: const EdgeInsets.only(bottom: 25, top: 0),
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