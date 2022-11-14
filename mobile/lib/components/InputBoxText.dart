import 'package:flutter/material.dart';

class InputBoxText extends StatelessWidget {
  const InputBoxText({
    Key? key,
    required this.emailController,
    required this.textInput,
  }) : super(key: key);

  final TextEditingController emailController;
  final String textInput;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 10, bottom: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(30),
        boxShadow: [
          BoxShadow(
            spreadRadius: 7,
            blurRadius: 10,
            offset: const Offset(1, 1),
            color: Colors.grey.withOpacity(0.3)
          )
        ]
      ),
      child: TextField(
        style: const TextStyle(
          color: Colors.black,  
        ),
        controller: emailController,
        decoration: InputDecoration(
          hintText: textInput,
          hintStyle: TextStyle(
            color: Colors.grey[500],  
          ),
          prefixIcon: const Icon(Icons.email, color:  Color.fromARGB(255, 2, 45, 88)),
          
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(30),
            borderSide: const BorderSide(
              color: Colors.white,
              width: 1
            )
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(30),
            borderSide: const BorderSide(
              color: Colors.white,
              width: 1.0
            )
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(30)
          )
        
        ),
      ),
    );
  }
}