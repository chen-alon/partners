import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import firebase from 'firebase';

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      details: {},
    };

    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            details: doc.data(),
            isLoading: false,
          });
        } else {
          console.log('No such document!');
        }
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.5}}
          style={{resizeMode: 'cover', flex: 1}}>
          <ScrollView style={styles.scroll}>
            <View style={styles.container}>
              <View style={styles.header}></View>
              <Image
                style={styles.avatar}
                source={require('../images/user.png')}
              />
              <View>
                <View style={styles.bodyContent}>
                  {this.state.details.firstName === undefined ? (
                    <View>
                      <DotIndicator color="#fe5f55" />
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.name}>
                        {this.state.details.firstName +
                          ' ' +
                          this.state.details.lastName}
                      </Text>
                    </View>
                  )}

                  <Text style={styles.info}>hitchhiker / 2020</Text>
                  <Text style={styles.description}>
                    Let's find your partner for your next vacation
                  </Text>

                  <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={{color: '#eef5d8'}}>Edit profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={{color: '#eef5d8'}}>Ideal hitchhiker</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={{color: '#eef5d8'}}>Account settings</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: '#eef5d8',
                        fontSize: 20,
                        fontWeight: 'bold',
                        paddingBottom: 10,
                      }}
                      onPress={() =>
                        firebase
                          .auth()
                          .signOut()
                          .then(() => {
                            this.props.navigation.navigate('Login');
                          })
                          .catch(error =>
                            this.setState({errorMessage: error.message}),
                          )
                      }>
                      Sign Out
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
  header: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    height: 230,
    width: 230,
    borderRadius: 130,
    marginTop: 15,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fe5f55',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 32,
    color: '#696969',
    fontWeight: '600',
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  info: {
    fontSize: 13,
    color: '#eef5d8',
    marginTop: 10,
  },
  description: {
    fontSize: 13,
    color: '#696969',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    borderColor: '#b8d8d8',
    borderWidth: 1,
    backgroundColor: '#fe5f55',
  },
});

export default UserProfile;
