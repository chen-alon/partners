import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Icon} from 'native-base';
import {Header} from 'react-native-elements';
import firebase from 'firebase';
import 'firebase/firestore';

class ExstraInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: '',
      languages: '',
      more: '',
    };
  }

  ExDetailsCheck = () => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        countries: this.state.countries,
        languages: this.state.languages,
        more: this.state.more,
      })
      .then(
        this.props.navigation.navigate('TravelingDetails'),
        this.setState({
          countries: '',
          languages: '',
          more: '',
        }),
      )
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/vanishing_hitchhiker2.jpg')}
          imageStyle={{opacity: 0.4}}
          style={styles.backgroundImage}>
          <ScrollView style={styles.scroll}>
            <Icon
              name="arrow-back"
              style={{
                color: '#4f6367',
                marginLeft: 10,
                marginBottom: 10,
              }}
              onPress={() => navigate('UserInformation')}
            />
            <Header
              centerComponent={{
                text: 'More about me',
                style: {
                  color: '#bbd8d8',
                  fontSize: 25,
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
              <TextInput
                style={styles.inputBox}
                value={firebase.auth().currentUser.uid.countries}
                onChangeText={countries => this.setState({countries})}
                placeholder={'the countries I visited'}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.container}>
              <TextInput
                style={styles.inputBox}
                value={firebase.auth().currentUser.uid.languages}
                onChangeText={languages => this.setState({languages})}
                placeholder={'languages i know'}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.container}>
              <TextInput
                style={styles.inputBox}
                value={firebase.auth().currentUser.uid.more}
                onChangeText={more => this.setState({more})}
                placeholder={'more about me'}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.button}>
              <Text onPress={this.ExDetailsCheck} style={styles.buttonText}>
                Continue
              </Text>
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
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 20,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 18,
    borderColor: '#eef5d8',
    borderWidth: 3,
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 25,
    fontSize: 18,
    borderRadius: 10,
    color: '#4f6367',
  },
  button: {
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
  buttonText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#bbd8d8',
  },
});

export default ExstraInformation;
