// import React, { Component } from "react";
// import { View, TextInput, Alert } from "react-native";
// import * as firebase from "firebase";
// import styles from "./styles";
// import Images from "./Images";
// import CustomHeader from "./manager/CustomHeader";
// import Button2 from './common/Button2';
// import { DotIndicator } from "react-native-indicators";

// export default class ForgotPasswordController2 extends Component {
//   static defaultProps = {
//     backgroundColor: "#fff",
//     titleText: "שכחתי סיסמא",
//     submitText: "send",
//     placeHolderText: "example@domain.com"
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       Password: "",
//       spinner: false
//     };
//   }
//   renderButton() {
//     if (this.state.spinner) {
//       return <DotIndicator color="#004577" />;
//     }
//     return <Button2 onPress={() => {
//         this.btnSubmitPress()
//         this.setState({ spinner: true })}} >
//     send
//     </Button2>;
//   }

//   /**
//    * Validate email
//    */
//   validateEmail = function(email) {
//     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
//   };

//   /**
//    * Button submit pressed
//    */
//   btnSubmitPress() {
//     if (this.state.email.trim().length == 0) {
//       Alert.alert(
//         'איפוס סיסמא',
//         'יש להזין את הכתובת מייל',
//         [
//           {text: 'OK', onPress: () => this.setState({ spinner: false })
//         }
//         ],
//         {cancelable: false},
//       );
//     } else if (this.validateEmail(this.state.email) == false) {
//       Alert.alert(
//         'איפוס סיסמא',
//         'כתובת המייל לא קיימת במערכת',
//         [
//           {text: 'OK', onPress: () => this.setState({ spinner: false })
//         }
//         ],
//         {cancelable: false},
//       );
//     } else {
//       this.callForgotPassword();
//     }
//   }

// setSpinnerState() {

// }

//   /**
//    * forgot pasword function
//    */
//   callForgotPassword() {
//     firebase
//       .auth()
//       .sendPasswordResetEmail(this.state.email)
//       .then(function(username) {
//         Alert.alert(
//           'איפוס סיסמא',
//           'הודעת חידוש סיסמה נשלחה לכתובת המייל שהזנת',
//           [
//             {text: 'OK', onPress: () => this.setState({ spinner: false })},
//           ],
//           {cancelable: false},
//         );
//         username.sendEmailVerification();
//       })
//       .catch(e =>{
//         alert(e)
//         this.setState({ spinner: false })
        
//       });
//   }

//   /**
//    * Button close pressed
//    */
//   btnClosePress() {
//     this.props.callbackAfterForgotPassword(0, this.props.otherParamsToSend);
//   }

//   render() {
//     return (
//       <View>
//         <CustomHeader
//           title="איפוס סיסמא"
//           drawerOpen={() => this.props.navigation.openDrawer()}
//         />        
//         <View
//           style={[
//             styles.bottomView,
//             { backgroundColor: this.props.backgroundColor }
//           ]}
//         >
//           <View>
//             <View style={{paddingTop:150}}>
//               <TextInput
//                 style={{
//                   borderColor: "#004577",
//                   borderRadius: 25,
//                   borderWidth: 2,
//                   fontSize: 22,
//                   width: "80%",
//                   alignSelf: "center",
//                   backgroundColor: "transparent",
//                   fontFamily: "AmaticSC-Bold",
//                 }}

//                 autoCorrect={false}
//                 keyboardType={"email-address"}
//                 textAlign="center"
//                 placeholder={this.props.placeHolderText}
//                 placeholderStyle={{
//                   fontFamily: "AmaticSC-Bold"
//                 }}
//                 placeholderTextColor="#5FA9DD"
//                 height={45}
//                 autoCorrect={false}
//                 onChangeText={email => this.setState({ email })}
//                 value={this.state.email}
//               />
//             </View>
//                 <View style={{paddingTop: 30}}>{this.renderButton()}</View>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }