import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
  Keyboard,
  Image,
  ScrollView,
} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import firebase from 'firebase';
import {Button} from 'react-native-elements';

class LoginForm extends React.Component {
  state = {email: '', password: '', error: '', loading: false};

  onButtonPress() {
    Keyboard.dismiss();

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
        buttonStyle={styles.signUp}
        title="Sign Up"
        onPress={this.onButtonPress.bind(this)}></Button>
    );
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/vanishing_hitchhiker2.jpg')}
          imageStyle={{opacity: 0.3}}
          style={styles.backgroundImage}>
          <ScrollView>
            <View
              style={{
                justifyContent: 'center',
                paddingTop: 70,
              }}>
              <KeyboardAvoidingView behavior="padding">
                <Image
                  style={{alignSelf: 'center'}}
                  source={require('../images/hitchhiker.png')}
                />
                <View style={styles.content}>
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
                <View style={styles.content}>
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
              </KeyboardAvoidingView>
              <View>
                <Text style={styles.signIn}> Don't have an account yet?</Text>
                <Text
                  onPress={() => navigate('CreateUser')}
                  style={{
                    color: '#fe5f55',
                    fontSize: 18,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    position: 'relative',
                  }}>
                  Create
                </Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signUp: {
    borderRadius: 10,
    width: '30%',
    alignSelf: 'center',
    color: '#eef5d8',
    fontWeight: 'bold',
    backgroundColor: '#fe5f55',
  },
  signIn: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fe5f55',
    alignSelf: 'center',
    position: 'relative',
    paddingTop: 60,
    bottom: 0,
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
    fontSize: 16,
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
  content: {
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
  },
});

export default LoginForm;
