import 'package:flutter/material.dart';
import 'package:mobile/auth_crontoller.dart';

class ButtonRegister extends StatelessWidget {
  const ButtonRegister({
      super.key,
      required this.w,
      required this.h,
      required this.emailController,
      required this.passwordController,
    });
    final double w;
    final double h;
    final TextEditingController emailController;
    final TextEditingController passwordController;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        AuthController.instance.register(emailController.text.trim(), passwordController.text.trim());
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
            "Sign in",
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