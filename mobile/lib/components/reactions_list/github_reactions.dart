import 'package:flutter/material.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput1.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput2.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

import '../welcome_page/CardsReactions.dart';
class GithubReactions extends StatefulWidget {
  const GithubReactions({
    super.key,
    required this.email,
    required this.actionRoute,
    required this.actionData,
  });
  final String email;
  final String actionRoute;
  final String actionData;
  @override
  State<GithubReactions> createState() => _GithubReactionsState();
}

class _GithubReactionsState extends State<GithubReactions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<Widget> cards =
      [
        CardReactionsInput1(
          email: widget.email,
          image: "img/github.png",
          text: "Changer de nom d'utilisateur",
          shadowColor: Colors.black,
          textColor: Colors.white,
          reactionRoute: "http://github:9065/github/updateUserName",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "nouveau nom"
        ),
        CardReactionsInput1(
          email: widget.email,
          image: "img/github.png",
          text: "Changer d'adresse email",
          shadowColor: Colors.black,
          textColor: Colors.white,
          reactionRoute: "http://github:9065/github/updateUserEmail",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "nouvelle adresse email"
        ),
        CardReactionsInput1(
          email: widget.email,
          image: "img/github.png",
          text: "Changer de bio",
          shadowColor: Colors.black,
          textColor: Colors.white,
          reactionRoute: "http://github:9065/github/updateUserDescription",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "nouvelle bio"
        ),
        CardReactionsInput1(
          email: widget.email,
          image: "img/github.png",
          text: "Changer de profil privé ou public",
          shadowColor: Colors.black,
          textColor: Colors.white,
          reactionRoute: "http://github:9065/github/updateEmailVisibility",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "public ou privé"
        ),
        CardReactionsInput2(
          email: widget.email,
          image: "img/github.png",
          text: "Créer un nouveau repository",
          shadowColor: Colors.black,
          textColor: Colors.white,
          reactionRoute: "http://github:9065/github/createRepository",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText1: "nom du repository",
          hintText2: "description"
        ),
        CardReactions(
          email: widget.email,
          image:  isDarkMode ? "img/back_dark.png" : "img/back_clear.png",
          text: "back",
          shadowColor: Colors.black,
          textColor: Colors.white,
          reactionRoute: "",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
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