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
  ImageBackground,
} from 'react-native';
import {Icon} from 'native-base';
// import LabelSelect from './common/LabelSelect';
import {Header} from 'react-native-elements';
import PickerCheckBox from 'react-native-picker-checkbox';
import firebase from 'firebase';
import 'firebase/firestore';

class TravelingDetails extends Component {
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
      // months: [
      //   {
      //     name: 'January',
      //     isSelected: false,
      //     value: 1,
      //   },
      //   {
      //     name: 'February',
      //     isSelected: false,
      //     value: 2,
      //   },
      //   {
      //     name: 'March',
      //     isSelected: false,
      //     value: 3,
      //   },
      //   {
      //     name: 'April',
      //     isSelected: false,
      //     value: 4,
      //   },
      //   {
      //     name: 'May',
      //     isSelected: false,
      //     value: 5,
      //   },
      //   {
      //     name: 'June',
      //     isSelected: false,
      //     value: 6,
      //   },
      //   {
      //     name: 'July',
      //     isSelected: false,
      //     value: 7,
      //   },
      //   {
      //     name: 'August',
      //     isSelected: false,
      //     value: 8,
      //   },
      //   {
      //     name: 'September',
      //     isSelected: false,
      //     value: 9,
      //   },
      //   {
      //     name: 'October',
      //     isSelected: false,
      //     value: 10,
      //   },
      //   {
      //     name: 'November',
      //     isSelected: false,
      //     value: 11,
      //   },
      //   {
      //     name: 'December',
      //     isSelected: false,
      //     value: 12,
      //   },
      // ],
    };
    // this.selectConfirm = this.selectConfirm.bind(this);
    // this.deleteItem = this.deleteItem.bind(this);
  }
  handleConfirm(pItems) {
    console.log('pItems =>', pItems);
  }

  // selectConfirm(list) {
  //   let {months} = this.state;
  //   for (let item of list) {
  //     let index = arr.findIndex(ele => ele === item);
  //     if (~index) months[index].isSelected = true;
  //     else continue;
  //   }
  //   this.setState({arr: arr});
  // }

  // deleteItem(item) {
  //   let {months} = this.state;
  //   let index = months.findIndex(a => a === item);
  //   months[index].isSelected = false;
  //   this.setState({months: months});
  // }

  handleDetails = () => {
    if (
      this.state.mode === 'israel' &&
      (this.state.area === '' ||
        this.state.area === 'select area' ||
        this.state.partnerGender === '' ||
        this.state.partnerGender === 'select gender' ||
        this.state.partnerAge === '' ||
        this.state.partnerAge === 'select age range')
      // this.state.months === '' ||
      // this.state.months === 'select months')
    ) {
      Alert.alert('Missing details');
    } else if (
      this.state.mode === 'worldwide' &&
      // (this.state.months === '' ||
      //   this.state.months === 'select months' ||
      (this.state.partnerGender === '' ||
        this.state.partnerGender === 'select gender' ||
        this.state.partnerAge === '' ||
        this.state.partnerAge === 'select age range' ||
        this.state.theme === '' ||
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
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
          area: this.state.area,
          mainland: this.state.mainland,
          country: this.state.country,
          partnerAge: this.state.partnerAge,
          partnerGender: this.state.partnerGender,
          theme: this.state.theme,
          mode: this.state.mode,
          //months: this.state.months,
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

  items = [
    {
      itemKey: 1,
      itemDescription: 'Item 1',
    },
    {
      itemKey: 2,
      itemDescription: 'Item 2',
    },
    {
      itemKey: 3,
      itemDescription: 'Item 3',
    },
  ];

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('./images/vanishing_hitchhiker2.jpg')}
          imageStyle={{opacity: 0.3}}
          style={{resizeMode: 'cover', flex: 1}}>
          <ScrollView style={styles.scroll}>
            <PickerCheckBox
              data={items}
              headerComponent={<Text style={{fontSize: 25}}>items</Text>}
              OnConfirm={pItems => this.handleConfirm(pItems)}
              ConfirmButtonTitle="OK"
              DescriptionField="itemDescription"
              KeyField="itemKey"
              placeholder="select some items"
              arrowColor="#FFD740"
              arrowSize={10}
              placeholderSelectedItems="$count selected item(s)"
            />
            <Icon
              name="arrow-back"
              style={{
                color: '#4f6367',
                marginLeft: 10,
                marginBottom: 10,
              }}
              onPress={() => navigate('ExstraInformation')}
            />
            <Header
              centerComponent={{
                text: 'Lets find your partner',
                style: {
                  color: '#bbd8d8',
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingBottom: 20,
                },
              }}
              containerStyle={{
                backgroundColor: '#FE5F55',
                justifyContent: 'space-around',
                marginBottom: 10,
                borderRadius: 10,
                borderWidth: 4,
                borderColor: '#eef5d8',
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
                <Picker.Item label="man" value="man" />
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
              {/* <LabelSelect
                title="Checkbox"
                ref="select months"
                style={styles.labelSelect}
                onConfirm={this.selectConfirm}>
                {this.state.months
                  .filter(item => item.isSelected)
                  .map((item, index) => (
                    <LabelSelect.Label
                      key={'label-' + index}
                      data={item}
                      onCancel={() => {
                        this.deleteItem(item);
                      }}>
                      {item.name}
                    </LabelSelect.Label>
                  ))}
                {this.state.months
                  .filter(item => !item.isSelected)
                  .map((item, index) => (
                    <LabelSelect.ModalItem
                      key={'modal-item-' + index}
                      data={item}>
                      {item.name}
                    </LabelSelect.ModalItem>
                  ))}
              </LabelSelect> */}

              {/* <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.selectedMonths}
                onValueChange={months =>
                  this.setState({selectedMonths: months})
                }>
                <Picker.Item label="select months" value="select months" />
                {monthsItems}
              </Picker> */}

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
                <View></View>
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
  scroll: {
    flex: 1,
    padding: 20,
    //backgroundColor: '#7a9e9f',
  },

  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#EEF5D8',
    justifyContent: 'center',
  },

  labelSelect: {
    marginTop: 5,
    marginBottom: 20,
    padding: 5,
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: 'dashed',
    borderColor: '#6dc2a2',
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
    marginTop: 10,
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
