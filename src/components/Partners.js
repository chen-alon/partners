import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
  Text,
  Picker,
  Alert,
} from 'react-native';
import {Header} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import firebase from 'firebase';
import 'firebase/firestore';

class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: '',
      mainland: '',
      country: '',
      partnerAge: '',
      partnerGender: '',
      theme: '',
      depart: new Date(),
      return: new Date(),
      maximumDate: new Date(),
      mode: 'israel',
    };
  }

  handleDetails = () => {
    if (
      this.state.mode === 'israel' &&
      (this.state.area === '' ||
        this.state.area === 'select area' ||
        this.state.partnerGender === '' ||
        this.state.partnerGender === 'select gender' ||
        this.state.partnerAge === '' ||
        this.state.partnerAge === 'select age range')
    ) {
      Alert.alert('Missing details');
    } else if (
      this.state.mode === 'worldwide' &&
      (this.state.theme === '' ||
        this.state.theme === 'select theme' ||
        this.state.mainland === '' ||
        this.state.mainland === 'select mainland' ||
        (this.state.mainland != 'antarctica' &&
          (this.state.country === '' ||
            this.state.country === 'select country')))
    ) {
      Alert.alert('Missing details');
    } else {
      firebase
        .firestore()
        .collection('user')
        .doc(firebase.auth().currentUser.uid)
        .update({
          area: this.state.area,
          mainland: this.state.mainland,
          country: this.state.country,
          partnerAge: this.state.partnerAge,
          partnerGender: this.state.partnerGender,
          theme: this.state.theme,
        })
        .then(
          this.props.navigation.navigate('Questions'),
          this.setState({
            isLoading: false,
          }),
        )
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    }
  };

  listOfCountry() {
    if (this.state.mainland === 'europe') {
      return (
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.country}
          onValueChange={itemValue => this.setState({country: itemValue})}>
          <Picker.Item label="select country" value="select country" />
          <Picker.Item label="All country" value="All country" />
          <Picker.Item label="Austria" value="Austria" />
          <Picker.Item label="Belgium" value="Belgium" />
          <Picker.Item label="Bulgaria" value="Bulgaria" />
          <Picker.Item label="Czech Republic" value="Czech Republic" />
          <Picker.Item label="England" value="England" />
          <Picker.Item label="France" value="France" />
          <Picker.Item label="Germany" value="Germany" />
          <Picker.Item label="Greece" value="Greece" />
          <Picker.Item label="Hungary" value="Hungary" />
          <Picker.Item label="Italy" value="Italy" />
          <Picker.Item label="Montenegro" value="Montenegro" />
          <Picker.Item label="Netherlands" value="Netherlands" />
          <Picker.Item label="Poland" value="Poland" />
          <Picker.Item label="Portugal" value="Portugal" />
          <Picker.Item label="Romania" value="Romania" />
          <Picker.Item label="Russia" value="Russia" />
          <Picker.Item label="Spain" value="Spain" />
          <Picker.Item label="Switzerland" value="Switzerland" />
          <Picker.Item label="Turkey" value="Turkey" />
        </Picker>
      );
    }

    if (this.state.mainland === 'asia') {
      return (
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.country}
          onValueChange={itemValue => this.setState({country: itemValue})}>
          <Picker.Item label="select country" value="select country" />
          <Picker.Item label="All country" value="All country" />
          <Picker.Item label="Cambodia" value="Cambodia" />
          <Picker.Item label="China" value="China" />
          <Picker.Item label="Georgia" value="Georgia" />
          <Picker.Item label="India" value="India" />
          <Picker.Item label="Japan" value="Japan" />
          <Picker.Item label="Jordan" value="Jordan" />
          <Picker.Item label="Maldives" value="Maldives" />
          <Picker.Item label="Nepal" value="Nepal" />
          <Picker.Item label="Philippines" value="Philippines" />
          <Picker.Item label="Singapore" value="Singapore" />
          <Picker.Item label="Sri Lanka" value="Sri Lanka" />
          <Picker.Item label="Thailand" value="Thailand" />
          <Picker.Item label="Vietnam" value="Vietnam" />
        </Picker>
      );
    }

    if (this.state.mainland === 'south America') {
      return (
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.country}
          onValueChange={itemValue => this.setState({country: itemValue})}>
          <Picker.Item label="select country" value="select country" />
          <Picker.Item label="All country" value="All country" />
          <Picker.Item label="Argentina" value="Argentina" />
          <Picker.Item label="Bolivia" value="Bolivia" />
          <Picker.Item label="Brazil" value="Brazil" />
          <Picker.Item label="Chile" value="Chile" />
          <Picker.Item label="Colombia" value="Colombia" />
          <Picker.Item label="Ecuador" value="Ecuador" />
          <Picker.Item label="Peru" value="Peru" />
          <Picker.Item label="Uruguay" value="Uruguay" />
          <Picker.Item label="Venezuela" value="Venezuela" />
        </Picker>
      );
    }

    if (this.state.mainland === 'central America') {
      return (
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.country}
          onValueChange={itemValue => this.setState({country: itemValue})}>
          <Picker.Item label="select country" value="select country" />
          <Picker.Item label="All country" value="All country" />
          <Picker.Item label="Caribbean Islands" value="Caribbean Islands" />
          <Picker.Item label="Costa Rica" value="Costa Rica" />
          <Picker.Item label="Cuba" value="Cuba" />
          <Picker.Item label="El Salvador" value="El Salvador" />
          <Picker.Item label="Guatemala" value="Guatemala" />
          <Picker.Item label="Mexico" value="Mexico" />
          <Picker.Item label="Panama" value="Panama" />
          <Picker.Item label="Puerto Rico" value="Puerto Rico" />
        </Picker>
      );
    }

    if (this.state.mainland === 'north America') {
      return (
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.country}
          onValueChange={itemValue => this.setState({country: itemValue})}>
          <Picker.Item label="select country" value="select country" />
          <Picker.Item label="All country" value="All country" />
          <Picker.Item label="Canada" value="Canada" />
          <Picker.Item label="USA" value="USA" />
        </Picker>
      );
    }

    if (this.state.mainland === 'africa') {
      return (
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.country}
          onValueChange={itemValue => this.setState({country: itemValue})}>
          <Picker.Item label="select country" value="select country" />
          <Picker.Item label="All country" value="All country" />
          <Picker.Item label="Egypt" value="Egypt" />
          <Picker.Item label="Eritrea" value="Eritrea" />
          <Picker.Item label="Ethiopia" value="Ethiopia" />
          <Picker.Item label="Kenya" value="Kenya" />
          <Picker.Item label="Madagascar" value="Madagascar" />
          <Picker.Item label="Morocco" value="Morocco" />
          <Picker.Item label="Nigeria" value="Nigeria" />
          <Picker.Item label="Sudan" value="Sudan" />
          <Picker.Item label="Tanzania" value="Tanzania" />
          <Picker.Item label="Tunisia" value="Tunisia" />
          <Picker.Item label="Uganda" value="Uganda" />
          <Picker.Item label="Zimbabwe" value="Zimbabwe" />
        </Picker>
      );
    }

    if (this.state.mainland === 'australia and oceania') {
      return (
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.country}
          onValueChange={itemValue => this.setState({country: itemValue})}>
          <Picker.Item label="select country" value="select country" />
          <Picker.Item label="All country" value="All country" />
          <Picker.Item label="Australia" value="Australia" />
          <Picker.Item label="New Zealand" value="New Zealand" />
          <Picker.Item label="Marshall Islands" value="Ethiopia" />
        </Picker>
      );
    }
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <Header
          centerComponent={{
            text: 'Lets find your partner',
            style: {
              color: '#bbd8d8',
              fontSize: 17,
              fontWeight: 'bold',
              fontFamily: 'LongCang-Regular',
            },
          }}
          containerStyle={{
            backgroundColor: '#FE5F55',
            justifyContent: 'center',
          }}
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
                onPress={() => this.setState({mode: 'israel'})}>
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
                onPress={() => this.setState({mode: 'worldwide'})}>
                <Text>WORLDWIDE</Text>
              </TouchableHighlight>
            </View>
          </View>

          {this.state.mode === 'israel' ? (
            <View>
              <Text style={styles.text}>area</Text>
              <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.area}
                onValueChange={itemValue => this.setState({area: itemValue})}>
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
            </View>
          ) : (
            <View>
              <Text style={styles.text}>destination</Text>
              <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.mainland}
                onValueChange={itemValue =>
                  this.setState({mainland: itemValue})
                }>
                <Picker.Item label="select mainland" value="select mainland" />
                <Picker.Item label="africa" value="africa" />
                <Picker.Item label="antarctica" value="antarctica" />
                <Picker.Item label="asia" value="asia" />
                <Picker.Item
                  label="australia and oceania"
                  value="australia and oceania"
                />
                <Picker.Item label="central America" value="central America" />
                <Picker.Item label="europe" value="europe" />
                <Picker.Item label="north America" value="north America" />
                <Picker.Item label="south America" value="south America" />
              </Picker>
              {this.state.mainland === 'select mainland' ||
              this.state.mainland === '' ? (
                <View></View>
              ) : (
                this.listOfCountry()
              )}
            </View>
          )}

          <Text style={styles.text}>gender and age</Text>
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.partnerGender}
            onValueChange={itemValue =>
              this.setState({partnerGender: itemValue})
            }>
            <Picker.Item label="select gender" value="select gender" />
            <Picker.Item label="all" value="all" />
            <Picker.Item label="man" value="man" />
            <Picker.Item label="female" value="female" />
          </Picker>

          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.partnerAge}
            onValueChange={itemValue => this.setState({partnerAge: itemValue})}>
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

          <Text style={styles.text}>dates</Text>

          <DatePicker
            style={{width: 250, marginTop: 10}}
            date={this.state.depart}
            mode="date"
            placeholder={this.state.date}
            format="DD/MM/YYYY"
            minDate={this.state.maximumDate}
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
              this.setState({depart: date});
            }}
          />

          {this.state.mode === 'worldwide' ? (
            <View>
              <Text style={styles.text}>the theme of the trip</Text>
              <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.theme}
                onValueChange={itemValue => this.setState({theme: itemValue})}>
                <Picker.Item label="select theme" value="select theme" />
                <Picker.Item label="all the theme" value="all the theme" />
                <Picker.Item label="holiday" value="holiday" />
                <Picker.Item label="organized tour" value="organized tour" />
                <Picker.Item label="volunteering" value="volunteering" />
                <Picker.Item label="backpackers" value="backpackers" />
                <Picker.Item label="ski/winter" value="ski/winter" />
                <Picker.Item label="cruise" value="cruise" />
                <Picker.Item label="field trip" value="field trip" />
                <Picker.Item label="couples trip" value="couples trip" />
                <Picker.Item
                  label="flight and landing only"
                  value="flight and landing only"
                />
              </Picker>
            </View>
          ) : (
            <View></View>
          )}

          <TouchableOpacity
            style={styles.buttonSave}
            onPress={this.handleDetails}>
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
    backgroundColor: '#7a9e9f',
  },

  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#EEF5D8',
    justifyContent: 'center',
  },

  text: {
    fontSize: 20,
    color: '#4f6367',
    paddingBottom: 5,
    fontWeight: 'bold',
    paddingTop: 10,
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

  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
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
    padding: 10,
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
    width: 200,
  },

  pickerStyle: {
    width: '100%',
    color: '#344953',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#bbd8d8',
  },
});

export default Partners;
