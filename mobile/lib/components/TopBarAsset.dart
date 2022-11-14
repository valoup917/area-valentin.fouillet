import 'package:flutter/material.dart';
import 'package:hidden_drawer_menu/controllers/simple_hidden_drawer_controller.dart';

class TopBarAsset extends StatelessWidget {
  const TopBarAsset({
      super.key,
      required this.image,
      required this.w,
      required this.h,
    });

  final String image;
  final double w;
  final double h;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: w,
      height: h * 0.33,
      decoration: BoxDecoration(
        image: DecorationImage(
          fit: BoxFit.cover,
          
          image: AssetImage(
            
            image
          ),
        )
      ),
    );
  }
}