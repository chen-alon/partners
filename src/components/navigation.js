import React, {Component} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import UserProfile from './UserProfile';

const HomeRoute = () => <Text>jfjhjh</Text>;
const ChatRoute = () => <Text>Albums</Text>;
const ProfileRoute = () => <UserProfile></UserProfile>;

export default class Navigation extends Component {
  state = {
    index: 0,
    routes: [
      {key: 'home', title: 'Home', icon: 'cards'},
      {key: 'chat', title: 'Chat', icon: 'chat'},
      {key: 'profile', title: 'Profile', icon: 'face'},
    ],
  };

  _handleIndexChange = index => this.setState({index});

  _renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
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
