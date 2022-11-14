import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

class Header extends StatelessWidget {
  Header({super.key});
  final isDarkMode = Settings.getValue<bool>(keyDarkMode, true); 
  static const keyDarkMode = 'key-dark-mode';

  @override
  Widget build(BuildContext context) => ValueChangeObserver(
    cacheKey: Header.keyDarkMode,
    defaultValue: true,
    builder:  (_, isDarkMode, __) => SwitchSettingsTile(
      title: 'Dark Mode',
      settingKey: keyDarkMode,
      leading: isDarkMode
      ? const Icon(
        Icons.dark_mode,
        color: Color.fromARGB(255, 70, 13, 225),
      )
      : const Icon(
        Icons.sunny,
        color: Color.fromARGB(255, 255, 162, 0),
      ), 
      onChange: (_) { },
    ),
  );
}