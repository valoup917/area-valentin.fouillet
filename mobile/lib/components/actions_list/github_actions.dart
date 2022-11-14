import 'package:flutter/material.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
class GithubActions extends StatefulWidget {
  const GithubActions({
    super.key,
    required this.email,
  });
  final String email;

  @override
  State<GithubActions> createState() => _GithubActionsState();
}

class _GithubActionsState extends State<GithubActions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<CardActions> cards =
      [
        CardActions(
          email: widget.email,
          image: "img/github.png",
          text: "User name modifié",
          shadowColor: Colors.black,
          textColor: Colors.white,
          route: "http://github:9065/github/userName",

        ),
        CardActions(
          email: widget.email,
          image: "img/github.png",
          text: "La déscription a été modifiée",
          shadowColor: Colors.black,
          route: "http://github:9065/github/userDescription",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/github.png",
          text: "Nouveau follower",
          shadowColor: Colors.black,
          route: "http://github:9065/github/userFollowers",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/github.png",
          text: "Follower perdu",
          shadowColor: Colors.black,
          route: "http://github:9065/github/userFollowers",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/github.png",
          text: "Nouvel utilisateur suivi",
          shadowColor: Colors.black,
          route: "http://github:9065/github/userFollowing",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/github.png",
          text: "Unfollow d'un compte",
          shadowColor: Colors.black,
          route: "http://github:9065/github/userFollowing",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/github.png",
          text: "Nouveau repository",
          shadowColor: Colors.black,
          route: "http://github:9065/github/userRepository",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/github.png",
          text: "Suppression d'un repository",
          shadowColor: Colors.black,
          route: "http://github:9065/github/userRepository",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/github.png",
          text: "Nouveau commit",
          shadowColor: Colors.black,
          route: "http://github:9065/github/userCommits",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/github.png",
          text: "Suppression d'un commit",
          shadowColor: Colors.black,
          route: "http://github:9065/github/userCommits",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/github.png",
          text: "Nouvelle branche",
          shadowColor: Colors.black,
          route: "http://github:9065/github/userBranches",

          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/github.png",
          text: "Suppression d'une branche",
          shadowColor: Colors.black,
          route: "http://github:9065/github/userBranches",

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