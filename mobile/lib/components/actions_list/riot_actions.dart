import 'package:flutter/material.dart';
import 'package:mobile/components/welcome_page/CardsActionsInput1.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
class RiotActions extends StatefulWidget {
  const RiotActions({
    super.key,
    required this.email,
  });
  final String email;

  @override
  State<RiotActions> createState() => _RiotActionsState();
}

class _RiotActionsState extends State<RiotActions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<Widget> cards =
      [
        CardActions(
          email: widget.email,
          image: "img/riotgame.png",
          text: "Une maintenance est en cours sur LOL",
          shadowColor: const Color.fromRGBO(192, 55, 60, 1),
          route: "http://riotgame:9140/riotgame/maintenance",
          textColor: Colors.black,
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/riotgame.png",
          text: "Est ce que le champion donné est en rotation",
          shadowColor: const Color.fromRGBO(192, 55, 60, 1),
          route: "http://riotgame:9140/riotgame/ischampioninrotation",
          textColor: Colors.black,
          hintText: "champion",
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