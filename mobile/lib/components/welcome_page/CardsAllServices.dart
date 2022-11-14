import 'dart:async';
import 'dart:io' show Platform;
import 'package:flutter/material.dart';
import 'package:mobile/components/actions_list/calendar_actions.dart';
import 'package:mobile/components/actions_list/coingecko_actions.dart';
import 'package:mobile/components/actions_list/drive_actions.dart';
import 'package:mobile/components/actions_list/github_actions.dart';
import 'package:mobile/components/actions_list/linkedin_actions.dart';
import 'package:mobile/components/actions_list/muslim_actions.dart';
import 'package:mobile/components/actions_list/riot_actions.dart';
import 'package:mobile/components/actions_list/spotify_actions.dart';
import 'package:mobile/components/actions_list/twitch_actions.dart';
import 'package:mobile/components/actions_list/twitter_actions.dart';
import 'package:mobile/components/actions_list/weather_actions.dart';
import 'package:mobile/components/actions_list/youtube_actions.dart';
import 'package:mobile/pages/good_pageServices.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:http/http.dart' as http;
import '../../globals.dart' as globals;

import '../actions_list/error_action.dart';
import '../actions_list/gmail_actions.dart';
import '../actions_list/ipfs_actions.dart';

class CardServiceLogin extends StatefulWidget {
  CardServiceLogin({
    Key? key,
    required this.email,
    required this.text,
    required this.color,
  }) : super(key: key);

  final String email;
  final String text;
  final Color color;

  @override
  State<CardServiceLogin> createState() => _CardServiceLoginState();
}

class _CardServiceLoginState extends State<CardServiceLogin> {
  int _greeting = 3;
  int _end = 50;
  
  @override
  Widget build(BuildContext context) {

    return Padding(
      padding: const EdgeInsets.only(
        bottom: 13,
        left: 10,
        right: 10  
      ),
      child: Card(
        color: widget.color,
        shadowColor: widget.color,
        elevation: 40,
        clipBehavior: Clip.antiAlias,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
        ),
        child: Stack(
          alignment: Alignment.center,
          children: [
            Ink.image(
              image: AssetImage(
                "img/${widget.text.toLowerCase()}.png"
              ),
              height: 150,
              fit: BoxFit.cover,
              child: InkWell(
                onTap: () async {
                  print(widget.email);
                  print(widget.text.toLowerCase());
                  var queryParameters = {
                    'email': widget.email,
                    'service': widget.text.toLowerCase() == "calendar"
                      || widget.text.toLowerCase() == "drive"
                        || widget.text.toLowerCase() == "gmail"
                          || widget.text.toLowerCase() == "youtube"
                            ? "google" : widget.text.toLowerCase(),
                  };
                  var authority = globals.mainServeurPath;
                  Platform.isAndroid ? authority = "10.0.2.2:${globals.mainServeurPort}" : authority = globals.mainServeurPath;
                  const path = "/auth/isLoggedWith";
                  final uri =  Uri.http(authority, path, queryParameters);
                  print('Ping: $uri');
                  var response = await http.get(uri);
                  print('Response status: ${response.statusCode}');
                  print('Response body: ${response.body}');
                  if (response.statusCode == 200) {
                    Navigator.of(context)
                      .push(MaterialPageRoute(builder: (_) => GoodPageServices(email: widget.email)));
                  }
                  else {
                    String url = response.body;
                    _launchUrl(url);
                    _startCountDown(GoodPageServices(email: widget.email));
                  }
                }
              ),
            ),  
            Padding(
              padding: const EdgeInsets.only(top: 112),
              child: Text(
                widget.text,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: widget.text == "Google"
                    ? const Color.fromARGB(255, 0, 0, 0) : Colors.white,
                  fontSize: 22,
                ),
              ),
            )
          ],
        )
      ),
    );
  }

  Future<void> _launchUrl(url) async {
    Uri realUrl = Uri.parse(url);
    if (!await launchUrl(realUrl)) {
      throw 'Could not launch $realUrl';
    }
  }

  void _startCountDown(Widget page) {
    Timer.periodic(const Duration(seconds: 1), (timer) async {
      if (_end < 0) {
        timer.cancel();
        return;
      }
      _end--;
      print(_greeting);
      if (_greeting <= 0) {
        print(_greeting);
        print(widget.email);
        print(widget.text.toLowerCase());
        
        var queryParameters = {
          'email': widget.email,
          'service': widget.text.toLowerCase(),
        };
        var authority = globals.mainServeurPath;
        Platform.isAndroid ? authority = "10.0.2.2:${globals.mainServeurPort}" : authority = globals.mainServeurPath;
        const path = "/auth/isLoggedWith";
        final uri =  Uri.http(authority, path, queryParameters);
        print('Ping: $uri');
        var response = await http.get(uri);
        print('Response status: ${response.statusCode}');
        print('Response body: ${response.body}');
        if (response.statusCode == 200) {
          Navigator.of(context)
            .push(MaterialPageRoute(builder: (_) => page));
          timer.cancel();
          return;
        }
        else {
          _greeting = 2;
        }
      }
      if (_greeting > 0) {
        setState(() {
          _greeting--;
        });
      }
    });
  }
}