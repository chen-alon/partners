import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {Button} from 'react-native-paper';
import {DotIndicator} from 'react-native-indicators';
// import firebase from "firebase";
// import {
//   Container,
//   Content,
//   Header,
//   Body,
//   Left,
//   Input,
//   View
// } from "native-base";

class LoginForm extends Component {
  state = {
    loading: false,
    email: '',
    password: '',
  };

  onButtonPress() {
    const {email, password} = this.state;
    this.setState({error: '', loading: true});
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onLoginFail() {
    this.setState({loading: false});
    Alert.alert(
      'ERROR',
      'incorrect email or password',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <DotIndicator color="#4f6367" />;
    }
    return (
      <Button style={styles.login} onPress={this.onButtonPress.bind(this)}>
        {' '}
        LOGIN
      </Button>
    );
  }

  render() {
    return (
      <View>
        {/* <ImageBackground
                source={require("./images/start.jpg")}
                style={styles.backgroundImage}       
            /> */}

        <View style={{paddingTop: 200}}>
          <KeyboardAvoidingView behavior="position">
            <View style={styles.Content2}>
              <TextInput
                style={styles.inputContainer}
                textAlign="center"
                placeholder={'Email'}
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
            <View style={styles.Content2}>
              <TextInput
                style={styles.inputContainer}
                textAlign="center"
                placeholder={'Password'}
                placeholderStyle={{
                  fontFamily: 'AmaticSC-Bold',
                }}
                placeholderTextColor="#4f6367"
                secureTextEntry={true}
                autoCorrect={false}
                height={45}
                onChangeText={password => this.setState({password})}
                value={this.state.password}
              />
              <Text
                style={styles.forgetPassword}
                onPress={() => navigate('ForgotPasswordController')}>
                Forgot your password?
              </Text>
            </View>
            <View>{this.renderButton()}</View>
            <View>
              <Text style={styles.signIn}> Don't have an account yet?</Text>
              <Text
                onPress={() => navigate('CreateUser')}
                style={{
                  color: '#fe5f55',
                  fontSize: 18,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Create
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    //borderColor: '#000',
    //borderWidth: 0.2,
    //borderRadius: 10,
    //width: "80%",
    alignSelf: 'center',
    color: '#fe5f55',
    fontWeight: 'bold',
    marginTop: 17,
  },

  signIn: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fe5f55',
    alignSelf: 'center',
    marginTop: 50,
  },

  forgetPassword: {
    color: '#7a9e9f',
    fontSize: 12,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'AmaticSC-Bold',
  },

  inputContainer: {
    borderColor: '#000',
    borderRadius: 10,
    borderWidth: 0.2,
    fontSize: 22,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'AmaticSC-Bold',
  },

  Content2: {
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: 'center',
    // fontFamily: "AmaticSC-Bold"
  },

  backgroundImage: {
    opacity: 0.5,
    paddingTop: 580,
    resizeMode: 'cover',
  },
});

export default LoginForm;
