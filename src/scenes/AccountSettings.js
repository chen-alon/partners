import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Alert,
  Dimensions,
} from 'react-native';
import {Icon} from 'native-base';
import firebase from 'firebase';

class AccountSettings extends React.Component {
  deleteAccount() {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        delete: true,
      })
      .then(() => firebase.auth().currentUser.delete())
      .catch(_ => {});
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

  disableAccount() {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        disable: true,
      })
      .then(
        this.props.navigation.navigate('LoginForm'),
        this.setState({
          disable: false,
        }),
      )
      .catch(console.log('Something worng'));
  }

  alertDisableAccount = () => {
    Alert.alert(
      //title
      'Disable account',
      //body
      'Are you sure you want to disable your account?',
      [
        {
          text: 'Yes',
          onPress: () => this.disableAccount(),
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
          style={styles.backgroundImage}>
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
                  onPress={this.alertDisableAccount.bind(this)}>
                  Disable your account
                </Text>
              </View>

              <View style={styles.boxText}>
                <Text
                  style={styles.text}
                  onPress={this.alertDeleteAccount.bind(this)}>
                  Delete your account
                </Text>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
  },
  scroll: {
    flex: 1,
    padding: 20,
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
