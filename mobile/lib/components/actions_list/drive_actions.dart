import 'package:flutter/material.dart';
import 'package:mobile/components/welcome_page/CardsActionsInput1.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
class DriveActions extends StatefulWidget {
  const DriveActions({
    super.key,
    required this.email,
  });
  final String email;

  @override
  State<DriveActions> createState() => _DriveActionsState();
}

class _DriveActionsState extends State<DriveActions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<Widget> cards =
      [
        CardActions(
          email: widget.email,
          image: "img/drive.png",
          text: "Nouveau fichier dans ton drive",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://google:9115/google/drive/listFiles",
          textColor: Colors.black,
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/drive.png",
          text: "Nouveau commentaire dans un de tes fichier drive",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "http://google:9115/google/drive/listComment",
          textColor: Colors.black,
          hintText: "nom du fichier",
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