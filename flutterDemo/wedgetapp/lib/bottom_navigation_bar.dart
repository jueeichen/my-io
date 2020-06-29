import 'package:flutter/material.dart';
import 'pages/home_screen.dart';
import 'pages/email_screen.dart';
import 'pages/message_screen.dart';
import 'pages/phone_screen.dart';





class BottomNavigationWigets extends StatefulWidget {
  BottomNavigationWigets({Key key}) : super(key: key);

  _BottomNavigationWigetsState createState() => _BottomNavigationWigetsState();
}

class _BottomNavigationWigetsState extends State<BottomNavigationWigets> {
  final _BottomNavigationColor = Colors.blue;
  int _currentIndex = 0;
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(//脚手架相当于模具  ,  用了自己后就能使用它里面的方法;
    bottomNavigationBar: BottomNavigationBar(
      items:[
        BottomNavigationBarItem(
          icon:Icon(
            Icons.home,
            color:_BottomNavigationColor
          ),
          title:Text(
            'Home',
            style:TextStyle(color:_BottomNavigationColor)
          )
        ),
        BottomNavigationBarItem(
          icon:Icon(
            Icons.email,
            color:_BottomNavigationColor
          ),
          title:Text(
            'email',
            style:TextStyle(color:_BottomNavigationColor)
          )
        ),
        BottomNavigationBarItem(
          icon:Icon(
            Icons.message,
            color:_BottomNavigationColor
          ),
          title:Text(
            'message',
            style:TextStyle(color:_BottomNavigationColor)
          )
        ),
        BottomNavigationBarItem(
          icon:Icon(
            Icons.phone,
            color:_BottomNavigationColor
          ),
          title:Text(
            'phone',
            style:TextStyle(color:_BottomNavigationColor)
          )
        ),
      ]
    ),
     
    );
  }
}