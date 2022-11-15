import 'dart:convert';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:mobile/pages/hidden_drawer.dart';
import 'package:mobile/pages/login_page.dart';
import 'package:http/http.dart' as http;
import 'dart:io' show Platform;
import 'globals.dart' as globals;

class AuthController extends GetxController{
  static AuthController instance = Get.find();
  //AuthController.instance...
  late Rx<User?> _user;
  FirebaseAuth auth = FirebaseAuth.instance;

  @override
  void onReady() {
    super.onReady();
    _user = Rx<User?>(auth.currentUser);
    _user.bindStream(auth.userChanges()); 
    ever(_user, _initialScreens);
  }

  _initialScreens(User? user) async {
    if (user == null) {
      print("login page");
      Get.offAll(()=> const LoginPage());
    } else {
      Get.offAll(()=> HiddenDrawer(email:user.email!));
    }
  }

  void register(String email, password) async {
    try {
      await auth.createUserWithEmailAndPassword(email: email, password: password);

      print(email);
      print(password);

      //done only if no exception raised
      var authority = globals.mainServeurPath;
      Platform.isAndroid ? authority = "10.0.2.2:${globals.mainServeurPort}" : authority = globals.mainServeurPath;
      const path = "/db/ManipulateLogin/newlogin";
      final uri =  Uri.http(authority, path);
      var response = await http.post(
        uri,
        headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'mail': email,
          'password': password
        }),
      );
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      const path2 = "/storage/store";
      final uri2 =  Uri.http(authority, path2);

      var response2 = await http.post(
        uri2,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'mail': email
        }),
      );

      print('Response status: ${response2.statusCode}');
      print('Response body: ${response2.body}');

    } catch(e) {
      Get.snackbar("About User",  "User message",
      backgroundColor: Colors.redAccent,
      snackPosition: SnackPosition.BOTTOM,
      titleText: const Text(
        "Account creation failed",
        style: TextStyle(
          color: Colors.white
        ),
      ),
      messageText: Text(
        e.toString(),
        style:const TextStyle(
          color: Colors.white
        ),
      )
      );
    }
  }

  void login(String email, password) async {
    try {
      await auth.signInWithEmailAndPassword(email: email, password: password);
      var authority = globals.mainServeurPath;
      Platform.isAndroid ? authority = "10.0.2.2:${globals.mainServeurPort}" : authority = globals.mainServeurPath;
      const path = "/db/ManipulateLogin/switchedLogin";
      final uri =  Uri.http(authority, path);
      
      var response = await http.post(
        uri,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'mail': email,
          'state': "true"
        }),
      );
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
      
      const path2 = "/storage/store";
      final uri2 =  Uri.http(authority, path2);

      print("ping to $uri2");

      var response2 = await http.post(
        uri2,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'mail': email
        }),
      );

      print('Response status: ${response2.statusCode}');
      print('Response body: ${response2.body}');

    } catch(e) {
      print(e);
      Get.snackbar("About Login",  "Login message",
      backgroundColor: Colors.redAccent,
      snackPosition: SnackPosition.BOTTOM,
      titleText: const Text(
        "Login failed",
        style: TextStyle(
          color: Colors.white
        ),
      ),
      messageText: Text(
        e.toString(),
        style:const TextStyle(
          color: Colors.white
        ),
      )
      );
    }
  }

  void logout(String email) async {
    await auth.signOut();
    signOut(email);
  }

  signInWithGoogle() async {
    final GoogleSignInAccount? googleUser = await GoogleSignIn(
      scopes: <String>["email"]).signIn();

    final GoogleSignInAuthentication googleAuth = await googleUser!.authentication;

    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );

    return await FirebaseAuth.instance.signInWithCredential(credential);
    
  }

  signOut(String email) async {
    FirebaseAuth.instance.signOut();
    var authority = globals.mainServeurPath;
    Platform.isAndroid ? authority = "10.0.2.2:${globals.mainServeurPort}" : authority = globals.mainServeurPath;
    const path = "/db/ManipulateLogin/switchedLogin";
    final uri =  Uri.http(authority, path);
    var response = await http.post(
      uri,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'mail': email,
        'state': "false"
      }),
    );
    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');
  }
}