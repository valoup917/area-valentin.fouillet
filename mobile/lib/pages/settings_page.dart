import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

import '../components/AppBarStaive.dart';
import '../components/SignOutButton.dart';
import 'account_page.dart';
import 'package:mobile/pages/header_page.dart';
import 'header_page.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
import '../globals.dart' as globals;

class GoodSettingsPage extends StatefulWidget {
  const GoodSettingsPage({
    super.key,
    required this.email
  });
  final String email;

  @override
  State<GoodSettingsPage> createState() => _GoodSettingsPageState();
}

class _GoodSettingsPageState extends State<GoodSettingsPage> {
  
  late TextEditingController controller;
  @override
  void initState() {
    controller = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
    return ValueChangeObserver<bool>(
      cacheKey: Header.keyDarkMode,
      defaultValue: true,
      builder: (_, isDarkMode, __) => Scaffold(
        body: Column(
          children: [
            AppBarStaive(w: w, h: h, showMenu: true,),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.all(24),
                children: [
                  const CircleAvatar(
                    radius: 54,
                    backgroundColor: Color.fromARGB(255, 10, 6, 49),
                    child: CircleAvatar(
                      radius: 50,
                      backgroundImage: AssetImage(
                        "img/v.png"
                      ),
                    ),
                  ),
                  const SizedBox(height: 50,),
                  Center(
                    child: Text(
                        "Hello ${widget.email} !",
                        style: TextStyle(
                          fontSize: 28,
                          color: isDarkMode ? Colors.white : Colors.grey[900]
                        ),
                      ),
                  ),
                  const SizedBox(height: 60,),
                  Header(),
                  const SizedBox(height: 60,),
                  SignOutButton(w: w, h: h, email: widget.email,),
                  const SizedBox(height: 20,),
                  GestureDetector(
                    onTap: () {
                      _data_input(context);
                      
                    },
                    child: Container(
                      height: h * 0.08,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(30),
                        image: const DecorationImage(
                          image: AssetImage(
                            "img/loginbtn2.png"
                          ),
                          fit: BoxFit.cover
                        )
                      ),
                      child: const Center (
                        child: Text(
                          "Network location",
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      )
    );
  }
  void _data_input(BuildContext context) {
      showDialog(
      context: context,
      builder: (BuildContext ctx) {
        return AlertDialog(
          actionsAlignment: MainAxisAlignment.center,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          title: const Text('Entré le champ'),
          content: TextField(
            autofocus: true,
            decoration:  const InputDecoration(
              hintText: "nouveau network",
            ),
            controller: controller,
          ),
          actions: [
            TextButton(
              onPressed: () {
                // Close the dialog
                Navigator.of(context).pop();
              },
              child: const Text(
                'Non',
                style: TextStyle(
                  color: Colors.red,
                  fontSize: 16
                ),
              )
            ),
            TextButton(
              onPressed: () async {
                Navigator.of(context).pop();
                globals.mainServeurPath = controller.text;
                if (controller.text.contains(':')) {
                  String newport = controller.text.substring(controller.text.indexOf(':'));
                  globals.mainServeurPort = newport;
                }
              },
              child: const Text(
                "Oui",
                style: TextStyle(
                  color: Colors.green,
                  fontSize: 16
                ),
              )
            ),
          ],
        );
      });
    }
}