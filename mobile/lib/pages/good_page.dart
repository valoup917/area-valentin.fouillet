import 'dart:async';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
import 'package:get/get.dart';
import 'package:lottie/lottie.dart';
import 'package:mobile/components/Titles.dart';
import 'package:mobile/pages/header_page.dart';

import '../components/AppBarStaive.dart';
import '../components/welcome_page/CardsServicesActions.dart';
import 'action_page.dart';
import 'myAreas_page.dart';

class GoodPage extends StatefulWidget {
  const GoodPage({
    super.key,
    required this.email
  });
  final String email;

  @override
  State<GoodPage> createState() => _GoodPageState();
}

class _GoodPageState extends State<GoodPage> with TickerProviderStateMixin {
  late AnimationController _confettiController;

  @override
  void initState() {
    super.initState();
    _confettiController = AnimationController(vsync: this);

    _startCountDown();
  }
  
  int _greeting = 5;

  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  @override
  Widget build(BuildContext context) {
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    return ValueChangeObserver<bool>(
      cacheKey: Header.keyDarkMode,
      defaultValue: true,
      builder: (_, isDarkMode, __) => Scaffold(
      body:  Column(
        children: [
          AppBarStaive(w: w, h: h, showMenu: false,),
          Text(
            "🎉 Area registered 🎉",
            style: TextStyle(
              letterSpacing: 0,
              color: isDarkMode ? Colors.white : const Color.fromARGB(255, 2, 45, 88),
              fontWeight: FontWeight.bold,
              fontSize: 34,
            ),
          ),
          const SizedBox(height: 15,),
          Text(
            "home page in $_greeting",
            style: TextStyle(
              fontWeight: FontWeight.w500,
              color: isDarkMode ? Colors.white : const Color.fromARGB(255, 14, 63, 111),
              fontSize: 22,
            ),
          ),
          Stack(
            children: [
              Padding(
                padding: EdgeInsets.only(top: h * 0.5),
                child: Center(
                  child: GestureDetector(
                    onTap: () {
                      Navigator.of(context).pop();
                      Navigator.of(context).pop();
                      Navigator.of(context).pop();
                      Navigator.of(context).pop();
                    },
                    child: Container(
                      width: w * 0.5,
                      height: h * 0.08,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(30),
                        image: const DecorationImage(
                          image: AssetImage(
                            "img/loginbtn3.png"
                          ),
                          fit: BoxFit.cover
                        )
                      ),
                      child: const Center (
                        child: Text(
                          "Home",
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              Lottie.asset(
                "animations/confetti.json",
              ),
            ]
          ),
        ],
      ),
    ),
    );
  }
  void _startCountDown() {
    Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_greeting <= 0) {
        if (mounted) {
          Navigator.of(context).pop();
          Navigator.of(context).pop();
          Navigator.of(context).pop();
          Navigator.of(context).pop();
        }
        //Navigator.of(context)
        //  .push(MaterialPageRoute(builder: (_) =>  MyAreas(email: widget.email,)));
      } else {
        setState(() {
          _greeting--;
        });
      }
    });
  }
}