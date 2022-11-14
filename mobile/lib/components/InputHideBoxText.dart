
import 'package:flutter/material.dart';


class InputHideBoxText extends StatefulWidget {
  const InputHideBoxText({
    Key? key,
    required this.passwordController,
  }) : super(key: key);

  final TextEditingController passwordController;

  @override
  State<InputHideBoxText> createState() => _InputHideBoxTextState();
}

class _InputHideBoxTextState extends State<InputHideBoxText> {
  bool signShowPassword = true;
  
  @override
  Widget build(BuildContext context) {
    return Container(
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
        controller: widget.passwordController,
        obscureText: signShowPassword,
        decoration: InputDecoration(
          hintText: "mot de passe",
          hintStyle: TextStyle(
            color: Colors.grey[500],  
          ),
          prefixIcon: const Icon(Icons.password, color: Color.fromARGB(255, 2, 45, 88)),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(30),
            borderSide: const BorderSide(
              color: Colors.white,
              width: 1.0
            )
          ),
          suffixIcon: IconButton(
            icon: const Icon(Icons.remove_red_eye),
            color: const Color.fromARGB(255, 2, 45, 88),
            onPressed: () => setState(() => { signShowPassword = !signShowPassword }),
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
  }}