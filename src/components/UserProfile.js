import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import firebase from 'firebase';

export default class UserProfile extends Component {
  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={require('./images/start.jpg')} />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>user name</Text>
              <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
                electram expetendis, omittam deseruisse consequuntur ius an,
              </Text>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color: '#eef5d8'}}>Edit profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color: '#eef5d8'}}>Ideal hitchhiker</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color: '#eef5d8'}}>Account settings</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                {/* <Button
                  title="Sign out"
                  color="#fe5f55"
                  onPress={() => firebase.auth().signOut()}
                /> */}
                <Text
                  style={{color: '#eef5d8', fontSize: 20, fontWeight: 'bold'}}
                  onPress={() => firebase.auth().signOut()}>
                  Sign Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
  header: {
    backgroundColor: '#b8d8d8',
    height: 170,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#fe5f55',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 70,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#eef5d8',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    borderColor: '#b8d8d8',
    borderWidth: 1,
    backgroundColor: '#fe5f55',
  },
});
