import 'package:flutter/material.dart';

void main() => runApp(MyApp(
    items: new List<String>.generate(
        20, (i) => 'Item $i') //generate生成器  生成20个元素; 0-19;
    ));

class MyApp extends StatelessWidget {
  final List<String> items;
  MyApp({Key key, @required this.items}) : super(key: key);//?
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'list widgets', 
        home: Scaffold(
            appBar: AppBar(title: Text('active List')),
            body: ListView.builder(
                itemCount: items.length,
                itemBuilder: (context, index) {
                  return ListTile(title: Text('${items[index]}'));
                })));
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
