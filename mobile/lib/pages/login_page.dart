import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/pages/signup_page.dart';

import '../components/ButtonLogIn.dart';
import '../components/GoogleButton.dart';
import '../components/InputBoxText.dart';
import '../components/InputHideBoxText.dart';
import '../components/Titles.dart';
import '../components/TopBarAsset.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  var emailController = TextEditingController();
  var passwordController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;

    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
      body: Column(
        children: [
          TopBarAsset(image: "img/topStaiveImage.png", w: w, h: h),
          Container(
            margin: EdgeInsets.only(left: w * 0.1, right: w * 0.1),
            width: w,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                
                const H1(h1: "Connection"),
                SizedBox(height: h * 0.01),
                const H2(h2: "Connectes toi à ton compte"),
          
                SizedBox(height: h * 0.03),
                InputBoxText(emailController: emailController, textInput: "email"),
                const SizedBox(height: 20),
                InputHideBoxText(passwordController: passwordController),
                const SizedBox(height: 20),
                
              ],
            ),
          ),
          SizedBox(height: h * 0.03,),
          ButtonLogin(w: w, h: h, emailController: emailController, passwordController: passwordController),
          SizedBox(height: h * 0.02),
          RichText(
            text: TextSpan(
              text: "Je n'ai pas de compte:",
              style: TextStyle(
                color: Colors.grey[600],
                fontSize: 14,
              ),
            children: [
              TextSpan(
              text: " Créer",
              style: const TextStyle(
                color: Colors.black,
                fontSize: 14,
                fontWeight: FontWeight.bold,
              ),
              recognizer: TapGestureRecognizer()..onTap=()=>Get.to(()=>const SignUpPage()) 
            ),
            ]
            ),
          ),
          SizedBox(height: h * 0.02),
          const GoogleButton(),
        ],
      ),
    );
  }
}