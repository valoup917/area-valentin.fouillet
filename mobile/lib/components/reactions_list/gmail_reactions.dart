import 'package:flutter/material.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput1.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput2.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

import '../welcome_page/CardsReactions.dart';
class GmailReactions extends StatefulWidget {
  const GmailReactions({
    super.key,
    required this.email,
    required this.actionRoute,
    required this.actionData,
  });
  final String email;
  final String actionRoute;
  final String actionData;
  @override
  State<GmailReactions> createState() => _GmailReactionsState();
}

class _GmailReactionsState extends State<GmailReactions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<Widget> cards =
      [
        CardReactionsInput1(
          email: widget.email,
          image: "img/gmail.png",
          text: "Change la langue de gmail",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: Colors.black,
          reactionRoute: "http://google:9115/google/gmail/updateUserLanguage",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "langue"
        ),
        CardReactionsInput1(
          email: widget.email,
          image: "img/gmail.png",
          text: "Met un message à la poubelle",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: Colors.black,
          reactionRoute: "http://google:9115/google/gmail/trashMessage",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "message"
        ),
        CardReactionsInput2(
          email: widget.email,
          image: "img/gmail.png",
          text: "Envoie un mail avec un message à un utilisateur",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: Colors.black,
          reactionRoute: "http://google:9115/google/gmail/sendMail",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText1: "text",
          hintText2: "destinataire"
        ),
        CardReactions(
          email: widget.email,
          image:  isDarkMode ? "img/back_dark.png" : "img/back_clear.png",
          text: "back",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: const Color.fromARGB(255, 4, 7, 100),
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