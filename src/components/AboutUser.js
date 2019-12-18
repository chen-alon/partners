import React, { Component } from "react";
import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Text, Picker, Alert } from "react-native";
import { Button, CheckBox, Header } from "react-native-elements";

class AboutUser extends Component {

    
    static navigationOptions = {
        title: "More about me",
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
        countrys: '',
        languages: '',
        more: ''
    }

    render() {
        return(
            <ScrollView style={styles.scroll}>
                <Header
            centerComponent={{ text: 'More about me', style: { color: '#bbd8d8', fontSize: 25, fontWeight: 'bold'} }}
            containerStyle={{
                backgroundColor: '#FE5F55',
                justifyContent: 'space-around',
            }}
                />
        <View style={styles.container}>
            <TextInput 
                style={styles.inputBox}
                value={this.state.countrys}
                onChangeText={countrys => this.setState({ countrys })}
                placeholder={"countrys"}
                autoCapitalize='none'
            />
        </View>

        <View style={styles.container}>
            <TextInput
               style={styles.inputBox}
               value={this.state.languages}
               onChangeText={languages => this.setState({ languages })}
               placeholder={"languages"}
               autoCapitalize='none' 
            />
        </View>

        <View style={styles.container}>
            <TextInput
               style={styles.inputBox}
               value={this.state.more}
               onChangeText={more => this.setState({ more })}
               placeholder={"more"}
               autoCapitalize='none' 
            />
        </View>

        <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Countine</Text>
        </TouchableOpacity>

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
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 20,
        margin: 5
    },

    inputBox: {
        width: '85%',
        margin: 10,
        padding: 30,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        color: "#4f6367"
    },

    button: {
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 30,
        paddingVertical: 5,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#FE5F55',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },

    buttonText: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#bbd8d8'
    }
});

export default AboutUser;