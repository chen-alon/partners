import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
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
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Messages from './scenes/Messages';

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
