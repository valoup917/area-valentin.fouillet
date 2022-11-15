import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
import 'package:mobile/components/welcome_page/CardStaive+.dart';

import '../components/AppBarStaive.dart';
import '../components/SignOutButton.dart';
import 'account_page.dart';
import 'package:mobile/pages/header_page.dart';
import 'header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

class StaivePlusPage extends StatefulWidget {
  const StaivePlusPage({
    super.key,
    required this.email
  });
  final String email;

  @override
  State<StaivePlusPage> createState() => _StaivePlusPageState();
}

class _StaivePlusPageState extends State<StaivePlusPage> {

  @override
  Widget build(BuildContext context) {

    List<CardStaivePlus> cards =
    [
      CardStaivePlus(
        text: "1st index overloaded",
        price: 0,
        arguments: const [],
        shadowColor: Colors.white,
        textColor: Colors.white,
        email: widget.email,
      ),
      CardStaivePlus(
        text: "Staiv +",
        price: 5,
        arguments: const ["50 AREAS", "10 secondes de latence", "Backup serveur"],
        shadowColor: const Color.fromARGB(255, 240, 138, 29),
        textColor: Colors.white,
        email: widget.email,
      ),
      CardStaivePlus(
        text: "Staiv Pro +",
        price: 12,
        arguments: const ["300 AREAS", "3 secondes de latence", "Notifications","Backup serveur"],
        shadowColor:const Color.fromARGB(255, 16, 4, 87),
        textColor: Colors.white,
        email: widget.email,
      ),
    ];

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
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.only(bottom: 25, top: 0),
                itemCount: cards.length,
                shrinkWrap: false,
                itemBuilder: (BuildContext context, int index) {
                  if(index == 0) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 10.0),
                      child: Center(
                        child: Text(
                          "Staive +",
                          style: TextStyle(
                            fontSize: 70,
                            letterSpacing: 0,
                            color: isDarkMode ? Colors.white : const Color.fromARGB(255, 2, 45, 88),
                            fontWeight: FontWeight.bold,
                            shadows: [ 
                              Shadow(
                                offset: const Offset(2, 2),
                                blurRadius: 2.0,
                                color: isDarkMode ? const Color.fromARGB(255, 149, 149, 149) : const Color.fromARGB(130, 2, 45, 88), //color of shadow with opacity
                              ),
                            ]
                          ),
                        ),
                      )
                    );
                  } else {
                    return Column(
                      children: [cards[index]]
                    );
                  }
                }
              ),
            ),

          ],
        ),
      )
    );
  }
}