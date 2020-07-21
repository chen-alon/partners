import React from 'react';
import {BottomNavigation} from 'react-native-paper';
import UserProfile from './UserProfile';
import Matches from './Matches';
import Chat from './Chat';

const HomeRoute = () => <Matches></Matches>;
const ChatRoute = () => <Chat></Chat>;
const ProfileRoute = () => <UserProfile></UserProfile>;

class Navigation extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'matches', title: 'Matches', icon: 'cards'},
      {key: 'chat', title: 'Chat', icon: 'chat'},
      {key: 'profile', title: 'Profile', icon: 'face'},
    ],
  };

  _handleIndexChange = index => this.setState({index});

  _renderScene = BottomNavigation.SceneMap({
    matches: HomeRoute,
    chat: ChatRoute,
    profile: ProfileRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        barStyle={{backgroundColor: '#4f6367'}}
      />
    );
  }
}

export default Navigation;

// import React from 'react';
// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons';
// import UserProfile from './UserProfile';
// import Matches from './Matches';
// import Chat from './Chat';

// // const HomeStack = createStackNavigator();
// // const ChatStack = createStackNavigator();
// // const ProfileStack = createStackNavigator();

// const Tab = createMaterialBottomTabNavigator();

// const Navigation = () => (
//   <Tab.Navigator initialRouteName="Matches" activeColor="#fff">
//     <Tab.Screen
//       name="Matches"
//       component={Matches}
//       options={{
//         tabBarLabel: 'Matches',
//         tabBarColor: '#009387',
//         tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
//       }}
//     />
//     <Tab.Screen
//       name="Chat"
//       component={Chat}
//       options={{
//         tabBarLabel: 'Updates',
//         tabBarColor: '#1f65ff',
//         tabBarIcon: ({color}) => (
//           <Icon name="notifications" color={color} size={26} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Profile"
//       component={UserProfile}
//       options={{
//         tabBarLabel: 'Profile',
//         tabBarColor: '#694fad',
//         tabBarIcon: ({color}) => <Icon name="person" color={color} size={26} />,
//       }}
//     />
//   </Tab.Navigator>
// );

// export default Navigation;

// const HomeStackScreen = ({navigation}) => (
//   <HomeStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#009387',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }}>
//     <HomeStack.Screen
//       name="Home"
//       component={Matches}
//       options={{
//         title: 'Overview',
//         headerLeft: () => (
//           <Icon.Button
//             name="ios-menu"
//             size={25}
//             backgroundColor="#009387"
//             onPress={() => navigation.openDrawer()}></Icon.Button>
//         ),
//       }}
//     />
//   </HomeStack.Navigator>
// );

// const ChatStackScreen = ({navigation}) => (
//   <ChatStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#1f65ff',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }}>
//     <ChatStack.Screen
//       name="Details"
//       component={Chat}
//       options={{
//         headerLeft: () => (
//           <Icon.Button
//             name="ios-menu"
//             size={25}
//             backgroundColor="#1f65ff"
//             onPress={() => navigation.openDrawer()}></Icon.Button>
//         ),
//       }}
//     />
//   </ChatStack.Navigator>
// );

// const ProfileStackScreen = ({navigation}) => (
//   <ProfileStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#009387',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }}>
//     <ProfileStack.Screen
//       name="Home"
//       component={UserProfile}
//       options={{
//         title: 'Overview',
//         headerLeft: () => (
//           <Icon.Button
//             name="ios-menu"
//             size={25}
//             backgroundColor="#009387"
//             onPress={() => navigation.openDrawer()}></Icon.Button>
//         ),
//       }}
//     />
//   </ProfileStack.Navigator>
// );
