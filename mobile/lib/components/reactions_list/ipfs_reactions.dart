import 'package:flutter/material.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput1.dart';
import 'package:mobile/components/welcome_page/CardsReactionsInput2.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

import '../welcome_page/CardsReactions.dart';
class IpfsReactions extends StatefulWidget {
  const IpfsReactions({
    super.key,
    required this.email,
    required this.actionRoute,
    required this.actionData,
  });
  final String email;
  final String actionRoute;
  final String actionData;
  @override
  State<IpfsReactions> createState() => _IpfsReactionsState();
}

class _IpfsReactionsState extends State<IpfsReactions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<Widget> cards =
      [
        CardReactionsInput1(
          email: widget.email,
          image: "img/ipfs.png",
          text: "Pin un fichier",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: const Color.fromARGB(255, 4, 7, 100),
          reactionRoute: "http://ipfs:9030/ipfs/pinadd",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "CID du fichier"
        ),
        CardReactionsInput1(
          email: widget.email,
          image: "img/ipfs.png",
          text: "Ajout une boostrap node",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: const Color.fromARGB(255, 4, 7, 100),
          reactionRoute: "http://ipfs:9030/ipfs/bootstrapadd",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "multi adresse du boostrap"
        ),
        CardReactions(
          email: widget.email,
          image: "img/ipfs.png",
          text: "Ajout une boostrap node par default",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: const Color.fromARGB(255, 4, 7, 100),
          reactionRoute: "http://ipfs:9030/ipfs/bootstrapadddefault",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
        ),
        CardReactions(
          email: widget.email,
          image: "img/ipfs.png",
          text: "Supprime tout les boostrap nodes",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: const Color.fromARGB(255, 4, 7, 100),
          reactionRoute: "http://ipfs:9030/ipfs/bootstraprmall",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
        ),
        CardReactionsInput1(
          email: widget.email,
          image: "img/ipfs.png",
          text: "Créer un dossier dans MFS",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: const Color.fromARGB(255, 4, 7, 100),
          reactionRoute: "http://ipfs:9030/ipfs/filesmkdir",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "nom du directory"
        ),
        CardReactionsInput1(
          email: widget.email,
          image: "img/ipfs.png",
          text: "Supprime un fichier pin",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: const Color.fromARGB(255, 4, 7, 100),
          reactionRoute: "http://ipfs:9030/ipfs/pinrm",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "CID du fichier"
        ),
        CardReactionsInput1(
          email: widget.email,
          image: "img/ipfs.png",
          text: "Telecharger un fichier sur le reseau",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: const Color.fromARGB(255, 4, 7, 100),
          reactionRoute: "http://ipfs:9030/ipfs/get",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "CID du fichier"
        ),
        CardReactionsInput1(
          email: widget.email,
          image: "img/ipfs.png",
          text: "Se connecter à un nouveau peer",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: const Color.fromARGB(255, 4, 7, 100),
          reactionRoute: "http://ipfs:9030/ipfs/swarmconnect",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "multiadresse du peer"
        ),
        CardReactionsInput1(
          email: widget.email,
          image: "img/ipfs.png",
          text: "Se déconnecter d'un peer",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: const Color.fromARGB(255, 4, 7, 100),
          reactionRoute: "http://ipfs:9030/ipfs/swarmdisconnect",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
          hintText: "multiadresse du peer"
        ),
        CardReactions(
          email: widget.email,
          image: "img/ipfs.png",
          text: "Déconnecter son noeud",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: const Color.fromARGB(255, 4, 7, 100),
          reactionRoute: "http://ipfs:9030/ipfs/shutdown",
          actionRoute: widget.actionRoute,
          actionData: widget.actionData,
        ),
        CardReactions(
          email: widget.email,
          image:  isDarkMode ? "img/back_dark.png" : "img/back_clear.png",
          text: "back",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          textColor: const Color.fromARGB(255, 4, 7, 100),
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