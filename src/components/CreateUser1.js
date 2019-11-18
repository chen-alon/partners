// import React, { Component } from "react";
// import {
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   View,
//   TextInput
// } from "react-native";
// import { Button, CheckBox } from "react-native-elements";
// import firebase, { secondFirebaseInstance } from "./Firebase";
// import { DotIndicator } from "react-native-indicators";
// //import Button3 from '../src/components/common/Button3';

// class CreateUser1 extends Component {

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
//     this.ref = firebase.firestore().collection("user");
//     this.state = {
//       FirstName: "",
//       LastName: "",
//       Gender: "",
//       DateOfBirth: "",
//       Location: "",
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
//           Location: this.state.Location,
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

//   checkBoxPressed = () =>
//     this.setState({
//       checked: !this.state.checked
//     });

//   setAdmin = checked => {
//     if (checked === true) {
//       this.updateTextInput("Admin", "manager");
//     }
//   };

//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={styles.activity}>
//           <DotIndicator color="#004577" />
//         </View>
//       );
//     }
//     return (
//       <ScrollView style={styles.container}>
//         <View style={styles.subContainer}>
//           <TextInput
//           style={{
//             fontSize: 26,
//             backgroundColor: "transparent",
//             fontFamily: "AmaticSC-Bold",
//             color: "#005D93"
//           }}
//           placeholderStyle={{
//             fontFamily: "AmaticSC-Bold"
//           }}
//             placeholder={"first name"}
//             value={this.state.FirstName}
//             onChangeText={text => this.updateTextInput(text, "FirstName")}
//           />
//         </View>
//         <View style={styles.subContainer}>
//           <TextInput
//           style={{
//             fontSize: 26,
//             backgroundColor: "transparent",
//             fontFamily: "AmaticSC-Bold",
//             color: "#005D93"
//           }}
//           placeholderStyle={{
//             fontFamily: "AmaticSC-Bold"
//           }}
//             placeholder={"last name"}
//             value={this.state.LastName}
//             onChangeText={text => this.updateTextInput(text, "LastName")}
//           />
//         </View>
//         <View style={styles.subContainer}>
//           <TextInput
//           style={{
//             fontSize: 26,
//             backgroundColor: "transparent",
//             fontFamily: "AmaticSC-Bold",
//             color: "#005D93"
//           }}
//           placeholderStyle={{
//             fontFamily: "AmaticSC-Bold"
//           }}
//             placeholder={"gender"}
//             value={this.state.Gender}
//             onChangeText={text => this.updateTextInput(text, "Gender")}
//           />
//         </View>
//         <View style={styles.subContainer}>
//           <TextInput
//           style={{
//             fontSize: 26,
//             backgroundColor: "transparent",
//             fontFamily: "AmaticSC-Bold",
//             color: "#005D93"
//           }}
//           placeholderStyle={{
//             fontFamily: "AmaticSC-Bold"
//           }}
//             placeholder={"date of birth"}
//             value={this.state.DateOfBirth}
//             onChangeText={text => this.updateTextInput(text, "DateOfBirth")}
//           />
//         </View>
//         <View style={styles.subContainer}>
//           <TextInput
//           style={{
//             fontSize: 26,
//             backgroundColor: "transparent",
//             fontFamily: "AmaticSC-Bold",
//             color: "#005D93"
//           }}
//           placeholderStyle={{
//             fontFamily: "AmaticSC-Bold"
//           }}
//             placeholder={"location"}
//             value={this.state.Location}
//             onChangeText={text => this.updateTextInput(text, "Location")}
//           />
//         </View>
//         <View style={styles.subContainer}>
//           <TextInput
//           style={{
//             fontSize: 26,
//             backgroundColor: "transparent",
//             fontFamily: "AmaticSC-Bold",
//             color: "#005D93"
//           }}
//           placeholderStyle={{
//             fontFamily: "AmaticSC-Bold"
//           }}
//             placeholder={"email"}
//             value={this.state.Email}
//             onChangeText={text => this.updateTextInput(text, "Email")}
//           />
//         </View>
//         <View style={styles.subContainer}>
//           <TextInput
//           style={{
//             fontSize: 26,
//             backgroundColor: "transparent",
//             fontFamily: "AmaticSC-Bold",
//             color: "#005D93"
//           }}
//           placeholderStyle={{
//             fontFamily: "AmaticSC-Bold"
//           }}
//             placeholder={"מספר פלאפון"}
//             value={this.state.PhoneNumber}
//             onChangeText={text => this.updateTextInput(text, "PhoneNumber")}
//           />
//         </View>
        

//         <View>
//           <CheckBox
//             textStyle={{fontSize: 26, color:"#005D93"}}
//             fontFamily= "AmaticSC-Bold"
//             center
//             title="מנהל"
//             checked={this.state.checked}
//             onPress={() => this.checkBoxPressed()}
//           />
//         </View>

//         <View style={{paddingTop: 20}}>
//         <Button3
//           onPress={() => {
//           this.setAdmin(this.state.checked);
//           this.saveBoard();
//       // this.createNewAcount(this.state.Email, this.state.PhoneNumber);
// }}        >
//           שמירת פרטים
//         </Button3>

//         </View>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20
//   },
//   subContainer: {
//     alignItems:'flex-end',
//     flex: 1,
//     marginBottom: 20,
//     padding: 5,
//     borderBottomWidth: 2,
//     borderBottomColor: "#CCCCCC"
//   },
//   activity: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

// export default CreateUser1;