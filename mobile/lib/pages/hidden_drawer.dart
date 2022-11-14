import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
import 'package:hidden_drawer_menu/hidden_drawer_menu.dart';
import 'package:mobile/pages/myAreas_page.dart';
import 'package:mobile/pages/myServices_page.dart';
import 'package:mobile/pages/settings_page.dart';
import 'package:mobile/pages/action_page.dart';
import 'package:mobile/pages/staive+_page.dart';
import 'package:mobile/pages/us_page.dart';

import 'header_page.dart';

class HiddenDrawer extends StatefulWidget {
  const HiddenDrawer({
      super.key,
      required this.email,
    });

  final String email;

  @override
  State<HiddenDrawer> createState() => _HiddenDrawerState();
}

class _HiddenDrawerState extends State<HiddenDrawer> {

  List<ScreenHiddenDrawer> _pages = [];

  final myTextStyle = TextStyle(
    fontWeight: FontWeight.bold,
    fontSize: 20,
    color: Colors.grey.shade300,
  );

  final mySelectedTextStyle = const TextStyle(
    fontWeight: FontWeight.bold,
    fontSize: 24,
    color: Colors.white,
  );
  
  @override
  void initState() {
    super.initState();

    _pages = [
      ScreenHiddenDrawer(
        ItemHiddenMenu(
          name: "Home Page",
          baseStyle: myTextStyle,
          selectedStyle: mySelectedTextStyle,
          colorLineSelected: Colors.white
        ),
        UsPage(email: widget.email)
      ),
      ScreenHiddenDrawer(
        ItemHiddenMenu(
          name: "Création",
          baseStyle: myTextStyle,
          selectedStyle: mySelectedTextStyle,
          colorLineSelected: Colors.white
        ),
        ActionPage(email: widget.email,)
      ),
      ScreenHiddenDrawer(
        ItemHiddenMenu(
          name: "My Areas",
          baseStyle: myTextStyle,
          selectedStyle: mySelectedTextStyle,
          colorLineSelected: Colors.white
        ),
        MyAreas(email: widget.email,)
      ),
      ScreenHiddenDrawer(
        ItemHiddenMenu(
          name: "My Services",
          baseStyle: myTextStyle,
          selectedStyle: mySelectedTextStyle,
          colorLineSelected: Colors.white
        ),
        MyServices(email: widget.email,)
      ),
      ScreenHiddenDrawer(
        ItemHiddenMenu(
          name: "Settings",
          baseStyle: myTextStyle,
          selectedStyle: mySelectedTextStyle,
          colorLineSelected: Colors.white
        ),
        GoodSettingsPage(email: widget.email)
      ),
      ScreenHiddenDrawer(
        ItemHiddenMenu(
          name: "Staiv Pro +",
          baseStyle: myTextStyle,
          selectedStyle: mySelectedTextStyle,
          colorLineSelected: Colors.white
        ),
        StaivePlusPage(email: widget.email)
      ),
    ];
  }
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 

  @override
  Widget build(BuildContext context) {
    return ValueChangeObserver<bool>(
      cacheKey: Header.keyDarkMode,
      defaultValue: true,
      builder: (_, isDarkMode, __) => HiddenDrawerMenu(
        disableAppBarDefault: true,
        backgroundColorAppBar: const Color.fromARGB(255, 2, 45, 88),
        backgroundColorMenu: isDarkMode ? const Color.fromARGB(255, 10, 6, 49) : const Color.fromARGB(255, 2, 45, 88),
        screens: _pages,
        initPositionSelected: 0,
        slidePercent: 60,
      ),
    );
  }
}