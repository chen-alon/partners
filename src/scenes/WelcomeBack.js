import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';
import firebase from 'firebase';

class WelcomeBack extends React.Component {
  press = async () => {
    firebase
      .firestore()
      .collection('users')
      .where('uid', '==', firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          {
            firebase
              .firestore()
              .collection('users')
              .doc(`${doc.id}`)
              .update({
                disable: false,
              })
              .then(() => {
                this.setState({
                  disable: this.state.disable,
                });
              });
            this.props.navigation.navigate('Navigation');
          }
        });
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/vanishing_hitchhiker2.jpg')}
          imageStyle={{opacity: 0.3}}
          style={styles.backgroundImage}>
          <View style={styles.view}>
            <TouchableHighlight onPress={this.press}>
              <Image
                style={{alignSelf: 'center'}}
                source={require('../images/WelcomeBack.png')}
              />
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </View>
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
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
  },
});

export default WelcomeBack;
