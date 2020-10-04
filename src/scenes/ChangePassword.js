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
} from 'react-native';
import {Icon} from 'native-base';
import firebase from 'firebase';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: firebase.auth().currentUser.email,
      currentPassword: firebase.auth().currentUser,
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      error: '',
      checked: false,
    };
  }

  checkBoxPressed = () =>
    this.setState({
      checked: !this.state.checked,
    });

  checkDetails = () => {
    Alert.alert(this.state.currentPassword);
    console.log(this.state.currentUser);

    if (
      this.state.password === '' ||
      this.state.newPassword === '' ||
      this.state.confirmPassword === ''
    ) {
      Alert.alert('Fill all the details');
    } else if (this.state.currentPassword != this.state.password) {
      Alert.alert('Incorect password');
    } else if (
      this.state.newPassword === '' &&
      this.state.confirmNewPassword === ''
    ) {
      Alert.alert('Please enter password');
    } else if (this.state.newPassword != this.state.confirmNewPassword) {
      Alert.alert('Unmatched password');
    } else if (this.state.newPassword.length < 6) {
      Alert.alert('The password needs to be more than 6 chars');
    } else if (this.state.checked === false) {
      Alert.alert('Please agree the terms and conditions');
    } else {
      firebase
        .auth()
        .confirmPasswordReset(this.state.email, this.state.password)
        .then(this.onLoginSuccess.bind(this))
        .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            this.onChangeSuccess.bind(this)('Weak password!');
          } else {
            this.onChangeFailure.bind(this)(errorMessage);
          }
        });
    }
  };

  onChangeSuccess() {
    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      loading: false,
    });
    // this.props.navigation.navigate('UserInformation');
  }

  onChangeFailure(errorMessage) {
    this.setState({error: errorMessage, loading: false});
    Alert.alert('Login fail with error');
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
          <ScrollView style={styles.scroll}>
            <Icon
              name="arrow-back"
              style={{
                color: '#4f6367',
                marginLeft: 10,
                marginBottom: 10,
              }}
              onPress={() => goBack(params.go_back_key)}
            />

            <View style={styles.container}>
              <Text style={styles.inputBox}>{this.state.email}</Text>

              <TextInput
                style={styles.inputBox}
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                placeholder="Current Password"
                secureTextEntry={true}
              />
              <TextInput
                style={styles.inputBox}
                value={this.state.newPassword}
                onChangeText={newPassword => this.setState({newPassword})}
                placeholder="New Password"
                secureTextEntry={true}
              />
              <TextInput
                style={styles.inputBox}
                value={this.state.confirmNewPassword}
                onChangeText={confirmNewPassword =>
                  this.setState({confirmNewPassword})
                }
                placeholder="Confirm New password"
                secureTextEntry={true}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            // onPress={this.checkDetails}
          >
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity>
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
    marginTop: 10,
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
    marginBottom: 20,
    justifyContent: 'flex-end',
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
