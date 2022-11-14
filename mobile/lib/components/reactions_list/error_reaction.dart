import 'package:flutter/material.dart';

import '../AppBarStaive.dart';

class ErrorReactions extends StatefulWidget {
  const ErrorReactions({
    super.key,
    required this.email,
  });
  final String email;

  @override
  State<ErrorReactions> createState() => _ErrorReactionsState();
}

class _ErrorReactionsState extends State<ErrorReactions> {
  @override
  Widget build(BuildContext context) {
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    return Scaffold(
      body:  Column(
        children: [
          AppBarStaive(w: w, h: h, showMenu: false),
          const Text(
            "ERROR",
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.red,
              fontSize: 50,
              fontWeight: FontWeight.w700,
            ),  
          ),
          const SizedBox(height: 140,),
          const Padding(
            padding: EdgeInsets.all(10.0),
            child: Text(
              "Reactions page of this service not implemented yet",
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.red,
                fontSize: 22,
                fontWeight: FontWeight.w500,
              ),  
            ),
          ),
          const SizedBox(height: 170,),
          GestureDetector(
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
                  "home",
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}