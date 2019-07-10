import 'package:flutter/material.dart'; //引入基础样式   flutter提供了两个基础样式:material 和ios的基础样式

void main() => runApp(new MyApp()); //入口文件 runApp 执行app  这里执行 MyApp

class MyApp extends StatelessWidget {
  // 定义我们的MyApp  继承于一个静态组件
  @override //这是重写的关键字
  Widget build(BuildContext context) {
    //返回一个Widget(组件) BuildContext上下文
    return new MaterialApp(
      title: 'Welcome to Flutter', //这个可以随意定义
      home: new Scaffold(
        //Scaffold是一个组件
        appBar: new AppBar(
          // appBar 组件
          title: new Text('new Text'),
        ),
        body: new Center(
            //center组件
            // child: new Text(
            //   'Hello World Hi JueeiHello World Hi JueeiHello World Hi JueeiHello World Hi JueeiHello World Hi JueeiHello World Hi JueeiHello World Hi JueeiHello World Hi JueeiHello World Hi JueeiHello World Hi JueeiHello World Hi Jueei',
            //   textAlign: TextAlign.start,
            //   // maxLines: 2,
            //   // overflow: TextOverflow.ellipsis,
            //   style:TextStyle(
            //     fontSize: 25.0,
            //     color: Color.fromARGB(100, 244, 0, 0),
            //     decoration: TextDecoration.underline,
            //     decorationStyle: TextDecorationStyle.solid
            //   )

            //   )  //Text 也是一个组件
            child: new Container(
                child: new Text(
                  'dj is small qi gui',
                  style: TextStyle(
                      fontSize: 25.0, color: Colors.red),
                ),
                alignment: Alignment.center,
                width: 500.0,
                height: 400.0,
                color: Colors.green)),
      ),
    );
  }
}
