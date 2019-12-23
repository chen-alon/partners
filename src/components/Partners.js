import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, ScrollView, View, TouchableHighlight, Text, Picker, Alert, Image } from "react-native";
import { Button, CheckBox, Header } from "react-native-elements";


class Partners extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            area: '',
            partnerAge: '',
            partnerGender: '',
            theme: '',
            depart: new Date(),
            retuen: new Date(),
            mode: 'israel'
        };
    }

    handleDetails = () => {
        if (this.state.area === '' || this.state.area === 'select area' ||
        this.state.partnerGender === ''  || this.state.partnerGender === 'select gender' ||
        this.state.partnerAge === '' || this.state.partnerAge === 'select age range' ||
        this.state.theme === '' || this.state.theme === 'select theme') {
            Alert.alert("Missing details")
        }
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <Header
                    centerComponent={{ text: "Lets find your partner", style: { color: '#bbd8d8', fontSize: 17, fontWeight: 'bold'} }}
                    containerStyle={{ backgroundColor: '#FE5F55',  justifyContent: 'center' }}
                />
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View>
                            <TouchableHighlight
                            style={
                                this.state.mode === 'israel'
                                ? styles.buttonPress
                                : styles.button
                            }
                            onPress={() => this.setState({mode: 'israel'})}
                            >   
                                <Text>ISRAEL</Text>
                            </TouchableHighlight>
                        </View>

                        <View>
                            <TouchableHighlight
                            style={
                                this.state.mode === 'worldwide'
                                ? styles.buttonPress
                                : styles.button
                            }
                            onPress = {() => this.setState({mode: 'worldwide'})}
                            >
                                <Text>WORLDWIDE</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                    {/* <Text style={styles.text}>Destination</Text> */}


                    <Text style={styles.text}>area</Text>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.state.area}                  
                        onValueChange={(itemValue) => this.setState({area: itemValue})}    
                    >  
                        <Picker.Item label="select area" value="select area" />  
                        <Picker.Item label="no matter" value="no matter" />  
                        <Picker.Item label="north" value="north" />  
                        <Picker.Item label="south" value="south" /> 
                        <Picker.Item label="center" value="center" />  
                        <Picker.Item label="sharon" value="sharon" />  
                        <Picker.Item label="shomron" value="shomron" />  
                        <Picker.Item label="shfela" value="shfela" />  
                        <Picker.Item label="eilat" value="eilat" />  
                        <Picker.Item label="tel aviv area" value="tlv" />  
                        <Picker.Item label="jerusalem area" value="jeru" />  

                    </Picker>

                    <Text style={styles.text}>gender and age</Text>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.state.partnerGender}                  
                        onValueChange={(itemValue) => this.setState({partnerGender: itemValue})}    
                    >  
                        <Picker.Item label="select gender" value="select gender" />  
                        <Picker.Item label="no matter" value="no matter" />  
                        <Picker.Item label="man" value="man" />  
                        <Picker.Item label="female" value="female" /> 
                    </Picker>

                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.state.partnerAge}                  
                        onValueChange={(itemValue) => this.setState({partnerAge: itemValue})}    
                    >  
                        <Picker.Item label="select age range" value="select age range" />  
                        <Picker.Item label="all" value="all" />  
                        <Picker.Item label="until 20" value="until 20" />  
                        <Picker.Item label="21-25" value="21-25" /> 
                        <Picker.Item label="26-30" value="26-30" />  
                        <Picker.Item label="31-40" value="31-40" />  
                        <Picker.Item label="41-45" value="41-45" />  
                        <Picker.Item label="46-55" value="46-55" />  
                        <Picker.Item label="56-65" value="56-65" />  
                        <Picker.Item label="up 66" value="up 66" />  
                    </Picker>

                    <Text style={styles.text}>Dates</Text>

                    

                    <Text style={styles.text}>the theme of the trip</Text>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.state.theme}                  
                        onValueChange={(itemValue) => this.setState({theme: itemValue})}    
                    >  
                        <Picker.Item label="select theme" value="select theme" />  
                        <Picker.Item label="all" value="all" />  
                        <Picker.Item label="until 20" value="until 20" />  
                        <Picker.Item label="21-25" value="21-25" /> 
                        <Picker.Item label="26-30" value="26-30" />  
                        <Picker.Item label="31-40" value="31-40" />  
                        <Picker.Item label="41-45" value="41-45" />  
                        <Picker.Item label="46-55" value="46-55" />  
                        <Picker.Item label="56-65" value="56-65" />  
                        <Picker.Item label="up 66" value="up 66" />  
                    </Picker>

                    <TouchableOpacity
                        style={styles.buttonSave}
                        onPress = {this.handleDetails}
                    >
                        <Text style={styles.buttonText}>Save</Text>
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
        padding: 30,
        backgroundColor: '#EEF5D8',
        justifyContent: 'center'
    },

    text: {
        fontSize: 20,
        color: "#4f6367",
        paddingBottom: 5,
        fontWeight: 'bold'
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

    card: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'center'
    },

    button: {
        margin: 10,
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        width: 130,
        padding: 10,
    },

    buttonPress: {
        backgroundColor: '#b8d8d8',
        margin: 10,
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        width: 130,
        padding: 10
    },

    buttonSave: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#FE5F55',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },

    pickerStyle:{  
        width: "100%",  
        color: '#344953',  
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#bbd8d8'
    }
});


export default Partners;