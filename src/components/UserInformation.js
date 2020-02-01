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
} from 'react-native';
import {Button, CheckBox, Header} from 'react-native-elements';
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
      dateOfBirth: new Date(),
      maximumDate: new Date(),
      check: false,
      isLoading: false,
    };
  }

  handleDetails = () => {
    if (
      this.state.firstName === '' ||
      this.state.lastName === '' ||
      this.state.gender === '' ||
      this.state.gender === 'gender' ||
      this.state.age === 0
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
            age: '',
            dateOfBirth: new Date(),
            isLoading: false,
          }),
        )
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    }
  };

  // calculateAge() {
  //   var birthDate = new Date(this.state.dateOfBirth);
  //   var difference = Date.now() - birthDate.getTime();
  //   var ageDate = new Date(difference);
  //   var ageNum = Math.abs(ageDate.getUTCFullYear() - 1970);

  //   this.setState({age: ageNum}, () => {
  //     // this will have the latest this.state.age1
  //     console.log('Age:', this.state.age);
  //   });
  // }

  handleChange_age = dateOfBirth => {
    Alert.alert('here');
    console.log('DOB:', dateOfBirth);

    this.setState({dob1: dateOfBirth}, () => {
      // example of setState callback
      // this will have the latest this.state.dob1
      console.log(this.state.dob1);
    });

    // call calculate_age with event.target.value
    var age_latest = {age_latest: this.calculate_age(doc1)};
    console.log(age_latest);

    this.setState({age: age_latest}, () => {
      // this will have the latest this.state.age1
      console.log('Age:', this.state.age);
    });
  };

  calculate_age = date => {
    var today = new Date();
    var birthDate = new Date(date); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    var d = today.getDate() - birthDate.getDate();
    if (m < 0 || (m === 0 && d < 0)) {
      age_now--;
    }
    console.log(age_now);
    return age_now;
  };

  render() {
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
                value={this.state.firstName}
                onChangeText={firstName => this.setState({firstName})}
                placeholder={'first name'}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.inputBox}
                value={this.state.lastName}
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
                placeholder={this.state.date}
                format="DD/MM/YYYY"
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
                  this.setState({dateOfBirth: date});
                  this.setState({age: this.calculate_age(date)}, () =>
                    console.log(this.state.age),
                  );
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
                  onPress={() => console.log('Pressed')}
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
