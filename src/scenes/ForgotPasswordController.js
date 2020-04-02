import React from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as firebase from 'firebase';
import Button from '../components/common/Button';
import {DotIndicator} from 'react-native-indicators';

class ForgotPasswordController extends React.Component {
  static defaultProps = {
    submitText: 'send',
    placeHolderText: 'example@domain.com',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
          this.btnSubmitPress();
          this.setState({spinner: true});
        }}>
        send
      </Button>
    );
  }

  //Validate email
  validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  //Button submit pressed
  btnSubmitPress() {
    if (this.state.email.trim().length == 0) {
      Alert.alert(
        'Reset Password',
        'Please enter the email address',
        [{text: 'OK', onPress: () => this.setState({spinner: false})}],
        {cancelable: false},
      );
    } else if (this.validateEmail(this.state.email) == false) {
      Alert.alert(
        'Reset Password',
        'The email address does not exist in the system',
        [{text: 'OK', onPress: () => this.setState({spinner: false})}],
        {cancelable: false},
      );
    } else {
      this.callForgotPassword();
    }
  }

  //Forgot pasword function
  callForgotPassword() {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function(username) {
        Alert.alert(
          'Reset Password',
          'A password renewal email has been sent to the email address you entered',
          [{text: 'OK', onPress: () => this.setState({spinner: false})}],
          {cancelable: false},
        );
        username.sendEmailVerification();
      })
      .catch(e => {
        alert(e);
        this.setState({spinner: false});
      });
  }

  //Button close pressed
  btnClosePress() {
    this.props.callbackAfterForgotPassword(0, this.props.otherParamsToSend);
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/vanishing_hitchhiker2.jpg')}
          imageStyle={{opacity: 0.3}}
          style={{resizeMode: 'cover', flex: 1}}>
          <ScrollView style={{flex: 1, padding: 20}}>
            <Text
              style={styles.backButton}
              onPress={() => navigate('LoginForm')}>
              {'<<'} Back
            </Text>
            <Text style={styles.header}>Forgot Password</Text>

            <View style={{paddingTop: 100}}>
              <TextInput
                style={styles.inputBox}
                autoCorrect={false}
                keyboardType={'email-address'}
                textAlign="center"
                placeholder={this.props.placeHolderText}
                placeholderStyle={{
                  fontFamily: 'AmaticSC-Bold',
                }}
                placeholderTextColor="#4f6367"
                height={45}
                autoCorrect={false}
                onChangeText={email => this.setState({email})}
                value={this.state.email}
              />
              <View style={{paddingTop: 30}}>{this.renderButton()}</View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    borderColor: '#000',
    borderRadius: 10,
    position: 'relative',
    borderWidth: 0.2,
    fontSize: 16,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'AmaticSC-Bold',
  },

  header: {
    color: '#7a9e9f',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  backButton: {
    textAlign: 'left',
    color: '#fe5f55',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'AmaticSC-Bold',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
  },
});

export default ForgotPasswordController;