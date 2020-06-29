import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'list widgets',
        home: Scaffold(
          appBar: AppBar(title: Text('list widgets')),
          body: ListView(
            children: <Widget>[
              // ListTile(
              //     leading: Icon(Icons.border_right),
              //     title: Text('border_right')),
              // ListTile(
              //     leading: Icon(Icons.brightness_2),
              //     title: Text('brightness_2')),
              // ListTile(
              //     leading: Icon(Icons.android),
              //     title: Text('android')),
              Image.network('https://img1.mukewang.com/5cd4eb0d08845c7606000338-240-135.jpg'),
              Image.network('https://img1.mukewang.com/5cd4eb0d08845c7606000338-240-135.jpg'),
              Image.network('https://img1.mukewang.com/5cd4eb0d08845c7606000338-240-135.jpg'),
              Image.network('https://img1.mukewang.com/5cd4eb0d08845c7606000338-240-135.jpg'),
              Image.network('https://img1.mukewang.com/5cd4eb0d08845c7606000338-240-135.jpg'),
              Image.network('https://img1.mukewang.com/5cd4eb0d08845c7606000338-240-135.jpg'),
              Image.network('https://img1.mukewang.com/5cd4eb0d08845c7606000338-240-135.jpg'),
              Image.network('https://img1.mukewang.com/5cd4eb0d08845c7606000338-240-135.jpg'),
              Image.network('https://img1.mukewang.com/5cd4eb0d08845c7606000338-240-135.jpg'),
              Image.network('https://img1.mukewang.com/5cd4eb0d08845c7606000338-240-135.jpg'),
              Image.network('https://img1.mukewang.com/5cd4eb0d08845c7606000338-240-135.jpg'),



              
            ],
          ),
        ));
  }
}
