import 'dart:ffi';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
import 'package:get/get_connect/http/src/utils/utils.dart';
import 'package:mobile/components/Titles.dart';
import 'package:mobile/components/service_list/error_service.dart';
import 'package:mobile/components/service_list/false_card.dart';
import 'package:mobile/components/service_list/true_card.dart';
import 'package:mobile/pages/header_page.dart';
import 'dart:io' show Platform;
import 'package:http/http.dart' as http;
import '../components/AppBarStaive.dart';
import '../components/actions_list/calendar_actions.dart';
import '../components/actions_list/coingecko_actions.dart';
import '../components/actions_list/drive_actions.dart';
import '../components/actions_list/error_action.dart';
import '../components/actions_list/gmail_actions.dart';
import '../components/actions_list/ipfs_actions.dart';
import '../components/actions_list/spotify_actions.dart';
import '../components/actions_list/twitter_actions.dart';
import '../components/actions_list/weather_actions.dart';
import '../components/actions_list/youtube_actions.dart';
import '../components/service_list/card_registry.dart';
import '../components/welcome_page/CardsServicesActions.dart';
import 'dart:convert';
import '../globals.dart' as globals;

class MyAreas extends StatefulWidget {
  const MyAreas({
    super.key,
    required this.email
  });
  final String email;

  @override
  State<MyAreas> createState() => _MyAreasState();
}

