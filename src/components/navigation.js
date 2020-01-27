import React, {Component} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import UserProfile from './UserProfile';
import Matches from './Matches';

const HomeRoute = () => <Matches></Matches>;
const ChatRoute = () => <Text>chats:</Text>;
const ProfileRoute = () => <UserProfile></UserProfile>;

class Navigation extends Component {
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
