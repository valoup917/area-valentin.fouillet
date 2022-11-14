import 'package:flutter/material.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput1.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput2.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

import '../welcome_page/CardsReactions.dart';
class DriveReactions extends StatefulWidget {
  const DriveReactions({
    super.key,
    required this.email,
    required this.actionRoute,
    required this.actionData,
  });
  final String email;
  final String actionRoute;
  final String actionData;
  @override
  State<DriveReactions> createState() => _DriveReactionsState();
}

class _DriveReactionsState extends State<DriveReactions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<Widget> cards =
      [
        CardReactionsInput1(
          email: widget.email,
          image: "img/drive.png",
          text: "Créer un fichier",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: Colors.black,
          reactionRoute: "http://google:9115/google/drive/createFile",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "nom du fichier"
        ),
        CardReactionsInput1(
          email: widget.email,
          image: "img/drive.png",
          text: "Supprime un fichier",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: Colors.black,
          reactionRoute: "http://google:9115/google/drive/deleteFile",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "message"
        ),
        CardReactionsInput2(
          email: widget.email,
          image: "img/drive.png",
          text: "Créer un nouveau commentaire sur un fichier",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: Colors.black,
          reactionRoute: "http://google:9115/google/drive/createComment",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText1: "nom du fichier",
          hintText2: "commentaire"
        ),
        CardReactionsInput2(
          email: widget.email,
          image: "img/drive.png",
          text: "Supprime un commentaire sur un fichier",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: Colors.black,
          reactionRoute: "http://google:9115/google/drive/deleteComment",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText1: "nom du fichier",
          hintText2: "commentaire"
        ),
        CardReactions(
          email: widget.email,
          image:  isDarkMode ? "img/back_dark.png" : "img/back_clear.png",
          text: "back",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: Colors.black,
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