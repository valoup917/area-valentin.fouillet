import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';

class AccountPage extends StatelessWidget {
  static const keyLanguage = 'key-language';
  static const keyLocation = 'key-location';
  static const keyPassword = 'key-password';

  const AccountPage({super.key});

  @override
  Widget build(BuildContext context) => SimpleSettingsTile(
    title: 'Account Settings',
    subtitle: 'Privacy, Security, Language',
    leading: const Icon(Icons.person, color: Colors.green),
    child: SettingsScreen(
      title: 'Account Settings',
      children: <Widget>[
        buildLanguage(),
        buildLocation(),
        buildPassword(),
        buildPrivacy(context),
        buildSecurity(context),
        buildAccountInfo(context)
      ],
    )
  );
  Widget buildLanguage() => DropDownSettingsTile(
    settingKey: keyLanguage,
    title: 'Language',
    selected: 1,
    values: const <int, String>{
      1: 'English',
      2: 'Spanish',
      3: 'Chinese',
      4: 'Hindi',
    },
    onChange: (language) { /* NOOP */ },
  );
  Widget buildLocation() => TextInputSettingsTile(
    settingKey: keyLocation,
    title: 'Location',
    initialValue: 'Australia',
    onChange: (location) { /* NOOP */ },
  );
  Widget buildPassword() => TextInputSettingsTile(
    title: 'Password',
    settingKey: keyPassword,
    obscureText: true,
    validator: (password) => password.length >= 6 ? null : 'Enter 6 characters',
  );
  Widget buildPrivacy(BuildContext context) => SimpleSettingsTile(
    title: 'Privacy',
    subtitle: '',
    leading: const Icon(Icons.lock, color: Colors.blue,),
    onTap: () => print("lol") 
  );
  Widget buildSecurity(BuildContext context) => SimpleSettingsTile(
    title: 'Security',
    subtitle: '',
    leading: const Icon(Icons.security, color: Colors.red,),
    onTap: () => print("lol") 
  );
  Widget buildAccountInfo(BuildContext context) => SimpleSettingsTile(
    title: 'Account Info',
    subtitle: '',
    leading: const Icon(Icons.text_snippet, color: Colors.purple,),
    onTap: () => print("lol")
  );
}