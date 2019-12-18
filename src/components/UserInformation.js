import React, { Component } from "react";
import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Text, Picker, Alert } from "react-native";
import { Button, CheckBox, Header } from "react-native-elements";
import DatePicker from 'react-native-date-picker';
import { IconButton, Colors } from 'react-native-paper';



//import firebase, { secondFirebaseInstance } from "./Firebase";
//import { DotIndicator } from "react-native-indicators";

class UserInformation extends Component {

    static navigationOptions = {
        title: "Details",
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
    
    state = {
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: new Date(),
        address: ''
    }

    handleDetails = () => {
        if (this.state.firstName === '' || this.state.lastName === '' 
        || this.state.gender === '' || this.state.gender === 'gender' || this.state.dateOfBirth === ''
        || this.state.address === '' || this.state.phoneNumber === '') {
            Alert.alert("Missing details")
        }
    }

//   static navigationOptions = {
//     title: "יצירת משתמש חדש",
//     headerStyle: {
//       backgroundColor: '#F8F8F8',
//     },
//     headerTintColor: '#005D93',
//     headerTitleStyle: {
//       fontSize: 26,
//       color: "#005D93",
//       fontFamily: "AmaticSC-Bold"
//     },
//   };

//   constructor() {
//     super();
//  //   this.ref = firebase.firestore().collection("user");
//     this.state = {
//       FirstName: "",
//       LastName: "",
//       Gender: "",
//       DateOfBirth: "",
//       Address: "",
//       Email: "",
//       Password: "",
//       ConfirmPassword: "",
//       PhoneNumber: "",
//       uid: "",
//       check: false,
//       isLoading: false
//     };
//   }
//   updateTextInput = (text, field) => {
//     this.setState({ [field]: text });
//   };
  
//   saveBoard() {
//     this.setState({
//       isLoading: true
//     });
//     if (Password === ConfirmPassword)

//     secondFirebaseInstance
//       .auth()
//       .createUserWithEmailAndPassword(this.state.Email, this.state.Password)
//       .then(() => {
//         this.setState({
//           uid: secondFirebaseInstance.auth().currentUser.uid
//         });
//         this.ref.add({
//           FirstName: this.state.FirstName,
//           LastName: this.state.LastName,
//           Gender: this.state.Gender,
//           DateOfBirth: this.state.DateOfBirth,
//           Address: this.state.Address,
//           Email: this.state.Email,
//           Password: this.state.Password,
//           uid: this.state.uid
//         });
//         secondFirebaseInstance.auth().signOut();
//         this.props.navigation.goBack();
//       })
//       .catch(error => {
//         console.error("Error adding document: ", error);
//         this.setState({
//           isLoading: false
//         });
//       });
//     // this.createNewUserRev2(this.state.Email, this.state.Password)
//     // this.updateTextInput(id, "uid");
//   }

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
            centerComponent={{ text: 'Details', style: { color: '#bbd8d8', fontSize: 30, fontWeight: 'bold'} }}
            containerStyle={{
                backgroundColor: '#FE5F55',
                justifyContent: 'space-around',
            }}
        />
        <View style={styles.container}>
            <TextInput 
                style={styles.inputBox}
                value={this.state.firstName}
                onChangeText={firstName => this.setState({ firstName })}
                placeholder={"first name"}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputBox}
                value={this.state.lastName}
                onChangeText={lastName => this.setState({ lastName })}          
                placeholder={"last name"}
                autoCapitalize='none' 
            />
            <Picker style={styles.pickerStyle}
                selectedValue={this.state.gender}  
                onValueChange={(itemValue) =>  
                    this.setState({gender: itemValue})}    
            >  
                <Picker.Item label="gender" value="gender" />  
                <Picker.Item label="male" value="male" />  
                <Picker.Item label="female" value="female" />  
            </Picker>
            
            {/* <TextInput
                style={styles.inputBox}
                value={this.state.dateOfBirth}
                onChangeText={dateOfBirth => this.setState({ dateOfBirth })}
                placeholder={"date of birth"}
                autoCapitalize='none'
            /> */}

{/* <DatePicker
        style={{width: 200}}
        date={this.state.dateOfBirth}
        mode="date"
        placeholder="date of birth"
        format="DD-MM-YYYY"
        minDate="1920-01-01"
        //maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(dateOfBirth) => {this.setState({dateOfBirth: date})}}
      /> */}

{/* <View style={{ backgroundColor: '#fff', margin: 0}}>
            <DatePicker date={this.state.dateOfBirth} placeholder="date of birth" mode="date" format="DD-MM-YYYY"
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  height: 50,
                  width: 170,
                  right: 30,
                },
                dateText: {
                  marginTop: 5,
                  color: 'white',
                  fontSize: 18,
                },
                placeholderText: {
                  marginTop: 5,
                  right: 10,
                  color: 'white',
                  fontSize: 18,
                }
              }
              }
              onDateChange={(date) => { this.setState({ dateOfBirth: date }) }} placeholderTextColor="white" underlineColorAndroid={'rgba(0,0,0,0)'} style={{ height: 50, width: 170, paddingLeft: 15, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.4)' }}></DatePicker>
          </View> */}

            {/* <TouchableOpacity 
                style={styles.inputBox}
                onPress = {this.DatePicker}
            >
                <Text>date of birth</Text>
            </TouchableOpacity> */}

            <DatePicker
                mode={'date'}
                date={this.state.dateOfBirth}
                placeholder="date of birth"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({dateOfBirth: date})}}
            /> 

            <TextInput
                style={styles.inputBox}
                value={this.state.address}
                onChangeText={address => this.setState({ address })}
                placeholder={"address"}
                autoCapitalize='none'
            />

            <IconButton
                icon="camera"
                color={Colors.red500}
                size={25}
                onPress={() => console.log('Pressed')}
            />

            
            <TouchableOpacity
            style={styles.button}
            onPress = {this.handleDetails}
            >
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
        backgroundColor: '#7a9e9f'
    },

    container: {
        flex: 1,
        backgroundColor: '#EEF5D8',
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        color: "#4f6367"
    },

    button: {
        marginTop: 30,
        marginBottom: 30,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FE5F55',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },

    pickerStyle:{  
        width: "90%",  
        color: '#344953',  
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#bbd8d8'
    }
});

export default UserInformation;