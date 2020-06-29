import 'package:flutter/material.dart';
import 'each_view.dart';

class BottomAppBarDemo extends StatefulWidget {
  @override
  _BottomAppBarDemoState createState() => _BottomAppBarDemoState();
}

class _BottomAppBarDemoState extends State<BottomAppBarDemo> {
  List<Widget> _eachView;
  int _index = 0;
  @override
  void initState() {
    super.initState();
    _eachView = List();
    _eachView..add(EachView('Home'))..add(EachView('jueei'))..add(EachView('pages'));
  }

  Widget build(BuildContext context) {
    return Scaffold(
      body: _eachView[_index],
      floatingActionButton: FloatingActionButton(
          onPressed: () {
            //我的理解为拿到页面的上下文(实例),然后跳转路由到新页面 new page 里
            Navigator.of(context)
                .push(MaterialPageRoute(builder: (BuildContext context) {
              return EachView('new page');
            }));
          },
          tooltip: 'Jueei', //长按会有提示
          child: Icon(Icons.add, color: Colors.white)),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomAppBar(
          color: Colors.lightBlue,
          shape: CircularNotchedRectangle(),
          child: Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              IconButton(
                icon: Icon(Icons.home),
                color: Colors.white,
                onPressed: () {
                  setState(() {
                    _index = 1;
                  });
                },
              ),
              IconButton(
                icon: Icon(Icons.pages),
                color: Colors.white,
                onPressed: () {
                   setState(() {
                    _index = 2;
                  });
                },
              ),
            ],
          )),
    );
  }
}
