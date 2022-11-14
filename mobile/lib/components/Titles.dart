import 'package:flutter/material.dart';

class H1 extends StatelessWidget {
  const H1({
    Key? key,
    required this.h1,
  }) : super(key: key);

  final String h1;

  @override
  Widget build(BuildContext context) {
    double h = MediaQuery.of(context).size.height;
    return Text(
      h1,
      style: TextStyle(
        fontSize: h * 0.06,
        color: Colors.black,
        fontWeight: FontWeight.bold
      ),
    );
  }
}

class H2 extends StatelessWidget {
  const H2({
    Key? key,
    required this.h2
  }) : super(key: key);
  
  final String h2;

  @override
  Widget build(BuildContext context) {
    return Text(
      h2,
      style: TextStyle(
        fontSize: 18,
        color: Colors.grey[600]
      ),
    );
  }
}