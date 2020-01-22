import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import firebase from 'firebase';
import {Button} from 'react-native-elements';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      error: '',
    };
  }

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
      return <DotIndicator color="#fe5f55" />;
    }
    return (
      <Button
        buttonStyle={styles.login}
        title="Sign Up"
        onPress={this.onButtonPress.bind(this)}></Button>
    );
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.background}>
        <ImageBackground
          source={require('./images/vanishing_hitchhiker2.jpg')}
          imageStyle={{opacity: 0.3}}
          style={styles.backgroundImage}>
          <View
            style={{
              justifyContent: 'center',
              paddingTop: 180,
            }}>
            <KeyboardAvoidingView behavior="padding">
              <Text style={styles.title}>hitchhiker</Text>
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
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    //borderWidth: 0.2,
    borderRadius: 10,
    width: '30%',
    alignSelf: 'center',
    color: '#eef5d8',
    fontWeight: 'bold',
    backgroundColor: '#fe5f55',
    marginBottom: 15,
  },

  background: {
    flex: 1,
  },

  signIn: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fe5f55',
    alignSelf: 'center',
    marginTop: 40,
  },

  title: {
    alignSelf: 'center',
    fontFamily: 'LongCang-Regular',
    fontSize: 40,
    color: '#4f6367',
    marginBottom: 15,
    backgroundColor: 'transparent',
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
    resizeMode: 'cover',
    flex: 1,
    //justifyContent: 'center',
  },
});

export default LoginForm;
