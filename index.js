/**
 * @forma
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import LoginForm from './src/components/LoginForm';
import CreateUser from './src/components/CreateUser.js';
import Navigation from './src/components/Navigation';
import UserInformation from './src/components/UserInformation';
import ForgotPasswordController from './src/components/ForgotPasswordController.js';
import HomePage from './src/components/HomePage.js';
import AboutUser from './src/components/AboutUser';
import Partners from './src/components/Partners.js';
import ExstraInformation from './src/components/ExstraInformation.js';
import Questions from './src/components/Questions.js';
import App from './App.js';
import UserProfile from './src/components/UserProfile.js';
import Chat from './src/components/Chat';
import LoginFormNavigation from './src/components/LoginFormNavigation';
import PartnerProfile from './src/components/PartnerProfile.js';
import UserDetail from './src/components/UserDetail.js';

AppRegistry.registerComponent('partners', () => App);
