import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'list widgets',
        home: Scaffold(
            appBar: AppBar(title: Text('list widgets')),
            body: Center(
              child: Container(height: 200.0, child: MyList()),
            )));
  }
}

class MyList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      scrollDirection: Axis.horizontal,
      children: <Widget>[
        Container(
          width: 180.0,
          color: Colors.redAccent,
        ),
        Container(
          width: 180.0,
          color: Colors.lightBlue,
        ),
        Container(
          width: 180.0,
          color: Colors.lightGreen,
        ),
        Container(
          width: 180.0,
          color: Colors.lightGreenAccent,
        ),
      ],
    );
  }
}
