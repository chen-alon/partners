import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  Picker,
  Alert,
  Dimensions,
} from 'react-native';
import {Icon} from 'native-base';
import DatePicker from 'react-native-datepicker';
import firebase from 'firebase';

class EditDeatils extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');

    this.state = {
      firstName: this.props.navigation.state.params.firstName,
      lastName: this.props.navigation.state.params.lastName,
      gender: this.props.navigation.state.params.gender,
      age: this.props.navigation.state.params.age,
      rangeAge: this.props.navigation.state.params.rangeAge,
      dateOfBirth: this.props.navigation.state.params.dateOfBirth,
      more: this.props.navigation.state.params.more,
      languages: this.props.navigation.state.params.languages,
      countries: this.props.navigation.state.params.countries,
      maximumDate: new Date(),
    };
  }

  handleDetails = async () => {
    this.ref
      .where('uid', '==', firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          {
            this.ref
              .doc(`${doc.id}`)
              .update({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                gender: this.state.gender,
                age: this.state.age,
                dateOfBirth: this.state.dateOfBirth,
                rangeAge: this.calculateRangeAge(this.state.age),
                more: this.state.more,
                languages: this.state.languages,
                countries: this.state.countries,
              })
              .then(() => {
                this.setState(
                  {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    gender: this.state.gender,
                    age: this.state.age,
                    dateOfBirth: this.state.dateOfBirth,
                    rangeAge: this.calculateRangeAge(this.state.age),
                    more: this.state.more,
                    languages: this.state.languages,
                    countries: this.state.countries,
                  },
                  () => {
                    Alert.alert('details updated successfully');
                  },
                );
              })
              .catch(error => {
                console.error('Error adding document: ', error);
                this.setState({
                  isLoading: false,
                });
              });
          }
        });
      });
  };

  calculateRangeAge(age) {
    if (age <= 20) {
      return 'until 20';
    } else if (age >= 21 && age <= 25) {
      return '21-25';
    } else if (age >= 26 && age <= 30) {
      return '26-30';
    } else if (age >= 31 && age <= 40) {
      return '31-40';
    } else if (age >= 41 && age <= 45) {
      return '41-45';
    } else if (age >= 46 && age <= 55) {
      return '46-55';
    } else if (age >= 56 && age <= 65) {
      return '56-65';
    } else {
      return 'up 66';
    }
  }

  calculateAge(dateOfBirth) {
    var birthDate = new Date(dateOfBirth);

    var difference = Date.now() - birthDate.getTime();
    var ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  render() {
    const {state, goBack} = this.props.navigation;
    const params = state.params || {};

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.3}}
          style={styles.backgroundImage}>
          <View style={{flex: 1}}>
            <ScrollView style={styles.scroll}>
              <Icon
                name="arrow-back"
                style={{
                  color: '#4f6367',
                  marginLeft: 10,
                  marginTop: 10,
                  marginBottom: 10,
                }}
                onPress={() => {
                  goBack(params.go_back_key),
                    this.props.navigation.state.params.onGoBack();
                }}
              />
              <View style={{flex: 1}}>
                <View style={styles.boxText}>
                  <Text style={styles.text}>{'first name:'}</Text>
                  <TextInput
                    style={{fontSize: 17}}
                    value={this.state.firstName}
                    onChangeText={firstName => this.setState({firstName})}
                    placeholder={this.props.navigation.state.params.firstName}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.boxText}>
                  <Text style={styles.text}>{'last name:'}</Text>
                  <TextInput
                    style={{fontSize: 17}}
                    value={this.state.lastName}
                    onChangeText={lastName => this.setState({lastName})}
                    placeholder={this.props.navigation.state.params.lastName}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.boxText}>
                  <Text style={styles.text}>{'gender:'}</Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.gender}
                    onValueChange={itemValue =>
                      this.setState({gender: itemValue})
                    }>
                    <Picker.Item
                      label={this.props.navigation.state.params.gender}
                      value={this.props.navigation.state.params.gender}
                    />
                    {this.props.navigation.state.params.gender === 'male' ? (
                      <Picker.Item label="female" value="female" />
                    ) : (
                      <Picker.Item label="male" value="male" />
                    )}
                  </Picker>
                </View>

                <View style={styles.boxText}>
                  <DatePicker
                    style={{width: 250, marginTop: 10}}
                    date={this.state.dateOfBirth}
                    mode="date"
                    placeholder={this.props.navigation.state.params.dateOfBirth}
                    minDate="1920-01-01"
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
                        marginLeft: 50,
                        backgroundColor: '#fff',
                      },
                    }}
                    onDateChange={date => {
                      this.setState({
                        dateOfBirth: date,
                        age: this.calculateAge(date),
                      });
                    }}
                  />
                </View>

                <View style={styles.boxText}>
                  <Text style={styles.text}>{'summary:'}</Text>
                  <TextInput
                    style={{fontSize: 17}}
                    value={this.state.more}
                    onChangeText={more => this.setState({more})}
                    placeholder={
                      this.props.navigation.state.params.more
                        ? this.props.navigation.state.params.more
                        : 'more about me...'
                    }
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.boxText}>
                  <Text style={styles.text}>{'countries:'}</Text>
                  <TextInput
                    style={{fontSize: 17}}
                    value={this.state.countries}
                    onChangeText={countries => this.setState({countries})}
                    placeholder={
                      this.props.navigation.state.params.countries
                        ? this.props.navigation.state.params.countries
                        : 'places I have visited...'
                    }
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.boxText}>
                  <Text style={styles.text}>{'languages:'}</Text>
                  <TextInput
                    style={{fontSize: 17}}
                    value={this.state.languages}
                    onChangeText={languages => this.setState({languages})}
                    placeholder={
                      this.props.navigation.state.params.languages
                        ? this.props.navigation.state.params.languages
                        : 'languages ​​I know...'
                    }
                    autoCapitalize="none"
                  />
                </View>
              </View>
              <TouchableHighlight
                style={styles.button}
                onPress={this.handleDetails.bind(this)}>
                <Image source={require('../images/icon_confirm.png')} />
              </TouchableHighlight>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
  },
  scroll: {
    flex: 1,
    padding: 20,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fe5f55',
    borderRadius: 40,
    shadowColor: 'black',
    elevation: 13,
    borderWidth: 2,
    borderColor: '#fff',
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 15,
  },
  boxText: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'column',
    borderColor: '#d3d3d3',
    borderBottomWidth: 2,
    height: '14%',
  },
  pickerStyle: {
    width: '100%',
    color: '#344953',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    color: '#4f6367',
    fontWeight: 'bold',
  },
});

export default EditDeatils;
