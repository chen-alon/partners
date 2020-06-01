import React from 'react';
import {DotIndicator} from 'react-native-indicators';
import {View, BackHandler, Alert} from 'react-native';
import firebase from '../utils/firebase/firebase-db';

// eslint-disable-next-line no-console
console.disableYellowBox = true;
class AuthLoadingScene extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      loading: false,
      details: {},
    };
  }

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        this.setState({loggedIn: true, loading: true});
      } else {
        this.setState({loggedIn: false, loading: false});
        this.props.navigation.navigate('LoginForm');
      }
      if (user != null) this.retrieveData();
    });
  }

  // retrieve data from firebase
  retrieveData() {
    if (this.state.loggedIn) {
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.setState({
              details: doc.data(),
            });
          } else {
            console.log('No such document!');
          }
        });
    }
  }

  // handling Android Back Button Press in React Native
  onBackPress = () => {
    // BackHandler.exitApp();
    return true;
  };

  renderContent() {
    if (this.state.loggedIn) {
      if (!this.state.details.age) {
        this.props.navigation.navigate('UserInformation');
      } else if (!this.state.details.mode) {
        this.props.navigation.navigate('TravelingDetails');
      } else if (this.state.details.mode && !this.state.details.finished) {
        this.props.navigation.navigate('Questions');
      } else if (this.state.details.finished) {
        this.props.navigation.navigate('Navigation');
      }
    } else {
      this.props.navigation.navigate('LoginForm');
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        {this.renderContent()}
      </View>
    );
  }
}

export default AuthLoadingScene;
