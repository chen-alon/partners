import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import { Button, CheckBox, Header } from "react-native-elements";
//import Icon from 'react-native-vector-icons/FontAwesome'

class CreateUser extends Component {
    
    static navigationOptions = {
        title: "register",
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
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        checked: false
    }

    checkBoxPressed = () =>
    this.setState({
      checked: !this.state.checked
    });
    render() {
        return (
            <ScrollView style={styles.scroll}>
            <Header
            centerComponent={{ text: 'Register', style: { color: '#EEF5DB', fontSize: 30, fontWeight: 'bold', } }}
            containerStyle={{
                backgroundColor: '#FE5F55',
                justifyContent: 'space-around',
            }}
            />

            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.confirmPassword}
                    onChangeText={confirmPassword => this.setState({ confirmPassword })}
                    placeholder='Confirm password'
                    secureTextEntry={true}
                />
                <View>
                    <CheckBox
                    textStyle={{fontSize: 11, color:"#4F6367"}}
                    fontFamily= "AmaticSC-Bold"
                    center
                    title="Agree to terms and conditions"
                    checked={this.state.checked}
                    onPress={() => this.checkBoxPressed()}
                    />
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    scroll: {
        flex: 1,
        padding: 20,
      },

    checkBoxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        //textAlign: 'center'
    },

    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FE5F55',
        borderColor: '#FFA611',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EEF5DB'
    },
    buttonSignup: {
        fontSize: 12
    }
})

export default CreateUser;