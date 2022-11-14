import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:get/get.dart';
import 'package:mobile/auth_crontoller.dart';
import 'package:mobile/pages/header_page.dart';
import 'package:mobile/pages/splash_screen.dart';
import 'globals.dart' as globals;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  Stripe.publishableKey='pk_test_51M457DE7SZok4aIHgk6ef5xcma22HUdR2HsJjnxKnLsF0vLGSQeFrLNPU1TYuIKa7S4Yu29raax5jI8mwPk7W1mH00pSU5Gr1N';
  await Firebase.initializeApp().then((value) => Get.put(AuthController()));
  await Settings.init(cacheProvider: SharePreferenceCache());
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 

    return ValueChangeObserver<bool>(
      cacheKey: Header.keyDarkMode,
      defaultValue: true,
      builder: (_, isDarkMode, __) => GetMaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Flutter Demo',
        home: const SplashScreen(),
        theme: isDarkMode
        ? ThemeData.dark().copyWith(
          primaryColor: const Color.fromARGB(255, 2, 45, 88),
          scaffoldBackgroundColor: const Color.fromARGB(255, 10, 6, 49),
          canvasColor: const Color.fromARGB(255, 10, 6, 49),
        )
        : ThemeData.light().copyWith(
          primaryColor: const Color.fromARGB(255, 229, 65, 0),
          scaffoldBackgroundColor: const Color.fromARGB(255, 255, 255, 255),
          canvasColor: const Color.fromARGB(255, 255, 255, 255),
        )
      ),
    );
  }
}
