import 'package:flutter/material.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput1.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput2.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

import '../welcome_page/CardsReactions.dart';
class SpotifyReactions extends StatefulWidget {
  const SpotifyReactions({
    super.key,
    required this.email,
    required this.actionRoute,
    required this.actionData,
  });
  final String email;
  final String actionRoute;
  final String actionData;
  @override
  State<SpotifyReactions> createState() => _SpotifyReactionsState();
}

class _SpotifyReactionsState extends State<SpotifyReactions> {
  @override
  Widget build(BuildContext context) {
    final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
    List<Widget> cards =
    [
      CardReactionsInput1(
        email: widget.email,
        image: "img/spotify.png",
        text: "Follow cette nouvelle playlist",
        shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          textColor: const Color.fromARGB(255, 255, 255, 255),
        reactionRoute: "http://spotify:9125/spotify/followPlaylist",
        actionRoute: widget.actionRoute,
        actionData: widget.actionData,
        hintText: "url de la playlist"
      ),
      CardReactions(
        email: widget.email,
        image: "img/spotify.png",
        text: "Mettre sur pause la musique",
        shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          textColor: const Color.fromARGB(255, 255, 255, 255),
        reactionRoute: "http://spotify:9125/spotify/pausePlayback",
        actionRoute: widget.actionRoute,
        actionData: widget.actionData
      ),
      CardReactions(
        email: widget.email,
        image: "img/spotify.png",
        text: "Reprendre la musique",
        shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          textColor: const Color.fromARGB(255, 255, 255, 255),
        reactionRoute: "http://spotify:9125/spotify/resumePlayback",
        actionRoute: widget.actionRoute,
        actionData: widget.actionData
      ),
      CardReactions(
        email: widget.email,
        image: "img/spotify.png",
        text: "Mettre la prochaine musique",
        shadowColor: const Color.fromRGBO(0, 0, 0, 1),
        textColor: const Color.fromARGB(255, 255, 255, 255),
        reactionRoute: "http://spotify:9125/spotify/skipToNext",
        actionRoute: widget.actionRoute,
        actionData: widget.actionData
      ),
      CardReactions(
        email: widget.email,
        image: "img/spotify.png",
        text: "Mettre la musique précédente",
        shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          textColor: const Color.fromARGB(255, 255, 255, 255),
        reactionRoute: "http://spotify:9125/spotify/skipToPrevious",
        actionRoute: widget.actionRoute,
        actionData: widget.actionData
      ),
      CardReactionsInput1(
        email: widget.email,
        image: "img/spotify.png",
        text: "Regler le volume de la musique",
        shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          textColor: const Color.fromARGB(255, 255, 255, 255),
        reactionRoute: "http://spotify:9125/spotify/setPlaybackVolume",
        actionRoute: widget.actionRoute,
        actionData: widget.actionData,
        hintText: "% du volume de la musique"
      ),
      CardReactions(
        email: widget.email,
        image:  isDarkMode ? "img/back_dark.png" : "img/back_clear.png",
        text: "back",
        shadowColor: const Color.fromRGBO(0, 0, 0, 1),
          textColor: const Color.fromARGB(255, 255, 255, 255),
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