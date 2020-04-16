import React from 'react';
import {DotIndicator} from 'react-native-indicators';
import {View, ImageBackground, BackHandler, Alert} from 'react-native';
import firebase from '../utils/firebase/firebase-db';

class AuthLoadingScene extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    const ref = firebase
      .firestore()
      .collection('users')
      .doc(this.state.uid);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          details: doc.data(),
          key: doc.id,
          isLoading: false,
        });
      } else {
        console.log('No such document!');
      }
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  //Handling Android Back Button Press in React Native
  onBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      key: '',
      details: {},
      uid: firebase.auth().currentUser.uid,
    };

    // eslint-disable-next-line no-console
    console.disableYellowBox = true;

    firebase.auth().onAuthStateChanged(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    if (this.state.loggedIn) {
      if (this.state.details.finished) {
        this.props.navigation.navigate('Navigation');
      } else if (!this.state.details.age) {
        this.props.navigation.navigate('UserInformation');
      } else if (
        !this.state.details.countries ||
        !this.state.details.languages ||
        !this.state.details.more
      ) {
        this.props.navigation.navigate('ExstraInformation');
      } else if (!this.state.details.mode) {
        this.props.navigation.navigate('TravelingDetails');
      } else if (this.state.details.mode && !this.state.details.finished) {
        this.props.navigation.navigate('Questions');
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
