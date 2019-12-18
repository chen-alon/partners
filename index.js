/**
 * @forma
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import LoginForm from './src/components/LoginForm';
import chen from "./src/components/LoginForm";
import CreateUser from './src/components/CreateUser.js';
import Navigation from './src/components/navigation'
import UserInformation from './src/components/UserInformation'
import ForgotPasswordController from './src/components/ForgotPasswordController.js';
import HomePage from './src/components/HomePage.js';
import { Card } from 'react-native-paper';
import AboutUser from './src/components/AboutUser';
import Partners from './src/components/Partners.js';


AppRegistry.registerComponent('partners', () => Partners);