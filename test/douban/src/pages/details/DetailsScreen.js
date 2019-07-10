import React ,{Component} from "react";
import {StyleSheet, View, Text, Button} from 'react-native';
export default  class DetailsScreen extends Component {
  pushToNav = (navigation) => {
    this.props.navigation.push(navigation)
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>
          潘老师你个大傻逼 原生app你懂个求求 weex的demo都启动不了.js
          </Text>
        <Button
          title="nav Test"
          onPress={() => this.pushToNav('Test')}
        />
        <Button
          title="nav Home"
          onPress={() => this.pushToNav('Home')}
        />
        <Button
          title="nav WebPage"
          onPress={() => this.pushToNav('WebPage')}
        />
      </View>
    );
  }
}