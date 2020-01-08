import React, {Component} from 'react';
import {Text, View, TextInput, Alert, ImageBackground} from 'react-native';
import * as firebase from 'firebase';
import Button from './common/Button';
import {DotIndicator} from 'react-native-indicators';

export default class ForgotPasswordController extends Component {
  static navigationOptions = ({navigation}) => {};
  static defaultProps = {
    backgroundColor: '#fff',
    titleText: 'Forgot Password',
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

  /**
   * Validate email
   */
  validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  /**
   * Button submit pressed
   */
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

  /**
   * forgot pasword function
   */
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

  /**
   * Button close pressed
   */
  btnClosePress() {
    this.props.callbackAfterForgotPassword(0, this.props.otherParamsToSend);
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('./images/vanishing_hitchhiker2.jpg')}
          imageStyle={{opacity: 0.3}}
          style={{resizeMode: 'cover', flex: 1}}>
          <View>
            <Text
              style={{
                textAlign: 'left',
                color: '#fe5f55',
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'AmaticSC-Bold',
                marginTop: 20,
                marginLeft: 10,
              }}
              onPress={() => navigate('LoginForm')}>
              {'<<'} Back
            </Text>
          </View>
          <View>
            <View style={{paddingTop: 100}}>
              <TextInput
                style={{
                  borderColor: '#000',
                  borderRadius: 10,
                  position: 'relative',
                  borderWidth: 0.2,
                  fontSize: 15,
                  width: '80%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                  fontFamily: 'AmaticSC-Bold',
                }}
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
            </View>
            <View style={{paddingTop: 30}}>{this.renderButton()}</View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
