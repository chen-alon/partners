// import React, {Component} from 'react';
// import {Image, View} from 'react-native';
// import {Text, Button, Input} from 'react-native-ui-kitten';
// import ImagePicker from 'react-native-image-picker';
// import {withFirebaseHOC} from '../utils';

// class AddPost extends Component {
//   state = {
//     image: null,
//     title: '',
//   };

//   onChangeTitle = title => {
//     this.setState({title});
//   };

//   selectImage = () => {
//     const options = {
//       noData: true,
//     };
//     ImagePicker.launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         const source = {uri: response.uri};
//         console.log(source);
//         this.setState({
//           image: source,
//         });
//       }
//     });
//   };

//   onSubmit = async () => {
//     try {
//       const post = {
//         photo: this.state.image,
//         title: this.state.title,
//       };
//       this.props.firebase.uploadPost(post);

//       this.setState({
//         image: null,
//         title: '',
//         description: '',
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };
//   render() {
//     return (
//       <View style={{flex: 1, marginTop: 60}}>
//         {this.state.image ? (
//           <Image
//             source={this.state.image}
//             style={{width: '100%', height: 300}}
//           />
//         ) : (
//           <Button
//             onPress={this.selectImage}
//             style={{
//               alignItems: 'center',
//               padding: 10,
//               margin: 30,
//             }}>
//             Add an image
//           </Button>
//         )}
//       </View>
//     );
//   }
// }

// export default withFirebaseHOC(AddPost);
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  AsyncStorage,
  Dimensions,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from '../../../components/Firebase';
import uuid from 'uuid/v4'; // Import UUID to generate UUID

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const ImageRow = ({image, windowWidth, popImage}) => (
  <View>
    <Image
      source={{uri: image}}
      style={[styles.img, {width: windowWidth / 2 - 15}]}
      onError={popImage}
    />
  </View>
);

export default class AddPost extends Component {
  state = {
    imgSource: '',
    uploading: false,
    progress: 0,
    images: [],
  };
  componentDidMount() {
    let images;
    AsyncStorage.getItem('images')
      .then(data => {
        images = JSON.parse(data) || [];
        this.setState({
          images: images,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  /**
   * Select image method
   */
  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('You cancelled image picker 😟');
      } else if (response.error) {
        alert('And error occured: ', response.error);
      } else {
        const source = {uri: response.uri};
        this.setState({
          imgSource: source,
          imageUri: response.uri,
        });
      }
    });
  };
  /**
   * Upload image method
   */
  uploadImage = () => {
    const ext = this.state.imageUri.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${ext}`; // Generate unique name
    this.setState({uploading: true});
    firebase
      .storage()
      .ref(`tutorials/images/${filename}`)
      .putFile(this.state.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100, // Calculate progress percentage
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            const allImages = this.state.images;
            allImages.push(snapshot.downloadURL);
            state = {
              ...state,
              uploading: false,
              imgSource: '',
              imageUri: '',
              progress: 0,
              images: allImages,
            };
            AsyncStorage.setItem('images', JSON.stringify(allImages));
          }
          this.setState(state);
        },
        error => {
          unsubscribe();
          alert('Sorry, Try again.');
        },
      );
  };
  /**
   * Remove image from the state and persistance storage
   */
  removeImage = imageIndex => {
    let images = this.state.images;
    images.pop(imageIndex);
    this.setState({images});
    AsyncStorage.setItem('images', JSON.stringify(images));
  };
  render() {
    const {uploading, imgSource, progress, images} = this.state;
    const windowWidth = Dimensions.get('window').width;
    const disabledStyle = uploading ? styles.disabledBtn : {};
    const actionBtnStyles = [styles.btn, disabledStyle];
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity
              style={actionBtnStyles}
              onPress={this.pickImage}
              disabled={uploading}>
              <View>
                <Text style={styles.btnTxt}>Pick image</Text>
              </View>
            </TouchableOpacity>
            {/** Display selected image */}
            {imgSource !== '' && (
              <View>
                <Image source={imgSource} style={styles.image} />
                {uploading && (
                  <View style={[styles.progressBar, {width: `${progress}%`}]} />
                )}
                <TouchableOpacity
                  style={actionBtnStyles}
                  onPress={this.uploadImage}
                  disabled={uploading}>
                  <View>
                    {uploading ? (
                      <Text style={styles.btnTxt}>Uploading ...</Text>
                    ) : (
                      <Text style={styles.btnTxt}>Upload image</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View>
              <Text
                style={{
                  fontWeight: '600',
                  paddingTop: 20,
                  alignSelf: 'center',
                }}>
                {images.length > 0
                  ? 'Your uploaded images'
                  : 'There is no image you uploaded'}
              </Text>
            </View>
            <FlatList
              numColumns={2}
              style={{marginTop: 20}}
              data={images}
              renderItem={({item: image, index}) => (
                <ImageRow
                  windowWidth={windowWidth}
                  image={image}
                  popImage={() => this.removeImage(index)}
                />
              )}
              keyExtractor={index => index}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  btn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgb(3, 154, 229)',
    marginTop: 20,
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: 'rgba(3,155,229,0.5)',
  },
  btnTxt: {
    color: '#fff',
  },
  image: {
    marginTop: 20,
    minWidth: 200,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#ccc',
  },
  img: {
    flex: 1,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#ccc',
  },
  progressBar: {
    backgroundColor: 'rgb(3, 154, 229)',
    height: 3,
    shadowColor: '#000',
  },
});
