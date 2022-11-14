import 'package:flutter/material.dart';

import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
class ErrorService extends StatefulWidget {
  const ErrorService({
    super.key,
    required this.email,
  });
  final String email;

  @override
  State<ErrorService> createState() => _ErrorServiceState();
}

class _ErrorServiceState extends State<ErrorService> {
  @override
  Widget build(BuildContext context) {
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    return Scaffold(
      body:  Column(
        children: const [
          Text(
            "ERROR",
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.red,
              fontSize: 50,
              fontWeight: FontWeight.w700,
            ),  
          ),
        ],
      ),
    );
  }
}