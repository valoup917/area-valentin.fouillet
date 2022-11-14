import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

import '../components/AppBarStaive.dart';
import '../components/SignOutButton.dart';
import 'account_page.dart';
import 'package:mobile/pages/header_page.dart';
import 'header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

class UsPage extends StatefulWidget {
  const UsPage({
    super.key,
    required this.email
  });
  final String email;

  @override
  State<UsPage> createState() => _UsPageState();
}

class _UsPageState extends State<UsPage> {
  @override
  Widget build(BuildContext context) {
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
    return ValueChangeObserver<bool>(
      cacheKey: Header.keyDarkMode,
      defaultValue: true,
      builder: (_, isDarkMode, __) => Scaffold(
        body: Column(
          children: [
            AppBarStaive(w: w, h: h, showMenu: true,),
            Text(
              "Who Are We ?",
              style: TextStyle(
                fontSize: 40,
                letterSpacing: 0,
                fontWeight: FontWeight.bold,
                shadows: [ 
                  Shadow(
                    offset: const Offset(2, 2),
                    blurRadius: 2.0,
                    color: isDarkMode ? const Color.fromARGB(255, 149, 149, 149) : const Color.fromARGB(110, 2, 45, 88), //color of shadow with opacity
                  ),
                ]
              ),
            ),
            SizedBox(height: h * 0.03),
            Card(
              shadowColor: isDarkMode ? Colors.white : const Color.fromARGB(255, 2, 45, 88),
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
                      isDarkMode ? "img/staive_menu_appbar.png" : "img/staive_dark_menu_appbar.png"
                    ),
                    height: 150,
                    fit: BoxFit.cover,
                    child: InkWell(
                      onTap: () {
                      }
                    ),
                  ),                  
                ],
              )
            ),
            SizedBox(height: h * 0.03),
            Stack(
              children: [
                Padding(
                  padding: EdgeInsets.only(top: h * 0.216),
                  child: Container(
                    width: w,
                    height: h * 0.24,
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage(
                          isDarkMode ? "img/staive_dark_bottom_bar2.png" : "img/staive_bottom_bar2.png"
                        ),
                        fit: BoxFit.cover
                      )
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 20, right: 20),
                  child: Text(
                    textAlign: TextAlign.center,
                    "A group of five friends was at the party and they use social networks to share their experience to that party\nBut the problem is that we have a lot of different social networks like Twitter, Youtube, Instagram etc...👨🏻‍💻. An idea was born, why we can't automates this process ? After the party we thinked about this idea and we decided to create the first platform to automates some boring process for everyone who wants to gain some time",
                    style: TextStyle(
                      fontSize: h * 0.022,
                      letterSpacing: 1,
                    ),
                  ),
                ),
              ],
            )
          ]
        ),
      )
    );
  }
}