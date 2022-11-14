import 'dart:ui';

import 'package:flutter/material.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
class CardRegistryService extends StatelessWidget {
  const CardRegistryService({
    super.key,
    required this.email,
    required this.service,
    required this.area,
    required this.textColor,
    required this.shadowColor,
  });
  final String email;
  final String service;
  final String area;
  final Color textColor;
  final Color shadowColor;

  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    return Padding(
      padding: const EdgeInsets.only(
        bottom: 1,
        top: 13,
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
                "img/${service.toLowerCase()}.png"
              ),
              height: 120,
              fit: BoxFit.cover,
              child: InkWell(
                onTap: () {
                }
              ),
            ),           
            BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
              child: Container(
                alignment: Alignment.center,
                child: Padding(
                  padding: const EdgeInsets.only(left: 3, right: 3),
                  child: ListTile(
                    title: Padding(
                      padding: const EdgeInsets.only(top : 30),
                      child: Text(
                        service,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: textColor,
                          fontSize: 24,
                        ),
                      ),
                    ),
                    subtitle: Padding(
                      padding: const EdgeInsets.only(top: 10.0),
                      child: Text(
                        area,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: textColor,
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          
          ],
        )
      ),
    );
  }
}