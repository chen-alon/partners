import React from 'react';
import {
  View,
  BackHandler,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import firebase from '../utils/firebase/firebase-db';

// eslint-disable-next-line no-console
console.disableYellowBox = true;
class AuthLoadingScene extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      details: {},
      loading: false,
    };
  }

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  // handling Android Back Button Press in React Native
  onBackPress = () => {
    // BackHandler.exitApp();
    return true;
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        this.setState({loggedIn: true, loading: true});
      } else {
        this.setState({loggedIn: false, details: {}, loading: false});
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
              loading: false,
            });
          } else {
            console.log('No such document!');
          }
        });
    }
  }

  renderContent() {
    if (this.state.loggedIn && !this.state.loading) {
      if (this.state.details.disable === true) {
        this.props.navigation.navigate('WelcomeBack');
      } else if (
        !this.state.details.delete &&
        (!this.state.details.disable || this.state.details.disable === false)
      ) {
        if (this.state.details.finished) {
          this.props.navigation.navigate('Navigation');
        } else if (!this.state.details.firstName) {
          this.props.navigation.navigate('UserInformation');
        } else if (!this.state.details.mode) {
          this.props.navigation.navigate('TravelingDetails');
        } else if (this.state.details.mode && !this.state.details.finished) {
          this.props.navigation.navigate('Questions');
        }
      }
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('../images/vanishing_hitchhiker2.jpg')}
        imageStyle={{opacity: 0.4}}
        style={styles.backgroundImage}>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            flex: 1,
          }}>
          {this.renderContent()}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
  },
});

export default AuthLoadingScene;
