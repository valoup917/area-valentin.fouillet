import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../pages/reaction_page.dart';

final Uri _url = Uri.parse('https://flutter.dev');
class CardActionsInput1 extends StatefulWidget {
  const CardActionsInput1({
    Key? key,
    required this.email,
    required this.image,
    required this.text,
    required this.shadowColor,
    required this.textColor,
    required this.route,
    required this.hintText,
  }) : super(key: key);

  final String email;
  final String image;
  final String text;
  final Color shadowColor;
  final Color textColor;
  final String route;
  final String hintText;

  @override
  State<CardActionsInput1> createState() => _CardActionsInput1State();
}

class _CardActionsInput1State extends State<CardActionsInput1> {
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
                widget.image
              ),
              height: 150,
              fit: BoxFit.cover,
              child: InkWell(
                onTap: () {
                  _data_input(context, widget.hintText);
                 
                }
              ),
            ),
            if (widget.text != "back") ...[
              BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                child: Container(
                  alignment: Alignment.center,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 10, right: 10),
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
                Navigator.of(context)
                  .push(MaterialPageRoute(builder: (_) => ReactionPage(email: widget.email, route: widget.route, data: controller.text)));
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