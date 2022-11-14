import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
import 'package:hidden_drawer_menu/controllers/simple_hidden_drawer_controller.dart';

import '../pages/header_page.dart';

class AppBarStaive extends StatelessWidget {
  const AppBarStaive({
      super.key,
      required this.w,
      required this.h,
      required this.showMenu,
    });

  final double w;
  final double h;
  final bool showMenu;

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 

    return ValueChangeObserver<bool>(
      cacheKey: Header.keyDarkMode,
      defaultValue: true,
      builder: (_, isDarkMode, __) => Stack(
        children: [
          Container(
            width: w,
            height: h * 0.23,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage(
                  isDarkMode ? "img/staive_dark_menu_appbar.png" : "img/staive_menu_appbar.png"
                ),
                fit: BoxFit.cover
              )
            ),
          ),
          if (showMenu == true) ...[
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 130,
                  width: w * 0.2,
                  child: IconButton(
                    iconSize: 30,
                    icon: const Icon(Icons.menu),
                    color: Colors.black,
                    onPressed: () {
                      print("PRESSED HIDDEN DRAWER");
                      //Scaffold.of(context).openDrawer();
                      SimpleHiddenDrawerController.of(context).open();
                    },
                  ),
                ),
              ],
            ),
          ]
        ],
      ),
    );
  }
}