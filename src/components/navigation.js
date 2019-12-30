import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';

const PartnersRoute = () => <Text></Text>;
const ChatRoute = () => <Text>Albums</Text>;
const ProfileRoute = () => <Text>Recents</Text>;

export default class Navigation extends Component {
  state = {
    index: 0,
    routes: [
      {key: 'partners', title: 'Partners', icon: 'gtg'},
      {key: 'chat', title: 'Chat', icon: 'history'},
      {key: 'profile', title: 'Profile', icon: 'dcf'},
    ],
  };

  _handleIndexChange = index => this.setState({index});

  _renderScene = BottomNavigation.SceneMap({
    partners: PartnersRoute,
    conversations: ChatRoute,
    profile: ProfileRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}
