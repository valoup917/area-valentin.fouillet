import 'package:flutter/material.dart';
import 'package:flutter_settings_screens/flutter_settings_screens.dart';
import 'package:mobile/components/welcome_page/CardsActionsInput1.dart';
import 'package:mobile/components/welcome_page/CardsActionsInput2.dart';

import '../../pages/header_page.dart';
import '../AppBarStaive.dart';
import '../welcome_page/CardsActions.dart';
class CoingeckoActions extends StatefulWidget {
  const CoingeckoActions({
    super.key,
    required this.email,
  });
  final String email;

  @override
  State<CoingeckoActions> createState() => _CoingeckoActionsState();
}

class _CoingeckoActionsState extends State<CoingeckoActions> {
  @override
  Widget build(BuildContext context) {
  final isDarkMode = Settings.getValue<bool>(Header.keyDarkMode, true); 
  List<Widget> cards =
      [
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que la crypto donnée existe",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/existingcoin",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "cryptomonnaie"
        ),
        CardActionsInput2(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le prix donné de la cypto donnée est juste",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/checkcoinprice",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText1: "cryptomonnaie",
          hintText2: "prix"
        ),
        CardActionsInput2(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le hour change volume donné de la cypto donnée est juste",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/checkchangeonehourpercentage",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText1: "cryptomonnaie",
          hintText2: "hour change volume"
        ),
        CardActionsInput2(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le day change volume donné de la cypto donnée est juste",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/checkchangeonedaypercentage",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText1: "cryptomonnaie",
          hintText2: "day change volume"
        ),
        CardActionsInput2(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le week change volume donné de la cypto donnée est juste",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/checkchangeweekpercentage",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText1: "cryptomonnaie",
          hintText2: "day change volume"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le prix donnée est égale a celui du bitcoin (~200)",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/btccheckcoinprice",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "prix"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le % donnée est égale a celui de l'évolution en 1h du bitcoin",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/btccheckonehour",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "% d'évolution"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le % donnée est égale a celui de l'évolution en 1 jour du bitcoin",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/btccheckoneday",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "% d'évolution"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour du bitcoin",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/btccheckoneweek",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "% d'évolution"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le prix donnée est égale a celui de l'ether (~200)",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/ethcheckcoinprice",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "prix"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le % donnée est égale a celui de l'évolution en 1h de l'ether",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/ethcheckonehour",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "% d'évolution"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le % donnée est égale a celui de l'évolution en 1 jour de l'ether",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/ethcheckoneday",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "% d'évolution"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour de l'ether",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/ethcheckoneweek",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "% d'évolution"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le prix donnée est égale a celui du binance (~200)",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/binanceusdcheckcoinprice",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "prix"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le % donnée est égale a celui de l'évolution en 1h du binance",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/binanceusdcheckonehour",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "% d'évolution"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le % donnée est égale a celui de l'évolution en 1 jour du binance",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/binanceusdcheckoneday",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "% d'évolution"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour du binance",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/binanceusdcheckoneweek",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "% d'évolution"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le prix donnée est égale a celui du solana (~200)",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/solanacheckcoinprice",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "prix"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le % donnée est égale a celui de l'évolution en 1h du solana",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/solanacheckonehour",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "% d'évolution"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le % donnée est égale a celui de l'évolution en 1 jour du solana",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/solanacheckoneday",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "% d'évolution"
        ),
        CardActionsInput1(
          email: widget.email,
          image: "img/coingecko.png",
          text: "Est ce que le % donnée est égale a celui de l'évolution en 1 semaine jour du solana",
          shadowColor: const Color.fromRGBO(139, 197, 63, 1),
          route: "http://coingecko:9040/coingecko/solanacheckoneweek",
          textColor: const Color.fromARGB(255, 255, 255, 255),
          hintText: "% d'évolution"
        ),
        CardActions(
          email: widget.email,
          image:  isDarkMode ? "img/back_dark.png" : "img/back_clear.png",
          text: "back",
          shadowColor: const Color.fromRGBO(212, 212, 212, 1),
          route: "",
          textColor: Colors.black,
        ),
      ];
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    return Scaffold(
      body:  Column(
        children: [
          AppBarStaive(w: w, h: h, showMenu: false),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.only(bottom: 25, top: 0),
              itemCount: cards.length,
              shrinkWrap: false,
              itemBuilder: (BuildContext context, int index) {
                return Column(
                  children: [cards[index]]
                );
              }
            ),
          ),
        ],
      ),
    );
  }
}