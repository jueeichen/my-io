import 'package:flutter/material.dart';

// class NavigationIconView {
//   final String _title;
//   final Widget _icon;
//   final Widget _activeIcon;
//   final BottomNavigationBarItem item;
//  const NavigationIconView({Key key, String _title,Widget _icon,Widget _activeIcon}):
//   _title=title,
//   _icon=icon,
//   _activeIcon=activeIcon,
//   item = new BottomNavigationBarItem(
//   title=Text(title),
//   icon=icon,
//   activeIcon=activeIcon,
//   backgroundColor: Colors.white
//   )
// };

class HomeScreen extends StatefulWidget {
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  // List<NavigationIconView> _navigationIconView;
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'wechat',
        home: Scaffold(
          appBar: AppBar(
            title: Text(
              "微信",
              style: TextStyle(
                color: Color.fromARGB(255, 0, 0, 0),
              ),
            ),
            backgroundColor: const Color(0xFFE8E9E8),
            centerTitle: true,
          ),
          body: Container(
            child: Container(),
          ),
          bottomNavigationBar: BottomNavigationBarFullDefault(),
        ));
  }
}

class BottomNavigationBarFullDefault extends StatefulWidget {
  const BottomNavigationBarFullDefault() : super();
  @override
  State<StatefulWidget> createState() => _BottomNavigationBarFullDefault();
}

// BottomNavigationBar 默认的实例,有状态
class _BottomNavigationBarFullDefault extends State {
  int _currentIndex = 1;

  void _onItemTapped(int index) {
    if (mounted) {
      setState(() {
        _currentIndex = index;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      type: BottomNavigationBarType
          .fixed, // BottomNavigationBarType 中定义的类型，有 fixed 和 shifting 两种类型
      iconSize: 24.0, // BottomNavigationBarItem 中 icon 的大小
      currentIndex: _currentIndex, // 当前所高亮的按钮index
      onTap: _onItemTapped, // 点击里面的按钮的回调函数，参数为当前点击的按钮 index
      fixedColor:
          Colors.green, // 如果 type 类型为 fixed，则通过 fixedColor 设置选中 item 的颜色
      items: <BottomNavigationBarItem>[
        BottomNavigationBarItem(
            title: Text("微信"), icon: Icon(Icons.chat_bubble_outline)),
        BottomNavigationBarItem(
            title: Text("通讯录"), icon: Icon(Icons.supervisor_account)),
        BottomNavigationBarItem(
            title: Text("发现"), icon: Icon(Icons.local_dining)),
        BottomNavigationBarItem(
            title: Text("我"), icon: Icon(Icons.person_outline)),
      ],
    );
  }
}
