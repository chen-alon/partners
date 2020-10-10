import React from 'react';
import {
  Text,
  View,
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Icon} from 'native-base';
import firebase from 'firebase';
import Button from '../components/common/Button';
import {DotIndicator} from 'react-native-indicators';

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: firebase.auth().currentUser.email,
      spinner: false,
    };
  }

  renderButton() {
    if (this.state.spinner) {
      return <DotIndicator color="#fe5f55" />;
    }
    return (
      <Button
        onPress={() => {
          this.callForgotPassword();
          this.setState({spinner: true});
        }}>
        Reset
      </Button>
    );
  }

  //forgot pasword function
  callForgotPassword() {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        Alert.alert(
          'Reset Password',
          'A password renewal message has been sent to the email account you have successfully entered.',
          [{text: 'OK', onPress: () => this.setState({spinner: false})}],
          {cancelable: false},
        );
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const {state, goBack} = this.props.navigation;
    const params = state.params || {};

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.4}}
          style={styles.backgroundImage}>
          <ScrollView style={{flex: 1, padding: 20}}>
            <Icon
              name="arrow-back"
              style={{
                color: '#4f6367',
                marginLeft: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
              onPress={() => goBack(params.go_back_key)}
            />

            <View style={{alignContent: 'center', paddingTop: '50%'}}>
              <Text style={styles.email}>{this.state.email}</Text>
              <View>{this.renderButton()}</View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  email: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#4f6367',
    padding: 10,
  },
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
  },
});
