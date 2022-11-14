import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';


import '../components/InputBoxText.dart';
import '../components/InputHideBoxText.dart';
import '../components/Titles.dart';
import '../components/TopBarAsset.dart';
import '../components/ButtonSignIn.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage>
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
                
                const H1(h1: "Création"),
                SizedBox(height: h * 0.01),
                const H2(h2: "Créer toi un compte"),

                SizedBox(height: h * 0.04),
                InputBoxText(emailController: emailController, textInput: "email"),
                const SizedBox(height: 20),
                InputHideBoxText(passwordController: passwordController),
                const SizedBox(height: 20),
              ],
            ),
          ),
          SizedBox(height: h * 0.04,),
          ButtonRegister(w: w, h: h, emailController: emailController, passwordController: passwordController),
          SizedBox(height: h * 0.04),
          RichText(
            text: TextSpan(
              recognizer: TapGestureRecognizer()..onTap=()=>Get.back(),
              text: "j'ai un déjà un compte",
              style: TextStyle(
                fontSize: 14,
                color: Colors.grey[600]
              ),
            ),
          ),
        ],
      ),
    );
  }
}