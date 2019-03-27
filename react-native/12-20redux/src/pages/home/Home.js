import React, {Component} from 'react';
import {
  SectionList,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AppRegistry,
  TextInput
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
  'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class Home extends Component {
  state = {
    status: 1
  }
  custerPressHandler = () => {
    alert('你按下了按钮', this.state.status)
    console.log('躺尸好你个大傻逼')
  }
  sendWebSocketMsg = (msg) => {
    let ws = new WebSocket("ws://121.40.165.18:8800");
    ws.onopen = () => {
      ws.send('你好啊'); // send a message
    };
    ws.onmessage = e => {
      // a message was received
      const result = e.data;
      if (result) {// 成功
        const wsMsg = result;
        console.log(wsMsg);
      }
    }
  }

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <ScrollView>
        <View style={styles.container}>
          <SectionList
            sections={[
              {title: 'D', data: ['Devin']},
              {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />
          <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
            renderItem={({item}) => <Text style={{
              padding: 10,
              fontSize: 18,
              height: 44,
            }}>{item.key}</Text>}
          />
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <Image source={pic} style={{width: 193, height: 110}}/>
          <Greeting name='Rexxar'/>
          <Greeting name='Jaina'/>
          <Greeting name='Valeera'/>
          <Blink text='I love to blink'/>
          <Blink text='Yes blinking is so great'/>
          <Blink text='Why did they ever take this out of HTML'/>
          <Blink text='Look at me look at me look at me'/>
          {/*<View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>*/}
          {/*<View style={{width: 100, height: 100, backgroundColor: 'skyblue'}}/>*/}
          {/*<View style={{width: 150, height: 150, backgroundColor: 'steelblue'}}/>*/}
          {/*<View style={{width: 150, height: 150, backgroundColor: 'steelblue'}}/>*/}
          {/*<View style={{width: 150, height: 150, backgroundColor: 'steelblue'}}/>*/}
          {/*<View style={{width: 150, height: 150, backgroundColor: 'steelblue'}}/>*/}
          <View style={{flex: 1, height: 400, width: 200}}>
            <View style={{flex: 1, height: 10, width: 120, backgroundColor: 'powderblue'}}/>
            <View style={{flex: 2, height: 10, width: 20, backgroundColor: 'skyblue'}}/>
            <View style={{flex: 3, backgroundColor: 'steelblue'}}/>
          </View>
          <PizzaTranslator/>
          <Button
            onPress={() => {
              // Alert.alert("你点击了按钮！");
              console.log('傻逼躺尸好');
            }}
            title="操你大爷的终于不卡了！"
          />
          <TouchableOpacity style={{
            height: 40,
            width: 100,
            backgroundColor: 'green',
            justifyContent: 'center',
            borderRadius: 20
          }} onLongPress={this.custerPressHandler}>
            <Text style={{
              color: 'red',
              textAlign: 'center'
            }}>
              你他妈点我啊
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Hello {this.props.name}!</Text>
      </View>
    );
  }
}

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {isShowingText: true};

    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      this.setState(previousState => {
        return {isShowingText: !previousState.isShowingText};
      });
    }, 100000);
  }

  render() {
    // 根据当前showText的值决定是否显示text内容
    if (!this.state.isShowingText) {
      return null;
    }

    return (
      <Text>{this.props.text}</Text>
    );
  }
}

class PizzaTranslator extends Component {
  // constructor(props) {
  //   super(props);
  state = {text: '',
    response:''
  };
  sendWebSocketMsg = (msg) => {
    let ws = new WebSocket("ws://localhost:3000");
    ws.onopen = () => {
      ws.send(msg); // send a message
    };
    ws.onmessage = e => {
      // a message was received
      const result = e.data;
      if (result) {// 成功
        const wsMsg = result;
        console.log(wsMsg);
        this.setState({response:wsMsg})
      }
    }
  }

  // }
  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})  }
        />
        <TouchableOpacity style={{
          height: 40,
          width: 100,
          backgroundColor: 'green',
          justifyContent: 'center',
          borderRadius: 20
        }} onPress={() => this.sendWebSocketMsg(this.state.text)}>
          <Text style={{
            color: 'red',
            textAlign: 'center'
          }}>
            点我
          </Text>
        </TouchableOpacity>
        <Text style={{padding: 10, fontSize: 42}}>

          {this.state.response}
        </Text>
        <Text style={{padding: 10, fontSize: 42}}>

          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 375,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
