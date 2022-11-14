import 'package:flutter/material.dart';
import 'package:mobile/components/welcome_page/CardsActionsInput1.dart';

import '../AppBarStaive.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
import '../welcome_page/CardsActions.dart';
class WeatherActions extends StatefulWidget {
  const WeatherActions({
    super.key,
    required this.email,
  });
  final String email;

  @override
  State<WeatherActions> createState() => _WeatherActionsState();
}

class _WeatherActionsState extends State<WeatherActions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<Widget> cards =
      [
        CardActions(
          email: widget.email,
          image: "img/weather.png",
          text: "La température est une température d'été",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/toHot",
          textColor: Colors.white 
        ),
        CardActions(
          email: widget.email,
          image: "img/weather.png",
          text: "La température est une température d'hiver",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/toCold",
          textColor: Colors.white 
        ),
        CardActions(
          email: widget.email,
          image: "img/weather.png",
          text: "L'humidité est supérieur à 75%",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/toWet",
          textColor: Colors.white 
        ),
        CardActions(
          email: widget.email,
          image: "img/weather.png",
          text: "L'humidité est inférieur à 40%",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/toDry",
          textColor: Colors.white 
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/weather.png",
          text: "La température est supérieur à celle donnée",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/tempusercheckmore",
          textColor: Colors.white,
          hintText: "température"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/weather.png",
          text: "La température est inférieur à celle donnée",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/tempusercheckless",
          textColor: Colors.white,
          hintText: "température"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/weather.png",
          text: "L'humidité est supérieur à celle donnée",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/humusercheckmore",
          textColor: Colors.white,
          hintText: "humidité"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/weather.png",
          text: "L'humidité est inférieur à celle donnée",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/humusercheckless",
          textColor: Colors.white,
          hintText: "humidité" 
        ),
        CardActions(
          email: widget.email,
          image: "img/weather.png",
          text: "La température est en dessous de 10 degrés",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/below10",
          textColor: Colors.white
        ),
        CardActions(
          email: widget.email,
          image: "img/weather.png",
          text: "La température est en dessous de 0 degrés",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/below0",
          textColor: Colors.white
        ),
        CardActions(
          email: widget.email,
          image: "img/weather.png",
          text: "La température est supérieur à 20 degrés",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/above20",
          textColor: Colors.white
        ),
        CardActions(
          email: widget.email,
          image: "img/weather.png",
          text: "La température est supérieur à 30 degrés",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/above30",
          textColor: Colors.white
        ),
        CardActions(
          email: widget.email,
          image: "img/weather.png",
          text: "La temps est nuageux",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/verycloudy",
          textColor: Colors.white
        ),
        CardActions(
          email: widget.email,
          image: "img/weather.png",
          text: "Il neige",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/snowing",
          textColor: Colors.white
        ),
        CardActions(
          email: widget.email,
          image: "img/weather.png",
          text: "Il pleut",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/raining",
          textColor: Colors.white
        ),
        CardActions(
          email: widget.email,
          image: "img/weather.png",
          text: "Le vent est supérieur à 12km",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://weather:8095/Weather/windy",
          textColor: Colors.white
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