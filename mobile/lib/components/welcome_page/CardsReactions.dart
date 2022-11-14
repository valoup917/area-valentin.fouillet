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
class CardReactions extends StatelessWidget {
  const CardReactions({
    Key? key,
    required this.email,
    required this.image,
    required this.text,
    required this.textColor,
    required this.shadowColor,
    required this.actionRoute,
    required this.actionData,
    required this.reactionRoute,
  }) : super(key: key);

  final String email;
  final String image;
  final String text;
  final Color textColor;
  final Color shadowColor;
  final String actionRoute;
  final String actionData;
  final String reactionRoute;

  @override
  Widget build(BuildContext context) {
    
    return Padding(
      padding: const EdgeInsets.only(
        bottom: 13,
        left: 10,
        right: 10  
      ),
      child: Card(
        color: shadowColor,
        shadowColor: shadowColor,
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
                image
              ),
              height: 150,
              fit: BoxFit.cover,
              child: InkWell(
                onTap: () {
                  if (text == "back") {
                    Navigator.of(context).pop();
                    return;
                  }
                  print("actionRoute : [$actionRoute]");
                  print("actionData : [$actionData]");
                  print("add reactionRoute : [$reactionRoute]");
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
                      'mail': email,
                      'action': actionRoute,
                      'reaction': reactionRoute,
                      'action_data': actionData,
                      'reaction_data': "",
                    }),
                  );
                  Navigator.of(context)
                      .push(MaterialPageRoute(builder: (_) => GoodPage(email: email)));
                }
              ),
            ),
            if (text != "back") ...[
              BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                child: Container(
                  alignment: Alignment.center,
                  child: Text(
                    text,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: textColor,
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
}