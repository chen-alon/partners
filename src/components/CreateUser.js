import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
} from 'react-native';
import {Icon} from 'native-base';
import {CheckBox, Header} from 'react-native-elements';
import firebase from 'firebase';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      checked: false,
    };
  }

  checkBoxPressed = () =>
    this.setState({
      checked: !this.state.checked,
    });

  checkDetails = () => {
    if (this.state.email === '') {
      Alert.alert('Please enter email');
    } else if (
      this.state.password === '' &&
      this.state.confirmPassword === ''
    ) {
      Alert.alert('Please enter password');
    } else if (this.state.password != this.state.confirmPassword) {
      Alert.alert('Unmatched password');
    } else if (this.state.password.length < 6) {
      Alert.alert('The password needs to be more than 6 chars');
    } else if (this.state.checked === false) {
      Alert.alert('Please agree the terms and conditions');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(this.onLoginSuccess.bind(this))
        .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            this.onLoginFailure.bind(this)('Weak password!');
          } else {
            this.onLoginFailure.bind(this)(errorMessage);
          }
        });
    }
  };

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      loading: false,
    });
  }

  onLoginFailure(errorMessage) {
    this.setState({error: errorMessage, loading: false});
    Alert.alert('Login fail with error: ' + errorMessage);
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('./images/vanishing_hitchhiker2.jpg')}
          imageStyle={{opacity: 0.15}}
          style={{resizeMode: 'cover', flex: 1}}>
          <ScrollView style={styles.scroll}>
            <Icon
              name="arrow-back"
              style={{
                color: '#4f6367',
                marginLeft: 10,
                marginBottom: 10,
              }}
              onPress={() => navigate('LoginForm')}
            />

            <Header
              centerComponent={{
                text: 'Register',
                style: {
                  color: '#bbd8d8',
                  fontSize: 25,
                  fontWeight: 'bold',
                  paddingBottom: 20,
                },
              }}
              containerStyle={{
                backgroundColor: '#FE5F55',
                justifyContent: 'space-around',
                marginBottom: 10,
                borderRadius: 10,
                borderWidth: 4,
                borderColor: '#eef5d8',
              }}
            />

            <View style={styles.container}>
              <TextInput
                style={styles.inputBox}
                value={this.state.email}
                onChangeText={email => this.setState({email})}
                placeholder="Email"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.inputBox}
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                placeholder="Password"
                secureTextEntry={true}
              />
              <TextInput
                style={styles.inputBox}
                value={this.state.confirmPassword}
                onChangeText={confirmPassword =>
                  this.setState({confirmPassword})
                }
                placeholder="Confirm password"
                secureTextEntry={true}
              />
            </View>
            <CheckBox
              containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
              textStyle={{fontSize: 11, color: '#4F6367'}}
              fontFamily="AmaticSC-Bold"
              checkedColor="#4F6367"
              center
              title="Agree to terms and conditions"
              checked={this.state.checked}
              onPress={() => this.checkBoxPressed()}
            />
            <TouchableOpacity style={styles.button} onPress={this.checkDetails}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    padding: 20,
    //backgroundColor: '#7a9e9f',
  },

  checkBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bbd8d8',
  },

  container: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#eef5d8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderRadius: 5,
    borderColor: '#fff',
  },

  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
  },

  button: {
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 5,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FE5F55',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#bbd8d8',
  },

  buttonSignup: {
    fontSize: 12,
  },
});

export default CreateUser;
