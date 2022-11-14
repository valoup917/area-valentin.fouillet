import 'package:flutter/material.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
class MuslimActions extends StatefulWidget {
  const MuslimActions({
    super.key,
    required this.email,
  });
  final String email;

  @override
  State<MuslimActions> createState() => _MuslimActionsState();
}

class _MuslimActionsState extends State<MuslimActions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<CardActions> cards =
      [
        CardActions(
          email: widget.email,
          image: "img/muslim.png",
          text: "C'est l'heure du asr",
          shadowColor: const Color.fromRGBO(6, 33, 62, 1),
          route: "http://salat:9455/salat/asr",
          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/muslim.png",
          text: "C'est l'heure du dhuhr",
          shadowColor: const Color.fromRGBO(6, 33, 62, 1),
          route: "http://salat:9455/salat/dhuhr",
          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/muslim.png",
          text: "C'est l'heure du fajr",
          shadowColor: const Color.fromRGBO(6, 33, 62, 1),
          route: "http://salat:9455/salat/fajr",
          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/salat.png",
          text: "C'est l'heure du firstthird",
          shadowColor: const Color.fromRGBO(6, 33, 62, 1),
          route: "http://salat:9455/salat/firstthird",
          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/salat.png",
          text: "C'est l'heure du imsak",
          shadowColor: const Color.fromRGBO(6, 33, 62, 1),
          route: "http://salat:9455/salat/imsak",
          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/salat.png",
          text: "C'est l'heure du isha",
          shadowColor: const Color.fromRGBO(6, 33, 62, 1),
          route: "http://salat:9455/salat/isha",
          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/salat.png",
          text: "C'est l'heure du lastthird",
          shadowColor: const Color.fromRGBO(6, 33, 62, 1),
          route: "http://salat:9455/salat/lastthird",
          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/salat.png",
          text: "C'est l'heure du maghrib",
          shadowColor: const Color.fromRGBO(6, 33, 62, 1),
          route: "http://salat:9455/salat/maghrib",
          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/salat.png",
          text: "C'est l'heure du midnight",
          shadowColor: const Color.fromRGBO(6, 33, 62, 1),
          route: "http://salat:9455/salat/midnight",
          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/salat.png",
          text: "C'est l'heure du sunrise",
          shadowColor: const Color.fromRGBO(6, 33, 62, 1),
          route: "http://salat:9455/salat/sunrise",
          textColor: Colors.white,
        ),
        CardActions(
          email: widget.email,
          image: "img/salat.png",
          text: "C'est l'heure du sunset",
          shadowColor: const Color.fromRGBO(6, 33, 62, 1),
          route: "http://salat:9455/salat/sunset",
          textColor: Colors.white,
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