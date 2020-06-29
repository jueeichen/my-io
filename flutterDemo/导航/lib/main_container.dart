import 'package:flutter/material.dart'; //引入基础样式   flutter提供了两个基础样式:material 和ios的基础样式

void main() => runApp(new MyApp()); //入口文件 runApp 执行app  这里执行 MyApp

class MyApp extends StatelessWidget {
  // 定义我们的MyApp  继承于一个静态组件
  @override //这是重写组件的关键字}
  Widget build(BuildContext context) {
    //返回一个Widget(组件) BuildContext上下文
    return new MaterialApp(
      title: 'Welcome to Flutter', //这个可以随意定义
      home: new Scaffold(
        //Scaffold是一个组件
        appBar: new AppBar(
          // appBar 组件
          title: new Text('TextWidget'),
        ),
        body: new Center(
            child: new Container(
          child: new Text(
            'hello jueei',
            style: TextStyle(
                fontSize: 25.0, color: Color.fromARGB(255, 255, 244, 0)),
          ),
          alignment: Alignment.topLeft,
          width: 375.0,
          height: 400.0,
          padding: const EdgeInsets.fromLTRB(40.0, 0, 0, 0),
          margin: const EdgeInsets.all(10.0),
          // color: Colors.lightBlue
          decoration: new BoxDecoration(
              gradient: const LinearGradient(colors: [
            Colors.lightBlue,
            Colors.lightGreen,
            Colors.purple
          ])),
        )),
      ),
    );
  }
}
