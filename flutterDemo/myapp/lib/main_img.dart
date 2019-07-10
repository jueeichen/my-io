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
        //Scaffold
        appBar: new AppBar(
          // appBar 组件
          title: new Text('asdfasdfas'),
        ),
        body: Center(
            child: Container(
                child: Image.network(
                  'https://img1.mukewang.com/5cd4eb0d08845c7606000338-240-135.jpg',
                  scale: 2.0, //和js相反  值越大  图片越小
                  // fit:BoxFit.fitWidth,
                  // color: Colors.pink,
                  // colorBlendMode: BlendMode.plus,
                  repeat: ImageRepeat.repeatY,
                ),
                width: 375.0,
                height: 400.0,
                color: Colors.lightBlue)),
      ),
    );
  }
}
