import React from 'react';
import firebase from 'firebase';
import {CONFIG_ANDROID} from '../utils/firebase/constants';
import {DotIndicator} from 'react-native-indicators';
import {View, ImageBackground, BackHandler, Alert} from 'react-native';

class AuthLoadingScreen extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
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
    // eslint-disable-next-line no-console
    console.disableYellowBox = true;

    !firebase.apps.length
      ? firebase.initializeApp(CONFIG_ANDROID)
      : firebase.app();

    firebase.auth().onAuthStateChanged(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        props.navigation.navigate('UserInformation');
      } else {
        props.navigation.navigate('LoginForm');
      }
    });
    !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/vanishing_hitchhiker2.jpg')}
          imageStyle={{opacity: 0.3}}
          style={{
            resizeMode: 'cover',
            flex: 1,
            justifyContent: 'center',
          }}>
          <View>
            <DotIndicator color="#fe5f55" />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default AuthLoadingScreen;
