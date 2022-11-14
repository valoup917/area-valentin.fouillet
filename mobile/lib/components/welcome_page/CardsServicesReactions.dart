import 'dart:async';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/components/reactions_list/calendar_reactions.dart';
import 'package:mobile/components/reactions_list/drive_reactions.dart';
import 'package:mobile/components/reactions_list/github_reactions.dart';
import 'package:mobile/components/reactions_list/gmail_reactions.dart';
import 'package:mobile/components/reactions_list/ipfs_reactions.dart';
import 'package:mobile/components/reactions_list/linkedin_reactions.dart';
import 'package:mobile/components/reactions_list/spotify_reactions.dart';
import 'package:mobile/components/reactions_list/twitch_reactions.dart';
import 'package:mobile/components/reactions_list/twitter_reactions.dart';
import 'dart:io' show Platform;
import 'package:url_launcher/url_launcher.dart';
import '../../globals.dart' as globals;

import '../reactions_list/discord_reactions.dart';
import '../reactions_list/error_reaction.dart';

class CardServicesReactions extends StatefulWidget {
  const CardServicesReactions({
    Key? key,
    required this.email,
    required this.text,
    required this.color,
    required this.actionRoute,
    required this.actionData,
  }) : super(key: key);

  final String email;
  final String text;
  final Color color;
  final String actionRoute;
  final String actionData;

  @override
  State<CardServicesReactions> createState() => _CardServicesReactionsState();
}

class _CardServicesReactionsState extends State<CardServicesReactions> {
  int _greeting = 3;
 
  @override
  Widget build(BuildContext context) {
    Map<String, Widget> serviceReactions = {
      'Discord': DiscordReactions(email: widget.email, actionData: widget.actionData, actionRoute: widget.actionRoute,),
      'Gmail': GmailReactions(email: widget.email, actionData: widget.actionData, actionRoute: widget.actionRoute,),
      'Drive': DriveReactions(email: widget.email, actionData: widget.actionData, actionRoute: widget.actionRoute,),
      'Calendar': CalendarReactions(email: widget.email, actionData: widget.actionData, actionRoute: widget.actionRoute,),
      'Spotify': SpotifyReactions(email: widget.email, actionData: widget.actionData, actionRoute: widget.actionRoute,),
      'Ipfs': IpfsReactions(email: widget.email, actionData: widget.actionData, actionRoute: widget.actionRoute,),
      'Twitter': TwitterReactions(email: widget.email, actionData: widget.actionData, actionRoute: widget.actionRoute,),
      'Github': GithubReactions(email: widget.email, actionData: widget.actionData, actionRoute: widget.actionRoute,),
      'Twitch': TwitchReactions(email: widget.email, actionData: widget.actionData, actionRoute: widget.actionRoute,),
      'Linkedin': LinkedinReactions(email: widget.email, actionData: widget.actionData, actionRoute: widget.actionRoute,),
    };
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
                  if (widget.text == "back_dark" || widget.text == "back_clear") {
                    Navigator.of(context).pop();
                    return;
                  }
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
                  print('Ping: $uri');
                  print('Response status: ${response.statusCode}');
                  print('Response body: ${response.body}');
                  if (response.statusCode == 200) {
                    Navigator.of(context)
                        .push(MaterialPageRoute(builder: (_) => serviceReactions[widget.text] ?? ErrorReactions(email: widget.email)));
                  }
                  else {
                    String url = response.body;
                    _launchUrl(url);
                    _startCountDown(serviceReactions[widget.text] ?? ErrorReactions(email: widget.email));
                    
                  }
                }
              ),
            ),
            if (widget.text != "back_dark" && widget.text != "back_clear") ...[
              Padding(
                padding: const EdgeInsets.only(top: 112),
                child: Text(
                  widget.text,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: widget.text == "Gmail"
                    || widget.text == "Drive"
                      || widget.text == "Calendar"
                        ? const Color.fromARGB(255, 0, 0, 0) : Colors.white,
                    fontSize: 22,
                  ),
                ),
              )
            ]
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