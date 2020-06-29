import 'package:flutter/material.dart';
import 'bottom_appbar_demo.dart';
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'demo2:不规则底部导航',
//自定义主题样本:  这是内置的一些已经定义好的:
        theme: ThemeData(primarySwatch: Colors.lightBlue),
        home:BottomAppBarDemo()
        
        );
  }
}
