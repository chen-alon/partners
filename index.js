/**
 * @forma
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './src/App';
import {name} from './app.json';

import PartnerProfile from './src/components/PartnerProfile.js';
// import Chat from './src/components/Chat.js';

AppRegistry.registerComponent(name, () => App);