class _MyAreasState extends State<MyAreas> {
  var data = "";
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance
      .addPostFrameCallback((_) => test());
  }
  
  Future<List<List<String>>> test() async {

    var queryParameters = {
      'mail': widget.email,
    };

    var authority = globals.mainServeurPath;
    Platform.isAndroid ? authority = "10.0.2.2:${globals.mainServeurPort}" : authority = globals.mainServeurPath;
    
    const path = "/db/ManipulateAreas/getareasfrommail";

    final uri =  Uri.http(authority, path, queryParameters);

    print('Ping: $uri');
    var response = await http.get(uri);
    print('Response status: ${response.statusCode}');
    if (response.statusCode != 200) {
      return [];
    }
    var new_data = response.body;

    data = new_data;
    
    data = data.substring(1);
    data = data.substring(1);
    data = data.substring(0, data.length - 1);
    data = data.substring(0, data.length - 1);
    List<String> data2array = data.split("],[");
    List<List<String>> newArray = [];
    List<String> route = [];
    for (int i = 0; i < data2array.length; i++) {
      List<String> test2 = data2array[i].split(",");
      for (int y = 0; y < test2.length; y++) {
        if (test2[y].contains("http://")) {
          route.add(test2[y]);
          test2[y] = test2[y].substring(test2[y].indexOf('/'));
          test2[y] = test2[y].substring(test2[y].indexOf(':'));
          test2[y] = test2[y].substring(test2[y].indexOf('/'));
          test2[y] = test2[y].substring(test2[y].indexOf('/'));
          test2[y] = test2[y].substring(1);
          if (test2[y].contains("google")) {
            test2[y] = test2[y].substring(test2[y].indexOf('/'));
            test2[y] = test2[y].substring(1);
          }
        }
      }
      List<String> test3 = test2;
      
      if (route.isNotEmpty) {
        for (int j = 0; j != route.length; j++) {
          test3.add(route[j]);
        }
        route = [];
      }
      
      newArray.add(test2);
    }
    print(newArray);
    return newArray;
  }

  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  @override
  Widget build(BuildContext context) {
    
    Map<String, Color> textcolor = {
      'ipfs': Colors.black,
      'gmail': Colors.black,
      'drive': Colors.black,
      'calendar': Colors.black,
      'weather': Colors.black,
      'youtube': Colors.black,
      'spotify': Colors.white,
      'twitter': Colors.black,
      'twitch': Colors.black,
      'riotgame': Colors.black,
      'github': Colors.white,
      'salat': Colors.white,
      'linkedin': Colors.white,
      'coingecko': Colors.black,
      'discord': Colors.black,
    };
    Map<String, Color> shadowcolor = {
      'ipfs': const Color.fromRGBO(212, 212, 212, 1),
      'gmail': Colors.black,
      'drive': Colors.black,
      'calendar': Colors.black,
      'weather': const Color.fromRGBO(60, 60, 60, 1),
      'youtube': const Color.fromRGBO(221, 42, 38, 1),
      'spotify': const Color.fromRGBO(27, 20, 19, 1),
      'twitter': const Color.fromRGBO(29, 161, 243, 1),
      'coingecko': const Color.fromRGBO(139, 197, 63, 1),
      'discord': const Color.fromRGBO(89, 101, 242, 1),
      'linkedin': const Color.fromRGBO(89, 101, 242, 1),
      'twitch': const Color.fromRGBO(156, 64, 255, 1),
      'salat': const Color.fromRGBO(6, 33, 62, 1),
      'riotgame': const Color.fromRGBO(192, 55, 60, 1),
      'github': Colors.black,
    };

    Map<String, String> description = {
      //coingecko
      "coingecko/existingcoin" : "Est ce que la crypto donnée existe",
      "coingecko/checkcoinprice" : "Est ce que le prix donné de la cypto donnée est juste",
      "coingecko/checkchangeonehourpercentage" : "Est ce que le hour change volume donné de la cypto donnée est juste",
      "coingecko/checkchangeonedaypercentage" : "Est ce que le day change volume donné de la cypto donnée est juste",
      "coingecko/checkchangeweekpercentage" : "Est ce que le week change volume donné de la cypto donnée est juste",
      "coingecko/btccheckcoinprice" : "Est ce que le prix donnée est égale a celui du bitcoin (~200)",
      "coingecko/btccheckonehour" : "Est ce que le % donnée est égale a celui de l'évolution en 1h du bitcoin",
      "coingecko/btccheckoneday" : "Est ce que le % donnée est égale a celui de l'évolution en 1 jour du bitcoin",
      "coingecko/btccheckoneweek" : "Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour du bitcoin",
      "coingecko/ethcheckcoinprice" : "Est ce que le prix donnée est égale a celui de l'ether (~200)",
      "coingecko/ethcheckonehour" : "Est ce que le % donnée est égale a celui de l'évolution en 1h de l'ether",
      "coingecko/ethcheckoneday" : "Est ce que le % donnée est égale a celui de l'évolution en 1 jour de l'ether",
      "coingecko/ethcheckoneweek" : "Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour de l'ether",
      "coingecko/binanceusdcheckcoinprice" : "Est ce que le prix donnée est égale a celui du binance (~200)",
      "coingecko/binanceusdcheckonehour" : "Est ce que le % donnée est égale a celui de l'évolution en 1h du binance",
      "coingecko/binanceusdcheckoneday" : "Est ce que le % donnée est égale a celui de l'évolution en 1 jour du binance",
      "coingecko/binanceusdcheckoneweek" : "Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour du binance",
      "coingecko/solanacheckcoinprice" : "Est ce que le prix donnée est égale a celui du solana (~200)",
      "coingecko/solanacheckonehour" : "Est ce que le % donnée est égale a celui de l'évolution en 1h du solana",
      "coingecko/solanacheckoneday" : "Est ce que le % donnée est égale a celui de l'évolution en 1 jour du solana",
      "coingecko/solanacheckoneweek" : "Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour du solana",
      //gmail
      "gmail/getUserMessages" : "nouveau mail",
      "gmail/getUserDrafts" : "nouveau draft",
      "gmail/updateUserLanguage" : "Change la langue de gmail",
      "gmail/getUserFilters" : "nouvelle filtre",
      "gmail/getUserSendAs" : "nouveau sendAs",
      "gmail/trashMessage" : "Met un message à la poubelle",
      "gmail/sendMail" : "nvoie un mail avec un message à un utilisateur",
      //calendar
      "calendar/getUserEvents" : "Nouvelle événement dans ton calendrier",
      "calendar/createEvent" : "Créer un évènement",
      "calendar/deleteEvent" : "Supprime un évènement",
      //drive
      "drive/listFiles" : "Nouveau fichier dans ton drive",
      "drive/createFile" : "Créer un fichier",
      "drive/deleteFile" : "Supprime un fichier",
      "drive/listComment" : "Nouveau commentaire dans un de tes fichier drive",
      "drive/createComment" :  "Créer un nouveau commentaire sur un fichier",
      "drive/deleteComment" : "Supprime un commentaire sur un fichier",
      //youtube
      "youtube/listLikedVideos" : "Nouvelle vidéo likée",
      "youtube/listDislikedVideos" : "Nouvelle vidéo dislikée",
      //Discord
      "Discord/message": "Envoyer un message sur un chanel random",
      "Discord/sendrandommeme": "Envoyer un meme random",
      "Discord/sendrandomgif": "Envoyer un random gif",
      //ipfs
      "ipfs/bootstraplist": "plus de 6 pair sur la boostrap list",
      "ipfs/pinadd": "Pin un fichier",
      "ipfs/bootstrapadd": "Ajout une boostrap node",
      "ipfs/bootstrapadddefault": "Ajout une boostrap node par default",
      "ipfs/bootstraprmall": "Supprime tout les boostrap nodes",
      "ipfs/filesmkdir": "Créer un dossier dans MFS",
      "ipfs/pinrm": "Supprime un fichier pin",
      "ipfs/get": "Telecharger un fichier sur le reseau",
      "ipfs/swarmconnect": "Se connecter à un nouveau peer",
      "ipfs/swarmdisconnect": "Se déconnecter d'un peer",
      "ipfs/shutdown": "Déconnecter son noeud",
      //spotify
      "spotify/userName" : "nom d'utilisateur changé",
      "spotify/userMail" : "email changé",
      "spotify/userFollowers" : "nouveau follower",
      "spotify/userProfileImage" : "photo de profil changé",
      "spotify/userProduct" : "forfait spotify changé",
      "spotify/userFollowing" : "nouvel artist follow",
      "spotify/followPlaylist" : "Follow cette nouvelle playlist",
      "spotify/pausePlayback": "Mettre sur pause la musique",
      "spotify/resumePlayback": "Reprendre la musique",
      "spotify/skipToNext": "Mettre la prochaine musique",
      "spotify/skipToPrevious": "Mettre la musique précédente",
      "spotify/setPlaybackVolume": "Regler le volume de la musique",
      //twitch
      "twitch/userName" : "User name modifié",
      "twitch/userEmail" : "Adresse email modifiée",
      "twitch/userDescription" : "La déscription a été modifiée",
      "twitch/userProfileImage" : "Image de profil changée",
      "twitch/changeDescription" : "Changer de bio",
      "twitch/userFollowers" : "Nouveau follower",
      "twitch/userBlockedUsers" : "Nouvel utilisateur bloqué",
      "twitch/userPlaylists" : "Nouvelle playlist ajoutée",
      "twitch/userFollowing" : "Nouvel utilisateur suivi",
      "twitch/userVideos" : "Nouvelle vidéo ajoutée",
      "twitch/raidUser" : "Raid un utilisateur qui te suis",
      //twitter
      "twitter/createTweet": "Poster un tweet",
      "twitter/name": "Nom d'utilisateur changé",
      "twitter/username": "Username changé",
      "twitter/bookmarks": "Nouveau tweet dans les signets",
      "twitter/messages": "Nouveau message",
      "twitter/userTweets": "Nouveau tweet publié",
      "twitter/following": "Nouveau following",
      "twitter/followers": "Nouveau follower",
      "twitter/likingUsers": "Nouveau like",
      "twitter/retweetedBy": "Nouveau retweet",
      "twitter/likedTweets": "Nouveau tweet liké",
      //github
      "github/userName": "User name modifié",
      "github/userDescription": "La déscription a été modifiée",
      "github/userFollowers": "Nouveau follower",
      "github/userFollowing": "Nouvel utilisateur suivi",
      "github/userRepository": "Nouveau repository",
      "github/userCommits": "Nouveau commit",
      "github/userBranches": "Nouvelle branche",
      "github/updateUserName": "Changer de nom d'utilisateur",
      "github/updateUserEmail": "Changer d'adresse email",
      "github/updateUserDescription": "Changer de bio",
      "github/updateEmailVisibility": "Changer de profil privé ou public",
      "github/createRepository": "Créer un nouveau repository",
      //weather
      "Weather/toHot": "La température est une température d'été",
      "Weather/toCold": "La température est une température d'hiver",
      "Weather/toWet": "L'humidité est supérieur à 75%",
      "Weather/toDry": "L'humidité est inférieur à 40%",
      "Weather/tempusercheckmore": "La température est supérieur à celle donnée",
      "Weather/tempusercheckless": "La température est inférieur à celle donnée",
      "Weather/humusercheckmore": "L'humidité est supérieur à celle donnée",
      "Weather/humusercheckless": "L'humidité est inférieur à celle donnée",
      "Weather/below10" : "La température est en dessous de 10 degrés",
      "Weather/below0" : "La température est en dessous de 0 degrés",
      "Weather/above20" : "La température est supérieur à 20 degrés",
      "Weather/above30" : "La température est supérieur à 30 degrés",
      "Weather/verycloudy" : "La temps est nuageux",
      "Weather/snowing" : "Il neige",
      "Weather/raining" : "Il pleut",
      "Weather/windy" : "Le vent est supérieur à 12km",
      //riot
      "riotgame/maintenance": "Une maintenance est en cours sur LOL",
      "riotgame/maintenace": "Une maintenance est en cours sur LOL",
      "riotgame/ischampioninrotation": "Est ce que le champion donné est en rotation",
      //muslim
      "salat/asr": "C'est l'heure du asr",
      "salat/dhuhr": "C'est l'heure du dhuhr",
      "salat/fajr": "C'est l'heure du fajr",
      "salat/firstthird": "C'est l'heure du firstthird",
      "salat/imsak": "C'est l'heure du imsak",
      "salat/isha": "C'est l'heure du isha",
      "salat/lastthird": "C'est l'heure du lastthird",
      "salat/maghrib": "C'est l'heure du maghrib",
      "salat/midnight": "C'est l'heure du midnight",
      "salat/sunrise": "C'est l'heure du sunrise",
      "salat/sunset": "C'est l'heure du sunset",
      // linkedin
      "linkedin/userEmail": "Adresse email modifiée",
      "linkedin/createpost": "Créer un post linkedin",
    };
    
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;

    bool _isShown = true;

    void _delete(BuildContext context, String actionRoute, String reactionRoute) {
      showDialog(
      context: context,
      builder: (BuildContext ctx) {
        return AlertDialog(
          actionsAlignment: MainAxisAlignment.center,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          title: const Text('Please Confirm'),
          content: actionRoute == "" ? const Text('Are you sure to delete all the areas ?') : const Text('Are you sure to delete this area ?'),
          actions: [
            TextButton(
              onPressed: () {
                // Close the dialog
                Navigator.of(context).pop();
              },
              child: const Text(
                'No',
                style: TextStyle(
                  color: Colors.red,
                  fontSize: 16
                ),
              )
            ),
            TextButton(
              onPressed: () async {
                var authority = globals.mainServeurPath;
                Platform.isAndroid ? authority = "10.0.2.2:${globals.mainServeurPort}" : authority = globals.mainServeurPath;
                var path = "db/ManipulateAreas/deletespecificarea";
                if (actionRoute == "") {
                  path = "db/ManipulateAreas/deleteallareasfrommail";
                }
                final uri =  Uri.http(authority, path);
                print('Ping: $uri');
                var myBody = jsonEncode(<String, String>{
                  'mail': widget.email,
                });
                if (actionRoute != "") {
                  actionRoute = actionRoute.substring(0, actionRoute.length - 1);
                  actionRoute = actionRoute.substring(1);
                  reactionRoute = reactionRoute.substring(0, reactionRoute.length - 1);
                  reactionRoute = reactionRoute.substring(1);
                  print("actionRoute : $actionRoute");
                  print("reactionRoute : $reactionRoute");
                  myBody = jsonEncode(<String, String>{
                    'mail': widget.email,
                    'action': actionRoute,
                    'reaction': reactionRoute,
                  });
                }
                var response = await http.delete(
                  uri,
                  headers: <String, String>{
                    'Content-Type': 'application/json; charset=UTF-8',
                  },
                  body: myBody,
                );
                print('Response status for deletion: ${response.statusCode}');
                print('Response body for deletion: ${response.body}');
                setState(() {
                  _isShown = false;
                });
                Navigator.of(context).pop();
              },
              child: const Text(
                "Yes",
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
    
    return ValueChangeObserver<bool>(
      cacheKey: Header.keyDarkMode,
      defaultValue: true,
      builder: (_, isDarkMode, __) => Scaffold(
        body: Column(
          children: [
            Stack(
              children: [ 
                AppBarStaive(w: w, h: h, showMenu: true,),
                Container(
                  padding: isDarkMode ? EdgeInsets.only(top: h * 0.14) : EdgeInsets.only(top: h * 0.13),
                  alignment: Alignment.center,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      elevation: 5,
                      backgroundColor: isDarkMode ? const Color.fromARGB(255, 140, 23, 23)  : Colors.white,
                      shadowColor: Colors.red,
                      disabledBackgroundColor: isDarkMode ? Colors.white : Colors.red,
                    ),
                    onPressed: () {
                      if (_isShown == true)  {
                        _delete(context, "", "");
                      } 
                    },
                    child: Text(
                      "Delete AREAS",
                      style: TextStyle(
                        color: isDarkMode ? Colors.white : Colors.red,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
                Container(
                  width: w,
                  alignment: Alignment.topRight,
                
                  padding: EdgeInsets.only(top: h * 0.07, right: 10),
                    child: ElevatedButton(
                      
                      onPressed: () {
                        test();
                        setState(() {
                          _isShown = false;
                        });
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color.fromARGB(255, 230, 230, 230),
                        shadowColor: Colors.black,
                        elevation: 5,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0)
                        ),
                      ),
                      child: const Icon(
                        Icons.refresh,
                        color: Colors.black,
                      ),
                    ),
                  ),
              ]
            ),
            FutureBuilder(
              future: test(),
              builder: (
                BuildContext context,
                AsyncSnapshot<List<List<String>>> snapshot,
              ) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                } else if (snapshot.connectionState == ConnectionState.done) {
                  if (snapshot.hasError || snapshot.data!.isEmpty) {
                    return Column(
                      children: [
                        Padding(
                          padding: EdgeInsets.only(top: h * 0.27),
                          child: Center(
                            child: Text(
                              "No Areas 😣",
                              style: TextStyle(
                                fontSize: 35,
                                fontWeight: FontWeight.bold,
                                color: isDarkMode ? Colors.white : const Color.fromARGB(255, 2, 45, 88),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 70,)
                      ],
                    );
                  } else if (snapshot.hasData) {
                    return Expanded(
                      
                      child: SizedBox(
                        height: h,
                        width: w,
                        child: ListView.builder(
                                padding: const EdgeInsets.only(left: 20, right: 20, top: 0, bottom: 0),
                                itemCount: snapshot.data?.length,
                                itemBuilder: (BuildContext context, int index) {
                                  return Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Stack(
                                        children: [
                                            Container(
                                              alignment: Alignment.topRight,
                                              child: ElevatedButton(
                                                style: ElevatedButton.styleFrom(
                                                  elevation: 10,
                                                  backgroundColor: isDarkMode ? const Color.fromARGB(255, 140, 23, 23) : Colors.white,
                                                  shadowColor: Colors.red,
                                                  disabledBackgroundColor: isDarkMode ? Colors.white : Colors.red,
                                                  
                                                ),
                                                onPressed: () {
                                                  var actionRoute = "";
                                                  var reactionRoute = "";
                                                  for (int i = 0; i != snapshot.data![index].length; i++) {
                                                    if (snapshot.data![index][i].contains("http://")) {
                                                      actionRoute == "" ? actionRoute = snapshot.data![index][i] : reactionRoute = snapshot.data![index][i];
                                                    }
                                                  }
                                                  if (_isShown == true)  {
                                                    _delete(context, actionRoute, reactionRoute);
                                                  } 
                                                },
                                                
                                                child: Icon(
                                                  Icons.delete,
                                                  color: isDarkMode ? Colors.white : Colors.red,
                                                  size: 28,
                                                ),
                                              ),
                                            ),
                                            Padding(
                                            padding: const EdgeInsets.only(left: 10),
                                            child: Text(
                                              "Area ${index + 1}",
                                              style: const TextStyle(
                                                fontSize: 35,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ),
                                        ]
                                      ),
                                      ListView.builder(
                                        shrinkWrap: true,
                                        physics: const NeverScrollableScrollPhysics(),
                                        padding: const EdgeInsets.all(0),
                                        itemCount: snapshot.data?[index].length,
                                        itemBuilder: (BuildContext context, int index2) {
                                          if (snapshot.data![index][index2].contains("http://")) {
                                            return Container();
                                          }
                                          if (snapshot.data![index][index2].contains("/")) {
                                            var serviceName = snapshot.data![index][index2].substring(0, snapshot.data![index][index2].indexOf('/'));
                                            //var areaName = snapshot.data![index][index2].substring(snapshot.data![index][index2].indexOf('/')).substring(1);
                                            var areaName = snapshot.data![index][index2].substring(0, snapshot.data![index][index2].length - 1);
                                            return CardRegistryService(
                                              email: widget.email,
                                              service: serviceName,
                                              area: description[areaName] ?? "error no description for $areaName",
                                              textColor: textcolor[serviceName.toLowerCase()] ?? Colors.white,
                                              shadowColor: shadowcolor[serviceName.toLowerCase()] ?? Colors.white,
                                            );
                                          } else {
                                            if (snapshot.data![index][index2] == "true") {
                                              return Column (
                                                children: [
                                                  const TrueCard(),
                                                  if (index2 == 3) ...[
                                                    const SizedBox(height: 50),
                                                  ]
                                                ],
                                              );
                                            } else {
                                              return Column (
                                                children: [
                                                  const FalseCard(),
                                                  if (index2 == 3) ...[
                                                    const SizedBox(height: 50),
                                                  ]
                                                ],
                                              );
                                            }
                                          }
                                         }
                                       ),
                                    ],
                                  );
                                }
                        ),
                        ),
                    );
                  } else {
                    return const Text('Empty data');
                  }
                } else {
                  return Text('State: ${snapshot.connectionState}');
                }
              }
            ),
          ],
        ),
      ),
    );
  }
}