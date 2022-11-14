import 'package:flutter/material.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
class TwitterActions extends StatefulWidget {
  const TwitterActions({
    super.key,
    required this.email,
  });
  final String email;

  @override
  State<TwitterActions> createState() => _TwitterActionsState();
}

class _TwitterActionsState extends State<TwitterActions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<CardActions> cards =
      [
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Nom d'utilisateur changé",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          textColor: const Color.fromARGB(255, 0, 0, 0),
          route: "http://twitter:9005/twitter/name",

        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Username changé",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/username",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Nouveau tweet dans les signets",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/bookmarks",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Tweet enelevé des signets",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/bookmarks",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Nouveau message",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/messages",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Message supprimé par l'utilisateur",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/messages",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Nouveau tweet publié",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/userTweets",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Tweet supprimé publié",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/userTweets",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Nouveau following",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/following",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Désabonnement d'un compte",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/following",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Nouveau follower",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/followers",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Perte d'un follower",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/followers",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Nouveau like",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/likingUsers",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Like retiré",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/likingUsers",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Nouveau retweet",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/retweetedBy",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Retweet supprimé",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/retweetedBy",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Nouveau tweet liké",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/likedTweets",

          textColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        CardActions(
          email: widget.email,
          image: "img/twitter.png",
          text: "Like sur un tweet retiré",
          shadowColor: const Color.fromRGBO(29, 161, 243, 1),
          route: "http://twitter:9005/twitter/likedTweets",

          textColor: const Color.fromARGB(255, 0, 0, 0),
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