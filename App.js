import React, {Component} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import firebase from 'firebase';
import Navigation from './src/components/Navigation';
import LoginFormNavigation from './src/components/LoginFormNavigation';

console.disableYellowBox = true;

class App extends Component {
  state = {loggedIn: null, flag: false};

  componentDidMount() {
    let config = {
      apiKey: 'AIzaSyAuD9ks-5V0k8cWULtri5LNpc3MpP6L1hs',
      authDomain: 'partner-f74cb.firebaseapp.com',
      databaseURL: 'https://partner-f74cb.firebaseio.com',
      projectId: 'partner-f74cb',
      storageBucket: 'partner-f74cb.appspot.com',
      messagingSenderId: '276035857295',
      appId: '1:276035857295:web:7577ae19b1c833313679fa',
      measurementId: 'G-7N3KY4B8MJ',
    };
    !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderComponent() {
    if (this.state.loggedIn) {
      return (
        <View style={styles.container}>
          <Navigation />
        </View>
        // <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
      );
    } else {
      return <LoginFormNavigation />;
    }
    // this.state.loggedIn ? <Navigation/> : <LoginForm/>
  }
  render() {
    return <View style={styles.container}>{this.renderComponent()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    // justifyContent: 'flex-end',
  },
});

export default App;
