import 'package:flutter/material.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput1.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput2.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

import '../welcome_page/CardsReactions.dart';
class CalendarReactions extends StatefulWidget {
  const CalendarReactions({
    super.key,
    required this.email,
    required this.actionRoute,
    required this.actionData,
  });
  final String email;
  final String actionRoute;
  final String actionData;
  @override
  State<CalendarReactions> createState() => _CalendarReactionsState();
}

class _CalendarReactionsState extends State<CalendarReactions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<Widget> cards =
      [
        CardReactionsInput1(
          email: widget.email,
          image: "img/calendar.png",
          text: "Créer un évènement",
          textColor: Colors.black,
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          reactionRoute: "http://google:9115/google/calendar/createEvent",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "nom de l'évènement"
        ),
        CardReactionsInput1(
          email: widget.email,
          image: "img/calendar.png",
          text: "Supprime un évènement",
          reactionRoute: "http://google:9115/google/calendar/deleteEvent",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          textColor: Colors.black,
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          hintText: "nom de l'évènement"
        ),
        CardReactions(
          email: widget.email,
          image:  isDarkMode ? "img/back_dark.png" : "img/back_clear.png",
          text: "back",
          textColor: Colors.black,
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
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