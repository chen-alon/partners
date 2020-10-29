import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
  Dimensions,
  Image,
  Linking,
  Button,
} from 'react-native';
import {Icon} from 'native-base';
import {CheckBox} from 'react-native-elements';
import firebase from 'firebase';

class CreateUser extends React.Component {
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
    } else if (
      this.state.password.length < 6 ||
      this.state.password.length > 18
    ) {
      Alert.alert(
        'The password needs to be more than 6 chars and maximum 18 chars',
      );
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
    this.props.navigation.navigate('UserInformation');
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
    Alert.alert('Login fail with error');
  }

  render() {
    const {state, goBack} = this.props.navigation;
    const params = state.params || {};

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/vanishing_hitchhiker2.jpg')}
          imageStyle={{opacity: 0.3}}
          style={styles.backgroundImage}>
          <ScrollView style={styles.scroll}>
            <Icon
              name="arrow-back"
              style={{
                color: '#4f6367',
                marginLeft: 10,
                marginTop: 10,
              }}
              onPress={() => goBack(params.go_back_key)}
            />
            <Image
              style={{alignSelf: 'center'}}
              source={require('../images/Register.png')}
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

            <Button
              color="#7a9e9f"
              title="Click Here To Open terms and conditions"
              onPress={() =>
                Linking.openURL(
                  'https://www.websitepolicies.com/policies/view/AUx0esQi',
                )
              }
            />

            <CheckBox
              containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
              textStyle={{fontSize: 13, color: '#4F6367'}}
              fontFamily="AmaticSC-Bold"
              checkedColor="#4F6367"
              center
              uncheckedColor="#4F6367"
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
  },
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 18,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
  },
  button: {
    position: 'relative',
    marginTop: 60,
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
});

export default CreateUser;
