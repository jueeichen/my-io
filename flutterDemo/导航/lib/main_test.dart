import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
//         尝试用“flutter run”运行您的应用程序。你会看到的
// 应用程序有一个蓝色工具栏。然后，不退出应用程序，尝试一下
// 将下面的主色改为不同的颜色。绿色，然后调用
// “热加载”(在您运行“flutter run”的控制台按下“r”，
// 或者简单地将更改保存到颤振IDE中的“hot reload”)。
// 注意计数器没有重置为零;应用程序
// 不是重启。
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".
// 这个小部件是应用程序的主页。它是有状态的，有意义的
// 它有一个状态对象(定义如下)，其中包含影响的字段
// 它看起来如何。

// 该类是状态的配置。它保存值(在这里
// 由父类(在本例中为App小部件)提供的标题
// 用于状态的生成方法。小部件子类中的字段是
// 标志着“最终”。
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
//     每次调用setState时都会重新运行此方法，例如，按照所做的那样
// 通过上面的_incrementCounter方法。

// 对颤振框架进行了优化，给出了颤振框架的再运行构建方法
// 速度很快，所以你可以重建任何需要更新的东西
// 而不必单独更改小部件的实例。
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
//         这里我们从创建的my主页对象中获取值
// 方法，并使用它设置appbar标题。
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
//         Center是一个布局小部件。它接受一个单独的子元素并对其进行定位
// 在父母的中间。
        child: Column(
          // Column is also layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
//           列也是布局小部件。它需要一个子列表
// 安排他们垂直。默认情况下，它根据自己的大小调整大小
// 水平方向的孩子，并试图和它的父母一样高。

// 调用“调试绘图”(在控制台中按“p”，选择
// “切换调试油漆”动作从颤振检查器在Android
// 或Visual Studio代码中的“Toggle Debug Paint”命令)
// 要查看每个小部件的线框图。

// 列具有各种属性来控制其大小
// 它如何定位它的孩子。这里我们使用主轴对中到
// 将孩子垂直放置;主轴是竖直的
// 因为列是垂直的(横轴应该是
// 水平)。
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'demo 之 邓杰小气鬼',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.这个逗号使自动格式化更适合于构建方法。
    );
  }
}
