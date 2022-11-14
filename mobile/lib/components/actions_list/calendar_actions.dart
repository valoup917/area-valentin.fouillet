import 'package:flutter/material.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
class CalendarActions extends StatefulWidget {
  const CalendarActions({
    super.key,
    required this.email,
  });
  final String email;

  @override
  State<CalendarActions> createState() => _CalendarActionsState();
}

class _CalendarActionsState extends State<CalendarActions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<CardActions> cards =
      [
        CardActions(
          email: widget.email,
          image: "img/calendar.png",
          text: "Nouvelle événement dans ton calendrier",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://google:9115/google/calendar/getUserEvents",
          textColor: Colors.black,
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