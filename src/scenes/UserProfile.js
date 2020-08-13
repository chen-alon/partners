import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import ImagePicker from 'react-native-image-picker';
//to refresh component when any change
import firebase from 'firebase';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      details: [],
    };
  }

  editImage() {
    this.setState({uploadURL: ''});

    ImagePicker.launchImageLibrary({}, response => {
      this.uploadImage(response.uri)
        .then(url => {
          console.log('chechurlt', url);
          this.setState({uploadURL: uri});
        })
        .catch(error => console.log(error));
    });
  }

  async uploadImage(uri = 'application/octet-stream') {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(uri);
      const file = await response.blob();
      let upload = firebase
        .storage()
        .ref('images')
        .child(`${firebase.auth().currentUser.uid}`)
        .put(file);
      upload.on(
        'state_changed',
        //snapshot => {},
        err => {
          reject(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          resolve(url);
        },
      );
    });
  }

  renderDetails() {
    let imageRef = firebase
      .storage()
      .ref('images')
      .child(firebase.auth().currentUser.uid);
    imageRef
      .getDownloadURL()
      .then(url => {
        //from url you can fetched the uploaded image easily
        this.setState({profileImageUrl: url});
      })
      .catch(e => console.log('getting downloadURL of image error => ', e));

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

  componentDidMount() {
    this.renderDetails();

    this.unsubscribe = firebase
      .firestore()
      .collection('users')
      .onSnapshot(this.renderDetails);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.5}}
          style={{resizeMode: 'cover', flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.bodyContent}>
              {this.state.details.firstName === undefined ? (
                <View style={{flex: 1, paddingVertical: '70%'}}>
                  <DotIndicator color="#fe5f55" />
                </View>
              ) : (
                <View style={{alignItems: 'center', marginTop: 30}}>
                  {this.state.profileImageUrl ? (
                    <View>
                      <Image
                        style={styles.avatar}
                        source={{uri: this.state.profileImageUrl}}
                      />
                      <TouchableOpacity onPress={() => this.editImage()}>
                        <View style={styles.uploadIcon}>
                          <Image
                            style={styles.icon}
                            source={require('../images/edit.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <Image
                        style={styles.avatar}
                        source={require('../images/user.png')}
                      />
                      <TouchableOpacity onPress={() => this.editImage()}>
                        <View style={styles.uploadIcon}>
                          <Image
                            style={styles.icon}
                            source={require('../images/edit.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  <Text style={styles.name}>
                    {this.state.details.firstName +
                      ' ' +
                      this.state.details.lastName}
                  </Text>
                  <TouchableOpacity style={styles.buttonContainer}>
                    <Text
                      style={{color: '#eef5d8'}}
                      onPress={() =>
                        this.props.navigation.navigate('EditDetails', {
                          ...this.state.details,
                          onGoBack: this.renderDetails.bind(this),
                        })
                      }>
                      Edit profile
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer}>
                    <Text
                      style={{color: '#eef5d8'}}
                      onPress={() =>
                        this.props.navigation.navigate('EditTravelingDetails', {
                          ...this.state.details,
                        })
                      }>
                      Ideal hitchhiker
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer}>
                    <Text
                      style={{color: '#eef5d8'}}
                      onPress={() =>
                        this.props.navigation.navigate('AccountSettings', {
                          ...this.state.details,
                        })
                      }>
                      Account settings
                    </Text>
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
                            this.setState({details: []});
                            this.props.navigation.navigate('LoginForm');
                          })
                          .catch(error =>
                            this.setState({errorMessage: error.message}),
                          )
                      }>
                      Sign Out
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.info}>hitchhiker / 2020</Text>
                  <Text style={styles.description}>
                    Let's find your partner for your next vacation
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#fe5f55',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 20,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 32,
    color: '#696969',
    fontWeight: '600',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  info: {
    fontSize: 13,
    marginTop: 10,
    color: '#eef5d8',
  },
  description: {
    fontSize: 13,
    color: '#eef5d8',
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
  uploadIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#dcdcdc',
    borderRadius: 40,
    elevation: 15,
    borderWidth: 2,
    borderColor: '#fff',
    color: '#4f6367',
    alignSelf: 'center',
    marginLeft: 180,
    marginTop: 220,
  },
  icon: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
});

export default UserProfile;
