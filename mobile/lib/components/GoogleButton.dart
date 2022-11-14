import 'package:flutter/material.dart';
import 'package:mobile/auth_crontoller.dart';

class GoogleButton extends StatelessWidget {
  const GoogleButton({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: (){
        AuthController.instance.signInWithGoogle();
      },
      child: const CircleAvatar(
        radius: 30,
        backgroundColor: Color.fromARGB(255, 2, 45, 88),
        child: CircleAvatar(
          radius: 28,
          backgroundColor: Colors.white,
          child: CircleAvatar(
            radius: 22,
            backgroundImage: AssetImage(
              "img/google.jpg"
            ),
          ),
        ),
      ),
    );
  }
}