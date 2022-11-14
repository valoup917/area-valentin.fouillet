import 'package:flutter/material.dart';
import 'package:mobile/auth_crontoller.dart';

class SignOutButton extends StatelessWidget {
  const SignOutButton({
    Key? key,
    required this.email,
    required this.w,
    required this.h,
  }) : super(key: key);

  final String email;
  final double w;
  final double h;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        AuthController.instance.logout(email);
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
            "Sign Out",
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}