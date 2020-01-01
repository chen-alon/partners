import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginForm from './LoginForm';
import CreateUser from './CreateUser';
import UserProfile from './UserProfile';
import Navigation from './Navigation';

// import ForgotPasswordController from './ForgotPasswordController';

const MainNavigator = createStackNavigator(
  {
    LoginForm: {
      screen: LoginForm,
    },
    CreateUser: {
      screen: CreateUser,
    },

    Profile: {
      screen: UserProfile,
    },

    Navigation: {
      screen: Navigation,
    },

    // ForgotPasswordController: {
    //   screen: ForgotPasswordController,
    // },
  },

  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const LoginFormNavigation = createAppContainer(MainNavigator);

export default LoginFormNavigation;
