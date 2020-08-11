import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginForm from './scenes/LoginForm';
import CreateUser from './scenes/CreateUser';
import ForgotPasswordController from './scenes/ForgotPasswordController';
import Questions from './scenes/Questions';
import UserInformation from './scenes/UserInformation';
import AuthLoadingScene from './scenes/AuthLoadingScene';
import ExstraInformation from './scenes/ExstraInformation';
import TravelingDetails from './scenes/TravelingDetails';
import Matches from './scenes/Matches';
import Chat from './scenes/Chat';
import UserProfile from './scenes/UserProfile';
import PartnerProfile from './scenes/PartnerProfile';
import Messages from './scenes/Messages';
import EditDetails from './scenes/EditDetails';
import AccountSettings from './scenes/AccountSettings';
import ResetPassword from './scenes/ResetPassword';
import ChangePassword from './scenes/ChangePassword';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

const Navigation = createMaterialBottomTabNavigator(
  {
    Matches: {screen: Matches},
    Chat: {screen: Chat},
    UserProfile: {screen: UserProfile},
  },
  {
    initialRouteName: 'Matches',
    activeColor: '#fff',
    barStyle: {backgroundColor: '#4f6367'},
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Matches') {
          iconName = 'ios-people';
        } else if (routeName === 'Chat') {
          iconName = 'ios-chatboxes';
        } else if (routeName === 'UserProfile') {
          iconName = 'ios-person';
        }
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    }),
  },
);
const MainNavigator = createStackNavigator(
  {
    AuthLoadingScene: {
      screen: AuthLoadingScene,
    },
    Navigation: {
      screen: Navigation,
    },
    LoginForm: {
      screen: LoginForm,
    },
    CreateUser: {
      screen: CreateUser,
    },
    ForgotPasswordController: {
      screen: ForgotPasswordController,
    },
    Questions: {
      screen: Questions,
    },
    UserInformation: {
      screen: UserInformation,
    },
    ExstraInformation: {
      screen: ExstraInformation,
    },
    TravelingDetails: {
      screen: TravelingDetails,
    },
    PartnerProfile: {
      screen: PartnerProfile,
    },
    Messages: {
      screen: Messages,
    },
    EditDetails: {
      screen: EditDetails,
    },
    AccountSettings: {
      screen: AccountSettings,
    },
    ResetPassword: {
      screen: ResetPassword,
    },
    ChangePassword: {
      screen: ChangePassword,
    },
  },

  {
    headerMode: 'none',
    initialRouteName: 'AuthLoadingScene',
    navigationOptions: {
      headerVisible: false,
      header: null,
    },
  },
);

export default createAppContainer(MainNavigator);
