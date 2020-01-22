import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Header} from 'react-native-elements';
import firebase from 'firebase';
import 'firebase/firestore';

class ExstraInformation extends Component {
  static navigationOptions = {
    title: 'Exstra Details',
    headerStyle: {
      backgroundColor: '#F8F8F8',
    },
  };

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
        this.props.navigation.navigate('Partners'),
        this.setState({
          isLoading: false,
        }),
      )
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  };

  render() {
    return (
      <ScrollView style={styles.scroll}>
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
          }}
        />
        <View style={styles.container}>
          <TextInput
            style={styles.inputBox}
            value={this.state.countries}
            onChangeText={countries => this.setState({countries})}
            placeholder={'countries'}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.inputBox}
            value={this.state.languages}
            onChangeText={languages => this.setState({languages})}
            placeholder={'languages'}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.inputBox}
            value={this.state.more}
            onChangeText={more => this.setState({more})}
            placeholder={'more'}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text onPress={this.ExDetailsCheck} style={styles.buttonText}>
            Continue
          </Text>
        </TouchableOpacity>
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
    backgroundColor: '#EEF5D8',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 20,
    marginTop: 5,
    marginBottom: 5,
  },

  inputBox: {
    width: '85%',
    margin: 10,
    padding: 30,
    fontSize: 18,
    borderColor: '#d3d3d3',
    color: '#4f6367',
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
