import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(title: 'page return Data', home: FirstPage()));
}

class FirstPage extends StatelessWidget {
  // const FirstPage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('give me your phone number'),
        ),
        body: Center(
          child: RouteButton(),
        ));
  }
}

class RouteButton extends StatelessWidget {
  // const RouteButton({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      onPressed: () {
        _navPrettyGirl(BuildContext,context);
      },
      child: Text('find a pretty girl'),
    );
  }

  _navPrettyGirl(BuildContext,context) async {
    final result = await Navigator.push(
        context, MaterialPageRoute(builder: (context) => PrettyGirlPage()));
    Scaffold.of(context).showSnackBar(SnackBar(content: Text('$result'+'认为他')));
  }
}

class PrettyGirlPage extends StatelessWidget {
  // const PrettyGirlPage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('i am pretty girl ')),
        body: Center(
            child: Column(
          children: <Widget>[
            RaisedButton(
              child: Text('大长腿'),
              onPressed: () {
                Navigator.pop(context, 'big tui pretty girl1:11111111');
              },
            ),
            RaisedButton(
              child: Text('小蛮腰'),
              onPressed: () {
                Navigator.pop(context, 'big tui pretty girl2:222222222');
              },
            )
          ],
        )));
  }
}
