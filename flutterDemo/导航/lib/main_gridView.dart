import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: '电影',
        home: Scaffold(
            appBar: new AppBar(title: new Text('电影海报')),
            body: new GridView.count(
              padding: const EdgeInsets.all(10.0),
              crossAxisSpacing: 10.0,
              crossAxisCount: 3,
              children: <Widget>[
                const Text('yiliangkeji124'),
                const Text('yiliangkeji124'),
                const Text('yiliangkeji123'),
                const Text('yiliangkeji123'),
                const Text('yiliangkeji213'),
                const Text('yiliangkeji213'),
                const Text('yiliangkeji32'),
              ],
            )));
  }
}
