import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import firebase from 'firebase';

class AccountSettings extends React.Component {
  render() {
    const {state, goBack} = this.props.navigation;
    const params = state.params || {};
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.3}}
          style={{resizeMode: 'cover', flex: 1}}>
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
                onPress={() => goBack(params.go_back_key)}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    padding: 20,
  },
});

export default AccountSettings;

// firebase
//   .auth()
//   .currentUser.delete()
//   .then(function() {
//     console.log('delete successful?');
//     console.log(app.auth().currentUser);
//   })
//   .catch(function(error) {
//     console.error({error});
//   });
