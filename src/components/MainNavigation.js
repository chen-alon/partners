import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginForm from './LoginForm';
import CreateUser from './CreateUser';
import ForgotPasswordController from './ForgotPasswordController';
import Questions from './Questions';
import Navigation from './Navigation';
import UserInformation from './UserInformation';
import AuthLoadingScreen from './AuthLoadingScreen';
import ExstraInformation from './ExstraInformation';
import TravelingDetails from './TravelingDetails';

const MainNavigator = createStackNavigator(
  {
    AuthLoadingScreen: {
      screen: AuthLoadingScreen,
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
    initialRouteName: 'AuthLoadingScreen',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(MainNavigator);
