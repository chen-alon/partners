import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
  Text,
  Picker,
  Alert,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {Icon} from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import firebase from 'firebase';
import 'firebase/firestore';

const months = [
  {
    id: '0',
    name: 'all months',
  },
  {
    id: '1',
    name: 'January',
  },
  {
    id: '2',
    name: 'February',
  },
  {
    id: '3',
    name: 'March',
  },
  {
    id: '4',
    name: 'April',
  },
  {
    id: '5',
    name: 'May',
  },
  {
    id: '6',
    name: 'June',
  },
  {
    id: '7',
    name: 'July',
  },
  {
    id: '8',
    name: 'August',
  },
  {
    id: '9',
    name: 'September',
  },
  {
    id: '10',
    name: 'October',
  },
  {
    id: '11',
    name: 'November',
  },
  {
    id: '12',
    name: 'December',
  },
];

class TravelingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area: '',
      mainland: '',
      country: '',
      partnerAge: '',
      partnerGender: '',
      theme: '',
      mode: 'israel',
      selectedItems: [],
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
        this.state.partnerAge === 'select age range' ||
        this.state.theme === '' ||
        this.state.theme === 'select theme' ||
        this.state.selectedItems.length === 0)
    ) {
      Alert.alert('Missing details');
    } else if (
      this.state.mode === 'worldwide' &&
      (this.state.partnerGender === '' ||
        this.state.partnerGender === 'select gender' ||
        this.state.partnerAge === '' ||
        this.state.partnerAge === 'select age range' ||
        this.state.theme === '' ||
        this.state.theme === 'select theme' ||
        this.state.mainland === '' ||
        this.state.mainland === 'select mainland' ||
        this.state.selectedItems.length === 0 ||
        (this.state.mainland != 'antarctica' &&
          (this.state.country === '' ||
            this.state.country === 'select country')))
    ) {
      Alert.alert('Missing details');
    } else {
      this.state.selectedItems.sort(function(a, b) {
        return parseInt(a) - parseInt(b);
      });
      if (this.state.mode == 'israel') {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .update({
            mode: this.state.mode,
            area: this.state.area,
            partnerAge: this.state.partnerAge,
            partnerGender: this.state.partnerGender,
            theme: this.state.theme,
            selectedItems: this.state.selectedItems,
          })
          .then(
            this.props.navigation.navigate('Questions'),
            this.setState({
              area: '',
              mainland: '',
              country: '',
              partnerAge: '',
              partnerGender: '',
              theme: '',
              mode: 'israel',
              selectedItems: [],
              isLoading: false,
            }),
          )
          .catch(error => {
            console.error('Error adding document: ', error);
          });
      }
      if (this.state.mode == 'worldwide') {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .update({
            mode: this.state.mode,
            mainland: this.state.mainland,
            country: this.state.country,
            partnerAge: this.state.partnerAge,
            partnerGender: this.state.partnerGender,
            selectedItems: this.state.selectedItems,
            theme: this.state.theme,
          })
          .then(
            this.props.navigation.navigate('Questions'),
            this.setState({
              area: '',
              mainland: '',
              country: '',
              partnerAge: '',
              partnerGender: '',
              theme: '',
              mode: 'israel',
              selectedItems: [],
              isLoading: false,
            }),
          )
          .catch(error => {
            console.error('Error adding document: ', error);
          });
      }
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
          <Picker.Item label="all country" value="all country" />
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
          <Picker.Item label="all country" value="all country" />
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
          <Picker.Item label="all country" value="all country" />
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
          <Picker.Item label="all country" value="all country" />
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
          <Picker.Item label="all country" value="all country" />
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
          <Picker.Item label="all country" value="all country" />
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
          <Picker.Item label="all country" value="all country" />
          <Picker.Item label="Australia" value="Australia" />
          <Picker.Item label="New Zealand" value="New Zealand" />
          <Picker.Item label="Marshall Islands" value="Ethiopia" />
        </Picker>
      );
    }
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
  };

  render() {
    const {state, goBack} = this.props.navigation;
    const params = state.params || {};
    const {selectedItems} = this.state;

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/vanishing_hitchhiker2.jpg')}
          imageStyle={{opacity: 0.3}}
          style={styles.backgroundImage}>
          <ScrollView style={styles.scroll}>
            <Icon
              name="arrow-back"
              style={{
                color: '#4f6367',
                marginLeft: 10,
                marginTop: 10,
              }}
              onPress={() => goBack(params.go_back_key)}
            />
            <Image
              style={{alignSelf: 'center'}}
              source={require('../images/Travel_Details.png')}
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
                    onValueChange={itemValue =>
                      this.setState({area: itemValue})
                    }>
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
                    <Picker.Item
                      label="select mainland"
                      value="select mainland"
                    />
                    <Picker.Item label="africa" value="africa" />
                    <Picker.Item label="antarctica" value="antarctica" />
                    <Picker.Item label="asia" value="asia" />
                    <Picker.Item
                      label="australia and oceania"
                      value="australia and oceania"
                    />
                    <Picker.Item
                      label="central America"
                      value="central America"
                    />
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
                <Picker.Item label="male" value="male" />
                <Picker.Item label="female" value="female" />
              </Picker>
              <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.partnerAge}
                onValueChange={itemValue =>
                  this.setState({partnerAge: itemValue})
                }>
                <Picker.Item
                  label="select age range"
                  value="select age range"
                />
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
              <Text style={styles.text}>period</Text>
              <View style={styles.pickerStyle}>
                <MultiSelect
                  styleMainWrapper={{
                    backgroundColor: '#eef5d8',
                    borderBottomColor: '#eef5d8',
                    borderEndColor: '#eef5d8',
                    width: '104%',
                    paddingLeft: 9,
                    fontSize: 16,
                    color: '#fff',
                  }}
                  styleDropdownMenuSubsection={{
                    backgroundColor: '#eef5d8',
                    borderColor: '#eef5d8',
                  }}
                  styleTextDropdown={{
                    backgroundColor: '#eef5d8',
                    color: '#4f6367',
                    fontSize: 16,
                  }}
                  textInputProps={{editable: false}}
                  searchInputStyle={{
                    fontSize: 16,
                    width: '85%',
                    maxWidth: '80%',
                  }}
                  styleTextDropdownSelected={{
                    fontSize: 16,
                  }}
                  hideTags
                  hideDropdown
                  items={months}
                  uniqueKey="name"
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={selectedItems}
                  selectText="select months"
                  searchInputPlaceholderText="select months"
                  textColor="#4f6367"
                  tagTextColor="#eef5d8"
                  selectedItemTextColor="#fe5f55"
                  selectedItemIconColor="#fe5f55"
                  displayKey="name"
                  hideSubmitButton
                  flatListProps
                />
              </View>
              {this.state.mode === 'worldwide' ? (
                <View>
                  <Text style={styles.text}>the theme of the trip</Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.theme}
                    onValueChange={itemValue =>
                      this.setState({theme: itemValue})
                    }>
                    <Picker.Item label="select theme" value="select theme" />
                    <Picker.Item label="all the theme" value="all the theme" />
                    <Picker.Item label="holiday" value="holiday" />
                    <Picker.Item
                      label="organized tour"
                      value="organized tour"
                    />
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
                <View>
                  <Text style={styles.text}>the theme of the trip</Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.theme}
                    onValueChange={itemValue =>
                      this.setState({theme: itemValue})
                    }>
                    <Picker.Item label="select theme" value="select theme" />
                    <Picker.Item label="all the theme" value="all the theme" />
                    <Picker.Item label="vacation" value="vacation" />
                    <Picker.Item label="volunteering" value="volunteering" />
                    <Picker.Item label="camping" value="camping" />
                  </Picker>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.buttonSave}
              onPress={this.handleDetails}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
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
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#EEF5D8',
    justifyContent: 'center',
    borderWidth: 4,
    borderRadius: 5,
    borderColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#4f6367',
    paddingBottom: 5,
    fontWeight: 'bold',
    paddingTop: 10,
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
    position: 'relative',
    marginTop: 20,
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

export default TravelingDetails;
