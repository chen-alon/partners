import React, { Component } from 'react';
import {  StyleSheet, View, TextInput, Text, KeyboardAvoidingView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { DotIndicator } from "react-native-indicators";
// ImageBackground

class LoginForm extends Component {
    state = { loading: false };

    renderButton() {
        if (this.state.loading) {
          return <DotIndicator color="#ef5f55" />;
        }
        return <Button style = {styles.login}> LOGIN </Button>;
        //onPress={this.onButtonPress.bind(this)}
    }

    render() {
        return (
            <View>
                <KeyboardAvoidingView>
            {/* <ImageBackground
                source={require("./images/start.jpg")}
                style={styles.backgroundImage}>
            </ImageBackground> */}

            <View>
              <Image
                source={require("./images/logo.png")}
                style={{ width: 200, height: 200, alignSelf: "center" }}
              />
            </View>

            <View style={styles.Content2}>
                <TextInput
                    style={ styles.inputContainer }
                      textAlign="center"
                      placeholder={"Email"}
                      placeholderStyle={{
                        fontFamily: "AmaticSC-Bold"
                      }}
                      placeholderTextColor="#4f6367"
                      height={45}
                      autoCorrect={false}
                      //onChangeText={email => this.setState({ email })}
                      //value={this.state.email}
                    />
            </View>

            <View style={styles.Content2}>
                <TextInput
                      style={ styles.inputContainer }
                      textAlign="center"
                      placeholder={"Password"}
                      placeholderStyle={{
                        fontFamily: "AmaticSC-Bold"
                      }}
                      placeholderTextColor="#4f6367"
                      secureTextEntry={true}
                      autoCorrect={false}
                      height={45}
                     // onChangeText={password => this.setState({ password })}
                      //value={this.state.password}
                    />

                <Text
                    style={styles.forgetPassword}
                //    onPress = {() => navigate('ForgotPasswordController')}
                >
                Forgot your password?
                </Text>
            </View>

            <View>{this.renderButton()}</View>

            <View>
                <Text style = {styles.signIn}> Don't have an account yet?</Text>
                <Text onPress = {() => navigate('CreateUser')}
                    style={{color:'#fe5f55', fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>
                    Create
                </Text>
            </View>

                </KeyboardAvoidingView>
            </View>
          );
        }
    }

    const styles = StyleSheet.create ({

      login: {
        //borderColor: '#000',
        //borderWidth: 0.2,
        //borderRadius: 10,
        //width: "80%",
        alignSelf: "center",
        color: "#fe5f55"
      },
        signIn: {
            textAlign: "center",
            fontSize: 14,
            color: "#fe5f55" 
        },

        forgetPassword: {
          color: "#7a9e9f",
          fontSize: 12,
          justifyContent: "center",
          textAlign: "center",
          fontFamily: "AmaticSC-Bold"
        },

        inputContainer: {
            borderColor: "#000",
            borderRadius: 10,
            borderWidth: 0.2,
            fontSize: 22,
            width: "80%",
            alignSelf: "center",
            backgroundColor: "transparent",
            fontFamily: "AmaticSC-Bold"
        },

        Content2: {
          paddingTop: 10,
          paddingBottom: 20
          // fontFamily: "AmaticSC-Bold"
        },
        backgroundImage: {
            resizeMode: 'cover',
            opacity: 0.5,
            paddingTop: 580      
        }
    })

  export default LoginForm;