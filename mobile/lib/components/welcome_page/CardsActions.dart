import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../pages/reaction_page.dart';

final Uri _url = Uri.parse('https://flutter.dev');
class CardActions extends StatelessWidget {
  const CardActions({
    Key? key,
    required this.email,
    required this.image,
    required this.text,
    required this.shadowColor,
    required this.textColor,
    required this.route,
  }) : super(key: key);

  final String email;
  final String image;
  final String text;
  final Color shadowColor;
  final Color textColor;
  final String route;

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
        elevation: 25,
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
                  print("add route : [$route]");
                  Navigator.of(context)
                      .push(MaterialPageRoute(builder: (_) => ReactionPage(email: email, route: route, data: "")));
                }
              ),
            ),
            if (text != "back") ...[
              BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                child: Container(
                  alignment: Alignment.center,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 10, right: 10),
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