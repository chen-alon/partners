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
  Image,
} from 'react-native';
import {Icon} from 'native-base';
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
    const {state, goBack} = this.props.navigation;
    const params = state.params || {};

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
              source={require('../images/More.png')}
            />
            <View style={styles.container}>
              <TextInput
                style={styles.inputBox}
                value={this.state.countries}
                onChangeText={countries => this.setState({countries})}
                placeholder={'the countries I visited'}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.container}>
              <TextInput
                style={styles.inputBox}
                value={this.state.languages}
                onChangeText={languages => this.setState({languages})}
                placeholder={'languages i know'}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.container}>
              <TextInput
                style={styles.inputBox}
                value={this.state.more}
                onChangeText={more => this.setState({more})}
                placeholder={'more about me'}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={this.ExDetailsCheck}>
              <Text style={styles.buttonText}>Continue</Text>
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
