import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginForm from './LoginForm';
import CreateUser from './CreateUser';
import UserProfile from './UserProfile';
// import Navigation from './Navigation';
// import UserInformation from './UserInformation';
// import Questions from './Questions';

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

    // UserInformation: {
    //   screen: UserInformation,
    // },

    // Questions: {
    //   screen: Questions,
    // },

    // Navigation: {
    //   screen: Navigation,
    // },

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
