import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Alert,
} from 'react-native';
import UserInformation from '../scenes/UserInformation';
// import {Button} from 'native-base';

class Card extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.5}}
          style={{resizeMode: 'cover', flex: 1}}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
              <Text
                onPress={() =>
                  this.props.navigation.navigate('UserInformation')
                }
                style={styles.buttonText}>
                Matchs
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text onPress={this._onPressButton} style={styles.buttonText}>
                Chat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text onPress={this._onPressButton} style={styles.buttonText}>
                Profile
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'pink',
  },
  button: {
    flex: 1,
    backgroundColor: '#4f6367',
  },
  buttonText: {
    padding: 20,
    color: '#749e9f',
    alignSelf: 'center',
  },
});

export default Card;
