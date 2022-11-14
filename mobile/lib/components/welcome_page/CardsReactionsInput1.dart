import 'dart:convert';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'dart:io' show Platform;
import 'package:http/http.dart' as http;
import 'package:get/get.dart';
import 'package:mobile/pages/good_page.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../globals.dart' as globals;

import '../../pages/reaction_page.dart';
import '../reactions_list/discord_reactions.dart';

final Uri _url = Uri.parse('https://flutter.dev');
class CardReactionsInput1 extends StatefulWidget {
  const CardReactionsInput1({
    Key? key,
    required this.email,
    required this.image,
    required this.text,
    required this.shadowColor,
    required this.textColor,
    required this.actionRoute,
    required this.actionData,
    required this.reactionRoute,
    required this.hintText,
  }) : super(key: key);

  final String email;
  final String image;
  final String text;
  final Color shadowColor;
  final Color textColor;
  final String actionRoute;
  final String actionData;
  final String reactionRoute;
  final String hintText;

  @override
  State<CardReactionsInput1> createState() => _CardReactionsInput1State();
}

class _CardReactionsInput1State extends State<CardReactionsInput1> {
  late TextEditingController controller;
  @override
  void initState() {
    controller = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    
    return Padding(
      padding: const EdgeInsets.only(
        bottom: 13,
        left: 10,
        right: 10  
      ),
      child: Card(
        color: widget.shadowColor,
        shadowColor: widget.shadowColor,
        elevation: 40,
        clipBehavior: Clip.antiAlias,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
        ),
        child: Stack(
          alignment: Alignment.center,
          children: [
            Ink.image(
              image: AssetImage(
                widget.image
              ),
              height: 150,
              fit: BoxFit.cover,
              child: InkWell(
                onTap: () {
                  if (widget.text == "back") {
                    Navigator.of(context).pop();
                    return;
                  }
                  _data_input(context, widget.hintText);
                }
              ),
            ),
            if (widget.text != "back") ...[
              BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                child: Container(
                  alignment: Alignment.center,
                  child: Text(
                    widget.text,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: widget.textColor,
                      fontSize: 22,
                    ),
                  ),
                ),
              ),
            ]
          ],
        )
      ),
    );
  }

  Future<void> _launchUrl() async {
    if (!await launchUrl(_url)) {
      throw 'Could not launch $_url';
    }
  }

  void _data_input(BuildContext context, String hintTextVariable) {
      showDialog(
      context: context,
      builder: (BuildContext ctx) {
        return AlertDialog(
          actionsAlignment: MainAxisAlignment.center,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          title: const Text('Entré le champ'),
          content: TextField(
            autofocus: true,
            decoration: InputDecoration(
              hintText: hintTextVariable,
            ),
            controller: controller,
          ),
          actions: [
            TextButton(
              onPressed: () {
                // Close the dialog
                Navigator.of(context).pop();
              },
              child: const Text(
                'Non',
                style: TextStyle(
                  color: Colors.red,
                  fontSize: 16
                ),
              )
            ),
            TextButton(
              onPressed: () async {
                Navigator.of(context).pop();
                print("actionRoute : [${widget.actionRoute}]");
                print("actionData : [${widget.actionData}]");
                print("add reactionRoute : [${widget.reactionRoute}]");
                var authority = globals.mainServeurPath;
                Platform.isAndroid ? authority = "10.0.2.2:${globals.mainServeurPort}" : authority = globals.mainServeurPath;
                const path = "/db/ManipulateAreas/newarea";
                final uri =  Uri.http(authority, path);
                print('Ping: $uri');
                http.post(
                  uri,
                  headers: <String, String>{
                    'Content-Type': 'application/json; charset=UTF-8',
                  },
                  body: jsonEncode(<String, String>{
                    'mail': widget.email,
                    'action': widget.actionRoute,
                    'reaction': widget.reactionRoute,
                    'action_data': widget.actionData,
                    'reaction_data': controller.text,
                  }),
                );
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (_) => GoodPage(email: widget.email)));
              },
              child: const Text(
                "Oui",
                style: TextStyle(
                  color: Colors.green,
                  fontSize: 16
                ),
              )
            ),
          ],
        );
      });
    }
}