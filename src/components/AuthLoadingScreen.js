import React, {Component} from 'react';
import firebase from 'firebase';
import {DotIndicator} from 'react-native-indicators';
import {View, ImageBackground} from 'react-native';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
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
        if (true) {
          // if answered all questions
          props.navigation.navigate('UserInformation');
        }
      } else {
        props.navigation.navigate('LoginForm');
        // const ref = firebase
        //   .firestore()
        //   .collection('users')
        //   .doc(JSON.parse(navigation.getParam('LastName')));
        // ref.get().then(doc => {
        //   if (doc.exists) {
        //     props.navigation.navigate('LoginForm');
        //     this.setState({
        //       key: doc.id,
        //       isLoading: false,
        //     });
        //   } else {
        //     //console.log("No such document!");
        //     props.navigation.navigate('UserInformation');
        //   }
        // });
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('./images/vanishing_hitchhiker2.jpg')}
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
