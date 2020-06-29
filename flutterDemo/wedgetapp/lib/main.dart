//1.bottom bar navigation;
import 'bottom_navigation_bar.dart';
import 'package:flutter/material.dart';

void main () => runApp(myApp());

class myApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title:'flutter bottom navigation bar',
      theme: ThemeData.light(),//默认皮肤
      home:BottomNavigationWigets() //自定义的组件
    );
  }
}

