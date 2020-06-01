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
import Navigation from './scenes/Navigation';

const MainNavigator = createStackNavigator(
  {
    AuthLoadingScene: {
      screen: AuthLoadingScene,
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
    Navigation: {
      screen: Navigation,
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
