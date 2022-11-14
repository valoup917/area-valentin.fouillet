import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
import 'package:mobile/components/Titles.dart';
import 'package:mobile/pages/header_page.dart';

import '../components/AppBarStaive.dart';
import '../components/welcome_page/CardsServicesActions.dart';

class ActionPage extends StatefulWidget {
  const ActionPage({
    super.key,
    required this.email
  });
  final String email;

  @override
  State<ActionPage> createState() => _ActionPageState();
}

class _ActionPageState extends State<ActionPage> {
  @override
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  Widget build(BuildContext context) {
    List<CardServicesActions> cards =
    [
      CardServicesActions(
        text: "1st index overloaded",
        color: Colors.white,
        email: widget.email,
      ),
      CardServicesActions(
        text: "Calendar",
        color: const Color.fromRGBO(0, 0, 0, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "Riot",
        color: const Color.fromRGBO(192, 55, 60, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "IPFS",
        color: const Color.fromRGBO(212, 212, 212, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "Muslim",
        color: const Color.fromRGBO(6, 33, 62, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "Gmail",
        color: const Color.fromRGBO(0, 0, 0, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "Twitch",
        color: const Color.fromRGBO(156, 64, 255, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "Github",
        color: const Color.fromRGBO(0, 0, 0, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "Drive",
        color: const Color.fromRGBO(0, 0, 0, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "Linkedin",
        color: const Color.fromRGBO(10, 102, 194, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "Weather",
        color: const Color.fromRGBO(60, 60, 60, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "Coingecko",
        color: const Color.fromRGBO(139, 197, 63, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "Twitter",
        color: const Color.fromRGBO(29, 161, 243, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "Spotify",
        color: const Color.fromRGBO(27, 20, 19, 1),
        email: widget.email,
      ),
      CardServicesActions(
        text: "Youtube",
        color: const Color.fromRGBO(221, 42, 38, 1),
        email: widget.email,
      ),
    ];
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    return ValueChangeObserver<bool>(
      cacheKey: Header.keyDarkMode,
      defaultValue: true,
      builder: (_, isDarkMode, __) => Scaffold(
        body: Column(
          children: [
            AppBarStaive(w: w, h: h, showMenu: true,),
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.only(bottom: 25, top: 0),
                itemCount: cards.length,
                shrinkWrap: false,
                itemBuilder: (BuildContext context, int index) {
                  if(index == 0) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 20.0),
                      child: Center(
                        child: Text(
                          "Choose an action",
                          style: TextStyle(
                            fontSize: h * 0.045,
                            letterSpacing: 0,
                            color: isDarkMode ? Colors.white : const Color.fromARGB(255, 2, 45, 88),
                            fontWeight: FontWeight.bold,
                            shadows: [ 
                              Shadow(
                                offset: const Offset(2, 2),
                                blurRadius: 2.0,
                                color: isDarkMode ? const Color.fromARGB(255, 149, 149, 149) : const Color.fromARGB(130, 2, 45, 88), //color of shadow with opacity
                              ),
                            ]
                          ),
                        ),
                      )
                    );
                  } else {
                    return Column(
                      children: [cards[index]]
                    );
                  }
                }
              ),
            ),
          ],
        ),
      ),
    );
  }
}