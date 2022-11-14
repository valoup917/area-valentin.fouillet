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

class GoodPageServices extends StatefulWidget {
  const GoodPageServices({
    super.key,
    required this.email
  });
  final String email;

  @override
  State<GoodPageServices> createState() => _GoodPageServicesState();
}

class _GoodPageServicesState extends State<GoodPageServices> with TickerProviderStateMixin {
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
            "🎉 Authenticated 🎉",
            textAlign: TextAlign.center,
            style: TextStyle(
              letterSpacing: 0,
              color: isDarkMode ? Colors.white : const Color.fromARGB(255, 2, 45, 88),
              fontWeight: FontWeight.bold,
              fontSize: 34,
            ),
          ),
          const SizedBox(height: 15,),
          Text(
            "creation page in $_greeting",
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
        }
      } else {
        setState(() {
          _greeting--;
        });
      }
    });
  }
}