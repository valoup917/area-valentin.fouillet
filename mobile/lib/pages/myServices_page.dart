import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
import 'package:mobile/components/Titles.dart';
import 'package:mobile/components/welcome_page/CardsAllServices.dart';
import 'package:mobile/pages/header_page.dart';

import '../components/AppBarStaive.dart';
import '../components/welcome_page/CardsServicesActions.dart';

class MyServices extends StatefulWidget {
  const MyServices({
    super.key,
    required this.email
  });
  final String email;

  @override
  State<MyServices> createState() => _MyServicesState();
}

class _MyServicesState extends State<MyServices> {
  @override
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  Widget build(BuildContext context) {
    List<CardServiceLogin> cards =
    [
      CardServiceLogin(
        text: "1st index overloaded",
        color: Colors.white,
        email: widget.email,
      ),
      CardServiceLogin(
        text: "Twitch",
        color: const Color.fromRGBO(156, 64, 255, 1),
        email: widget.email,
      ),
      CardServiceLogin(
        text: "Github",
        color: const Color.fromRGBO(0, 0, 0, 1),
        email: widget.email,
      ),
      CardServiceLogin(
        text: "Linkedin",
        color: const Color.fromRGBO(10, 102, 194, 1),
        email: widget.email,
      ),
      CardServiceLogin(
        text: "Twitter",
        color: const Color.fromRGBO(29, 161, 243, 1),
        email: widget.email,
      ),
      CardServiceLogin(
        text: "Spotify",
        color: const Color.fromRGBO(27, 20, 19, 1),
        email: widget.email,
      ),
      CardServiceLogin(
        text: "Discord",
        color: const Color.fromRGBO(89, 101, 242, 1),
        email: widget.email,
      ),
      CardServiceLogin(
        text: "Google",
        color: const Color.fromRGBO(27, 20, 19, 1),
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
                          "Click to register",
                          textAlign: TextAlign.center,
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