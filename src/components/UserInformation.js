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
} from 'react-native';
import {Button, CheckBox, Header} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {IconButton, Colors} from 'react-native-paper';
import firebase from 'firebase';
import 'firebase/firestore';

//import firebase, { secondFirebaseInstance } from "./Firebase";
//import { DotIndicator } from "react-native-indicators";

class UserInformation extends Component {
  static navigationOptions = {
    title: 'Details',
    headerStyle: {
      backgroundColor: '#F8F8F8',
    },
    // headerTintColor: '#005D93',
    // headerTitleStyle: {
    //     fontSize: 26,
    //     color: "#005D93",
    //     fontFamily: "AmaticSC-Bold"
    // },
  };

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
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
      this.state.dateOfBirth === ''
    ) {
      Alert.alert('Missing details');
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
        })
        .then(
          this.props.navigation.navigate('ExstraInformation'),
          this.setState({
            isLoading: false,
          }),
        )
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    }
  };

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={styles.activity}>
    //       <DotIndicator color="#004577" />
    //     </View>
    //   );
    // }
    return (
      <ScrollView style={styles.scroll}>
        <Header
          centerComponent={{
            text: 'Details',
            style: {color: '#bbd8d8', fontSize: 30, fontWeight: 'bold'},
          }}
          containerStyle={{
            backgroundColor: '#FE5F55',
            justifyContent: 'space-around',
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
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({dateOfBirth: date});
            }}
          />

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

          <TouchableOpacity style={styles.button} onPress={this.handleDetails}>
            <Text style={styles.buttonText}>Countine</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    padding: 20,
    backgroundColor: '#7a9e9f',
  },

  container: {
    flex: 1,
    backgroundColor: '#EEF5D8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    color: '#4f6367',
  },

  text: {
    fontSize: 16,
    color: '#4f6367',
    paddingBottom: 5,
    paddingTop: 20,
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

  button: {
    marginTop: 30,
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
