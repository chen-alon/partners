import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginForm from './LoginForm';
import CreateUser from './CreateUser';
import UserProfile from './UserProfile';
import ForgotPasswordController from './ForgotPasswordController';

// import Navigation from './Navigation';
// import UserInformation from './UserInformation';
// import Questions from './Questions';

const MainNavigator = createStackNavigator(
  {
    LoginForm: {
      screen: LoginForm,
    },
    CreateUser: {
      screen: CreateUser,
    },
    Home: {
      screen: UserProfile,
    },
    ForgotPasswordController: {
      screen: ForgotPasswordController,
    },

    // UserInformation: {
    //   screen: UserInformation,
    // },

    // Questions: {
    //   screen: Questions,
    // },

    // Navigation: {
    //   screen: Navigation,
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
