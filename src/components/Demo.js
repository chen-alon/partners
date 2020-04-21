import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import firebase from '../utils/firebase/firebase-db';

// Init Firebase
let config = {
  apiKey: 'AIzaSyAuD9ks-5V0k8cWULtri5LNpc3MpP6L1hs',
  authDomain: 'partner-f74cb.firebaseapp.com',
  databaseURL: 'https://partner-f74cb.firebaseio.com',
  projectId: 'partner-f74cb',
  storageBucket: 'partner-f74cb.appspot.com',
  messagingSenderId: '276035857295',
  appId: '1:276035857295:web:7577ae19b1c833313679fa',
  measurementId: 'G-7N3KY4B8MJ',
};
firebase.initializeApp(config);
const storage = firebase.storage();

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = storage.ref('images').child(`${sessionId}`);

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, {type: `${mime};BASE64`});
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, {contentType: mime});
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error);
      });
  });
};

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _pickImage() {
    this.setState({uploadURL: ''});

    ImagePicker.launchImageLibrary({}, response => {
      uploadImage(response.uri)
        .then(url => this.setState({uploadURL: url}))
        .catch(error => console.log(error));
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {(() => {
          switch (this.state.uploadURL) {
            case null:
              return null;
            case '':
              return <ActivityIndicator />;
            default:
              return (
                <View>
                  <Image
                    source={{uri: this.state.uploadURL}}
                    style={styles.image}
                  />
                  <Text>{this.state.uploadURL}</Text>
                </View>
              );
          }
        })()}
        <TouchableOpacity onPress={() => this._pickImage()}>
          <Text style={styles.upload}>Upload</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    height: 200,
    resizeMode: 'contain',
  },
  upload: {
    textAlign: 'center',
    color: '#333333',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default Demo;
