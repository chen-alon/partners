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
  Dimensions,
} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImageUrl: null,
      details: [],
      resourcePath: {},
    };
  }

  componentDidMount() {
    if (firebase.auth().currentUser) {
      this.readUserData();
    } else {
      this.setState({
        details: [],
        profileImageUrl: null,
        resourcePath: {},
      });
      this.props.navigation.navigate('LoginForm');
    }
  }

  alertDeleteImage = () => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove your profile picture?',
      [
        {
          text: 'Yes',
          onPress: () => this.deleteImage(),
        },
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  deleteImage() {
    firebase
      .storage()
      .ref('images')
      .child(`${firebase.auth().currentUser.uid}`)
      .delete()
      .then(() => this.setState({profileImageUrl: null}));

    return;
  }

  editImage = () => {
    var options = {
      title: 'Select Image',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        this.setState({
          profileImageUrl: res.uri,
        });

        this.uploadImage(res.uri)
          .then(() => this.setState({profileImageUrl: uri}))
          .catch(error => console.log(error));
      }
    });
  };

  async uploadImage(uri = 'application/octet-stream') {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(uri);
      const file = await response.blob();
      let upload = firebase
        .storage()
        .ref('images')
        .child(`${firebase.auth().currentUser.uid}`)
        .put(file);
      console.log(file);
      upload.on(
        'state_changed',
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

  readUserData() {
    firebase
      .storage()
      .ref('images')
      .child(firebase.auth().currentUser.uid)
      .getDownloadURL()
      .then(url => {
        //from url you can fetched the uploaded image easily
        this.setState({profileImageUrl: url});
      })
      .catch(() => console.log('No such image'));

    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            details: doc.data(),
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
          style={styles.backgroundImage}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.bodyContent}>
              {this.state.details.firstName === undefined ? (
                <View style={{flex: 1, paddingVertical: '70%'}}>
                  <DotIndicator color="#fe5f55" />
                </View>
              ) : (
                <View style={{marginTop: 30, alignItems: 'center'}}>
                  {this.state.profileImageUrl ? (
                    <View>
                      <Image
                        style={styles.avatar}
                        source={{uri: this.state.profileImageUrl}}
                      />
                      <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.alertDeleteImage}>
                          <View style={styles.deleteIcon}>
                            <Image
                              source={require('../images/icon_delete.png')}
                            />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.editImage}>
                          <View style={styles.uploadIcon1}>
                            <Image
                              style={{width: 60, height: 60}}
                              source={require('../images/icon_camera.png')}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <Image
                        style={styles.avatar}
                        source={require('../images/user.png')}
                      />
                      <TouchableOpacity onPress={this.editImage}>
                        <View style={styles.uploadIcon2}>
                          <Image
                            style={{width: 60, height: 60}}
                            source={require('../images/icon_camera.png')}
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
                          onGoBack: this.readUserData.bind(this),
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
                          onGoBack: this.readUserData.bind(this),
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
                        alignSelf: 'center',
                      }}
                      onPress={() =>
                        firebase
                          .auth()
                          .signOut()
                          .then(() => {
                            this.setState({
                              details: [],
                              profileImageUrl: null,
                              resourcePath: {},
                            });
                          })
                          .catch(console.log('Someting worng'))
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
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 200,
    alignSelf: 'center',
  },
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
    marginTop: 17,
  },
  info: {
    fontSize: 13,
    marginTop: 10,
    color: '#eef5d8',
    alignSelf: 'center',
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
  uploadIcon1: {
    marginTop: 10,
  },
  uploadIcon2: {
    marginLeft: 170,
    marginTop: 210,
  },
  deleteIcon: {
    marginLeft: 120,
    marginTop: 40,
  },
});

export default UserProfile;
