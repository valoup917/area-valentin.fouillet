import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import '../components/AppBarStaive.dart';
import '../components/welcome_page/CardsServicesActions.dart';
import '../components/welcome_page/CardsServicesReactions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

class ReactionPage extends StatefulWidget {
  const ReactionPage({
    super.key,
    required this.email,
    required this.route,
    required this.data
  });
  final String email;
  final String route;
  final String data;

  @override
  State<ReactionPage> createState() => _ReactionPageState();
}
class _ReactionPageState extends State<ReactionPage> {
  @override
  void initState() {
    print(widget.data);
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 

    List<CardServicesReactions> cards =
    [
      CardServicesReactions(
        text: "1st index overloaded",
        color: Colors.white,
        email: widget.email, actionRoute: widget.route, actionData: widget.data,
      ),
      CardServicesReactions(
        text: "Discord",
        color: const Color.fromRGBO(89, 101, 242, 1),
        email: widget.email, actionRoute: widget.route, actionData: widget.data,
      ),
      CardServicesReactions(
        text: "Calendar",
        color: const Color.fromRGBO(0, 0, 0, 1),
        email: widget.email, actionRoute: widget.route, actionData: widget.data,
      ),
      CardServicesReactions(
        text: "Ipfs",
        color: const Color.fromRGBO(212, 212, 212, 1),
        email: widget.email, actionRoute: widget.route, actionData: widget.data,
      ),
      CardServicesReactions(
        text: "Gmail",
        color: const Color.fromRGBO(0, 0, 0, 1),
        email: widget.email, actionRoute: widget.route, actionData: widget.data,
      ),
      CardServicesReactions(
        text: "Twitch",
        color: const Color.fromRGBO(156, 64, 255, 1),
        email: widget.email, actionRoute: widget.route, actionData: widget.data,
      ),
      CardServicesReactions( 
        text: "Github",
        color: const Color.fromRGBO(0, 0, 0, 1),
        email: widget.email, actionRoute: widget.route, actionData: widget.data,
      ),
      CardServicesReactions(
        text: "Drive",
        color: const Color.fromRGBO(0, 0, 0, 1),
        email: widget.email, actionRoute: widget.route, actionData: widget.data,
      ),
      CardServicesReactions(
        text: "Twitter",
        color: const Color.fromRGBO(29, 161, 243, 1),
        email: widget.email, actionRoute: widget.route, actionData: widget.data,
      ),
      CardServicesReactions(
        text: "Spotify",
        color: const Color.fromRGBO(27, 20, 19, 1),
        email: widget.email, actionRoute: widget.route, actionData: widget.data,
      ),
      CardServicesReactions(
        text: "Linkedin",
        color: const Color.fromRGBO(10, 102, 194, 1),
        email: widget.email, actionRoute: widget.route, actionData: widget.data,
      ),
      CardServicesReactions(
        text: isDarkMode ? "back_dark" : "back_clear",
        color: Colors.white,
        email: widget.email, actionRoute: widget.route, actionData: widget.data,
      ),
    ];
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    return  ValueChangeObserver<bool>(
      cacheKey: Header.keyDarkMode,
      defaultValue: true,
      builder: (_, isDarkMode, __) => Scaffold(
        body:  Column(
          children: [
            AppBarStaive(w: w, h: h, showMenu: false),
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
                          "Choose a reaction",
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
      )
    );
  }
}