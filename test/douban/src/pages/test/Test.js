import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class Test extends Component {
  _onPressReset() {
    this.props.reset1();
  }

  _onPressInc() {
    this.props.increase();
  }

  _onPressDec() {
    this.props.decrease();
  }

  componentDidMount() {
    this.props.getHomes(() => {
      console.log(this.props.itemData);
    })

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>{this.props.counter.count}</Text>
        <TouchableOpacity style={styles.reset} onPress={() => this._onPressReset()}>
          <Text>归零</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.start} onPress={() => this._onPressInc()}>
          <Text>加1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stop} onPress={() => this._onPressDec()}>
          <Text>减1</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({})

// const mapStateToProps = state => ({
//   counter: state.counter
// }, {reset1})

import {increase, decrease, reset1, getHomes} from '../../redux/actions';

export default connect(
  state => ({counter: state.counter}),
  {increase, decrease, reset1, getHomes})(Test);
