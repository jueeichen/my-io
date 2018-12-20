import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, Button, WebView} from 'react-native';

class webPage extends Component {
  pushToNav = (navigation) => {
    this.props.navigation.push(navigation)
  }
  getPostMessageByWebView = (data) => {
    let obj = JSON.parse(data)
    console.log(obj)
  }


  onLoadEnd = () => {
    this.refs.webview.postMessage = 'this is RN msg'
  }

  render() {
    return (
      <WebView
        source={{uri: 'http://192.168.1.3:3001/#/publicity?id=1&share=1&timestamp=' + new Date().getTime()}}
        style={{marginTop: 20}}
        onMessage={e => this.getPostMessageByWebView(e.nativeEvent.data)}
      />
    );
  }
}


const styles = StyleSheet.create({})

// const mapStateToProps = state => ({
//   counter: state.counter
// }, {reset1})

import {increase, decrease, reset1, getHomes, getLogin, sendWebSocketMsg} from '../../redux/actions';

export default connect(
  state => ({counter: state.counter}),
  {increase, decrease, reset1, getHomes, getLogin, sendWebSocketMsg})(webPage);