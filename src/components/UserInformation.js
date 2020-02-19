import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Picker,
  Alert,
  ImageBackground,
  NativeAppEventEmitter,
} from 'react-native';
import {Header} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import {IconButton, Colors} from 'react-native-paper';
import firebase from 'firebase';
import 'firebase/firestore';

//import firebase, { secondFirebaseInstance } from "./Firebase";
//import { DotIndicator } from "react-native-indicators";

class UserInformation extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      age: 0,
      image: null,
      dateOfBirth: new Date(),
      maximumDate: new Date(),
      check: false,
      isLoading: false,
    };
  }

  handleDetails = async () => {
    if (
      this.state.firstName === '' ||
      this.state.lastName === '' ||
      this.state.gender === '' ||
      this.state.gender === 'gender'
      //this.state.age === 0
      //this.state.dateOfBirth === this.state.maximumDate
    ) {
      Alert.alert(
        'Missing details',
        // [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        // {cancelable: false},
      );
    } else {
      this.setState({
        isLoading: true,
      });

      // try {
      //   const post = {
      //     photo: this.state.image,
      //   };
      //   this.props.firebase.uploadPost(post);

      //   this.setState({
      //     image: null,
      //   });
      // } catch (e) {
      //   console.error(e);
      // }

      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          gender: this.state.gender,
          dateOfBirth: this.state.dateOfBirth,
          age: this.state.age,
        })
        .then(
          this.props.navigation.navigate('ExstraInformation'),
          this.setState({
            firstName: '',
            lastName: '',
            gender: '',
            age: 0,
            dateOfBirth: new Date(),
            isLoading: false,
            image: null,
          }),
        )
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    }
  };

  selectImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log(source);
        this.setState({
          image: source,
        });
      }
    });
    const cam_options = {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 1,
      noData: true,
    };
    ImagePicker.launchCamera(cam_options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        this.setState({
          imagePath: response.uri,
          imageHeight: response.height,
          imageWidth: response.width,
        });
      }
    });
  };

  calculateAge(dateOfBirth) {
    var birthDate = new Date(dateOfBirth);

    var difference = Date.now() - birthDate.getTime();
    var ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('./images/vanishing_hitchhiker2.jpg')}
          imageStyle={{opacity: 0.3}}
          style={{resizeMode: 'cover', flex: 1}}>
          <ScrollView style={styles.scroll}>
            <Header
              centerComponent={{
                text: 'Details',
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
                value={firebase.auth().currentUser.uid.firstName}
                onChangeText={firstName => this.setState({firstName})}
                placeholder={'first name'}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.inputBox}
                value={firebase.auth().currentUser.uid.lastName}
                onChangeText={lastName => this.setState({lastName})}
                placeholder={'last name'}
                autoCapitalize="none"
              />
              <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.gender}
                onValueChange={itemValue => this.setState({gender: itemValue})}>
                <Picker.Item label="gender" value="gender" />
                <Picker.Item label="male" value="male" />
                <Picker.Item label="female" value="female" />
              </Picker>

              <Text style={styles.date}>date of birth</Text>

              <DatePicker
                style={{width: 250, marginTop: 10}}
                date={this.state.dateOfBirth}
                mode="date"
                placeholder={this.state.dateOfBirth}
                //format="MM/DD/YYYY"
                minDate="01-01-1920"
                maxDate={this.state.maximumDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={date => {
                  this.setState({
                    dateOfBirth: date,
                    age: this.calculateAge(date),
                  });
                }}
              />

              {this.state.age != '0' ? (
                <View>
                  <Text style={styles.age}>age : {this.state.age}</Text>
                </View>
              ) : (
                <View></View>
              )}

              <View style={styles.pic}>
                <Text style={styles.text}>upload picture</Text>

                <IconButton
                  style={{paddingTop: 13}}
                  icon="camera"
                  color={Colors.red500}
                  size={25}
                  onPress={this.selectImage}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleDetails}>
              <Text style={styles.buttonText}>Countine</Text>
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
    backgroundColor: 'transparent',
  },

  container: {
    flex: 1,
    //backgroundColor: '#EEF5D8',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 4,
    //borderRadius: 10,
    //borderColor: '#fff',
  },

  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 18,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1.4,
    color: '#4f6367',
  },

  text: {
    fontSize: 16,
    color: '#4f6367',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },

  date: {
    width: '85%',
    padding: 15,
    fontSize: 16,
    color: '#4f6367',
    paddingBottom: 1,
    paddingTop: 20,
  },

  age: {
    fontSize: 15,
    color: '#4f6367',
    paddingTop: 6,
    fontWeight: 'bold',
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

  pickerStyle: {
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 20,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#bbd8d8',
  },

  pic: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
    // alignItems: 'flex-start',
    // alignSelf: 'flex-start'
  },
});

export default UserInformation;
