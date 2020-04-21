// import React from 'react';
// import {AppRegistry, Text, View, Button} from 'react-native';
// import {StackNavigator} from 'react-navigation';

// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome',
//   };
//   render() {
//     const {navigate} = this.props.navigation;
//     return (
//       <View>
//         <Text>Hello, Chat App!</Text>
//         <Button
//           onPress={() => navigate('Chat', {user: 'Lucy'})}
//           title="Chat with Lucy"
//         />
//       </View>
//     );
//   }
// }

// class ChatScreen extends React.Component {
//   // Nav options can be defined as a function of the screen's props:
//   static navigationOptions = ({navigation}) => ({
//     title: `Chat with ${navigation.state.params.user}`,
//   });
//   render() {
//     // The screen's current route is passed in to `props.navigation.state`:
//     const {params} = this.props.navigation.state;
//     return (
//       <View>
//         <Text>Chat with {params.user}</Text>
//       </View>
//     );
//   }
// }

// const SimpleAppNavigator = StackNavigator({
//   Home: {screen: HomeScreen},
//   Chat: {screen: ChatScreen},
// });

// const AppNavigation = () => <SimpleAppNavigator />;

// export default class App extends React.Component {
//   render() {
//     return <AppNavigation />;
//   }
// }

import React, {Component} from 'react';
import {DotIndicator} from 'react-native-indicators';
import {View, ImageBackground} from 'react-native';
// import {GiftedChat} from 'react-native-gifted-chat';
// import Backend from '../Backend';

class Chat extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.5}}
          style={{resizeMode: 'cover', flex: 1}}>
          <DotIndicator color="#fe5f55" />
        </ImageBackground>
      </View>
    );
  }
  //   constructor(props) {
  //     super(props);
  //     this.statestate = {
  //       messages: [],
  //     };
  //   }
  //   componentWillMount() {}
  //   render() {
  //     return (
  //       <GiftedChat
  //         messages={this.state.messages}
  //         onSend={message => {
  //           Backend.sendMessage(message);
  //         }}
  //         user={{
  //           _id: Backend.getUid(),
  //           name: this.props.name,
  //         }}
  //       />
  //     );
  //   }
  //   componentDidMount() {
  //     Backend.loadMessages(message => {
  //       this.setState(previousState => {
  //         return {
  //           messages: GiftedChat.append(previousState.messages, message),
  //         };
  //       });
  //     });
  //   }
  //   componentWillUnmount() {
  //     Backend.closeChat();
  //   }
  // }

  // Chat.defaultProps = {
  //   name: 'John Smith',
  // };

  // Chat.propTypes = {
  //   name: React.PropTypes.string,
  // };
}

export default Chat;
