import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput1.dart';
import 'package:mobile/pages/hidden_drawer.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsReactions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
class DiscordReactions extends StatefulWidget {
  const DiscordReactions({
    super.key,
    required this.email,
    required this.actionRoute,
    required this.actionData,
  });
  final String email;
  final String actionRoute;
  final String actionData;

  @override
  State<DiscordReactions> createState() => _DiscordReactionsState();
}

class _DiscordReactionsState extends State<DiscordReactions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<Widget> cards =
      [
        CardReactions(
          image: "img/discord.png",
          text: "Envoyer un meme random",
          textColor: const Color.fromARGB(255, 10, 6, 49),
          shadowColor: const Color.fromRGBO(89, 101, 242, 1),
          email: widget.email,
          reactionRoute: "http://discord:9010/Discord/sendrandommeme",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
        ),
        CardReactions(
          image: "img/discord.png",
          text: "Envoyer un random gif",
          shadowColor: const Color.fromRGBO(89, 101, 242, 1),
          textColor: const Color.fromARGB(255, 10, 6, 49),
          email: widget.email,
          reactionRoute: "http://discord:9010/Discord/sendrandomgif",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
        ),
        CardReactionsInput1(
          image: "img/discord.png",
          text: "Envoyer un message sur un chanel random",
          shadowColor: const Color.fromRGBO(89, 101, 242, 1),
          textColor: const Color.fromARGB(255, 10, 6, 49),
          email: widget.email,
          reactionRoute: "http://discord:9010/Discord/message",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "message"
        ),
        CardReactions(
          email: widget.email,
          image:  isDarkMode ? "img/back_dark.png" : "img/back_clear.png",
          text: "back",
          textColor: const Color.fromARGB(255, 10, 6, 49),
          shadowColor: const Color.fromRGBO(89, 101, 242, 1),
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