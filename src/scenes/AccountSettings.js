import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Icon} from 'native-base';
import firebase from 'firebase';

class AccountSettings extends React.Component {
  deleteAccount() {
    firebase
      .auth()
      .currentUser.delete()
      .then(function() {
        console.log('delete successful');

        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .delete();

        let userRef = this.database.ref(userId);
        userRef.remove();
        this.props.navigation.navigate('LoginForm');
      })
      .catch(function(error) {
        //console.error({error});
      });
  }

  alertDeleteAccount = () => {
    Alert.alert(
      //title
      'Delete account',
      //body
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Yes',
          onPress: () => this.deleteAccount(),
        },
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  render() {
    const {state, goBack} = this.props.navigation;
    const params = state.params || {};
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.3}}
          style={{resizeMode: 'cover', flex: 1}}>
          <View style={{flex: 1}}>
            <ScrollView style={styles.scroll}>
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

              <View style={styles.boxText}>
                <Text
                  style={styles.text}
                  onPress={() =>
                    this.props.navigation.navigate('ChangePassword')
                  }>
                  Change password
                </Text>
              </View>

              <View style={styles.boxText}>
                <Text
                  style={styles.text}
                  onPress={() =>
                    this.props.navigation.navigate('ResetPassword')
                  }>
                  Reset password
                </Text>
              </View>

              <View style={styles.boxText}>
                <Text
                  style={styles.text}
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPasswordController')
                  }>
                  Disable your account
                </Text>
              </View>

              <View style={styles.boxText}>
                <Button
                  buttonStyle={styles.deleteButton}
                  titleStyle={styles.deleteText}
                  title="Delete your account"
                  onPress={this.alertDeleteAccount.bind(this)}></Button>
                {/* <Button title={" Delete your account"} onPress={() => deleteAccount()} />
                  <Text
                    style={styles.text}
                    onPress={() => this.deleteAccount()}>
                   
                  </Text> */}
              </View>
            </ScrollView>
          </View>
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
  deleteButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  deleteText: {
    fontSize: 20,
    color: '#4f6367',
  },
  text: {
    fontSize: 20,
    color: '#4f6367',
    fontWeight: 'bold',
    padding: 10,
  },
  boxText: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    borderColor: '#d3d3d3',
    borderBottomWidth: 2,
  },
});

export default AccountSettings;
