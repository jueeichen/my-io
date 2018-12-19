/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/mock/mockServer'
AppRegistry.registerComponent(appName, () => App);
