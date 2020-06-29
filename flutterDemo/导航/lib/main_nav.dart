import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(title: 'dh1', home: new FirstScreen()));
}

class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('home'),
      ),
      body: Center(
        child: RaisedButton(
          child: Text('nav goodlist page'),
          onPressed: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => new SecondScreen()));
          },
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('goodlist page'),
      ),
      body: Center(
        child: RaisedButton(
          child: Text('return home page'),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
    );
  }
}
