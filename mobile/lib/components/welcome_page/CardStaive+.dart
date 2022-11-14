import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controller/payement_controller.dart';
import 'package:url_launcher/url_launcher.dart';

final Uri _url = Uri.parse('https://flutter.dev');
class CardStaivePlus extends StatelessWidget {
  const CardStaivePlus({
    Key? key,
    required this.email,
    required this.text,
    required this.price,
    required this.arguments,
    required this.shadowColor,
    required this.textColor,
  }) : super(key: key);

  final String email;
  final String text;
  final double price;
  final List arguments;
  final Color shadowColor;
  final Color textColor;

  @override
  Widget build(BuildContext context) {
    final paymentController = Get.put(PaymentController());
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    var supportingText =
       "Engagement sur 12 mois sans engagement ®";
    return Padding(
      padding: const EdgeInsets.only(
        bottom: 13,
        left: 10,
        right: 10  
      ),
      child: Card(
        color: shadowColor,
        shadowColor: shadowColor,
        elevation: 25,
        clipBehavior: Clip.antiAlias,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
        ),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 10.0, left: 10),
              child: ListTile(
                title: Text(
                  text,
                  style: TextStyle(
                    color: textColor,
                    fontSize: 30,
                    fontWeight: FontWeight.bold
                  ),
                ),
                subtitle: Text(
                  "$price €/mois",
                  style: TextStyle(
                    color: textColor,
                  ),  
                ),
              ),
            ),
            Center(
              child: ListView.builder(
                padding: const EdgeInsets.only(bottom: 10, top: 5),
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: arguments.length,
                itemBuilder: (BuildContext context,int index){
                return ListTile(
                  enabled: false,
                  onTap: (){},
                  title: Center(
                    child: RichText(
                      text: TextSpan(
                        children: [
                          const WidgetSpan(
                            child: Padding(
                              padding: EdgeInsets.only(right: 6),
                              child: Icon(
                                Icons.check,
                                color: Color.fromARGB(255, 52, 133, 55),
                              ),
                            ),
                          ),
                          TextSpan(
                            text: arguments[index],
                            style: const TextStyle(
                              fontSize: 20,
                              color: Colors.white,
                              fontWeight: FontWeight.w500,
                            )
                          ),
                        ],
                      ),
                    ),
                  )
                );
                },
              ),
            ),
            Container(
              padding: EdgeInsets.all(16.0),
              alignment: Alignment.center,
              child: Text(
                supportingText,
                style: TextStyle(
                  color: textColor,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 12.0),
              child: ElevatedButton(
                onPressed: () => paymentController.makePayment(amount: "price", currency: 'USD'),
                style: ElevatedButton.styleFrom(
                  fixedSize: const Size(150, 50),
                  textStyle: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.bold
                  ),
                  backgroundColor: const Color.fromARGB(255, 250, 250, 250),
                  foregroundColor: Colors.black87,
                  elevation: 15,
                  shadowColor: shadowColor,
                  shape: const StadiumBorder()
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Text("Lesgooo"),
                    Icon(Icons.add_shopping_cart),
                  ],
                ),
              ),
            )
         ],
        )
      ),
    );
  }
  Future<void> _launchUrl() async {
    if (!await launchUrl(_url)) {
      throw 'Could not launch $_url';
    }
  }
}