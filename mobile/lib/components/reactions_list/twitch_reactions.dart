import 'package:flutter/material.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput1.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput2.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

import '../welcome_page/CardsReactions.dart';
class TwitchReactions extends StatefulWidget {
  const TwitchReactions({
    super.key,
    required this.email,
    required this.actionRoute,
    required this.actionData,
  });
  final String email;
  final String actionRoute;
  final String actionData;
  @override
  State<TwitchReactions> createState() => _TwitchReactionsState();
}

class _TwitchReactionsState extends State<TwitchReactions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<Widget> cards =
      [
        CardReactionsInput1(
          email: widget.email,
          image: "img/twitch.png",
          text: "Changer de bio",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          textColor: Colors.white,
          reactionRoute: "http://twitch:9135/twitch/changeDescription",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "description"
        ),
        CardReactions(
          email: widget.email,
          image:  "img/twitch.png",
          text: "Raid un utilisateur qui te suis",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
          textColor: Colors.white,
          reactionRoute: "http://twitch:9135/twitch/raidUser",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
        ),
        
        CardReactions(
          email: widget.email,
          image:  isDarkMode ? "img/back_dark.png" : "img/back_clear.png",
          text: "back",
          shadowColor: const Color.fromRGBO(156, 64, 255, 1),
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