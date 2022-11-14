import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../pages/reaction_page.dart';

class CardActionsInput2 extends StatefulWidget {
  const CardActionsInput2({
    Key? key,
    required this.email,
    required this.image,
    required this.text,
    required this.shadowColor,
    required this.textColor,
    required this.route,
    required this.hintText1,
    required this.hintText2,
  }) : super(key: key);

  final String email;
  final String image;
  final String text;
  final Color shadowColor;
  final Color textColor;
  final String route;
  final String hintText1;
  final String hintText2;

  @override
  State<CardActionsInput2> createState() => _CardActionsInput2State();
}

class _CardActionsInput2State extends State<CardActionsInput2> {
  late TextEditingController controller1;
  late TextEditingController controller2;
  @override
  void initState() {
    controller1 = TextEditingController();
    controller2 = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    controller1.dispose();
    controller2.dispose();
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
                  _data_input(context, widget.hintText1, widget.hintText2);
                 
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

  void _data_input(BuildContext context, String hintTextVariable1, String hintTextVariable2) {
      showDialog(
      context: context,
      builder: (BuildContext ctx) {
        return AlertDialog(
          actionsAlignment: MainAxisAlignment.center,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          title: const Text('Entré le champ'),
          content: Column(
            children: [
              TextField(
                autofocus: true,
                decoration: InputDecoration(
                  hintText: hintTextVariable1,
                ),
                controller: controller1,
              ),
              TextField(
                autofocus: false,
                decoration: InputDecoration(
                  hintText: hintTextVariable2,
                ),
                controller: controller2,
              ),
            ],
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
                  .push(MaterialPageRoute(builder: (_) => ReactionPage(email: widget.email, route: widget.route, data: '${controller1.text},${controller2.text}')));
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