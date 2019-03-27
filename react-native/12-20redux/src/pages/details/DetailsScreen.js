import React ,{Component} from "react";
import {StyleSheet, View, Text, Button} from 'react-native';
export default  class DetailsScreen extends Component {
  pushToNav = (navigation) => {
    this.props.navigation.push(navigation)
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... Test"
          onPress={() => this.pushToNav('Test')}
        />
        <Button
          title="Go to Details... Home"
          onPress={() => this.pushToNav('Home')}
        />
        <Button
          title="Go to Details... WebPage"
          onPress={() => this.pushToNav('WebPage')}
        />
      </View>
    );
  }
}