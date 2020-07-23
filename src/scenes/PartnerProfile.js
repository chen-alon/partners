import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Icon} from 'native-base';
import firebase from 'firebase';

class PartnerProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.navigation.state.params);
    this.state = {
      choice: '',
    };
  }

  onClickListener = viewId => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  onClickInformation() {
    return (
      <View style={(backgroundColor = '#fff')}>
        <Text
          style={styles.inputBox}
          placeholder={'languages i know'}
          autoCapitalize="none"
        />
      </View>
    );
  }

  onClickMessage = () => {
    Alert.alert('send message - Going forward');
  };

  displayRequestedDetails() {
    if (this.state.choice === 'basicInformation') {
      return (
        <View style={styles.boxDetails}>
          <ScrollView>
            <Text>information</Text>
          </ScrollView>
        </View>
      );
    }

    if (this.state.choice === 'moreDetails') {
      return (
        <View style={styles.boxDetails}>
          <ScrollView>
            <Text>more Details</Text>
          </ScrollView>
        </View>
      );
    }

    if (this.state.choice === 'travelingDetails') {
      return (
        <View style={styles.boxDetails}>
          <ScrollView>
            <Text>traveling Details</Text>
          </ScrollView>
        </View>
      );
    }

    if (this.state.choice === 'message') {
      return (
        <View style={styles.boxDetails}>
          <ScrollView>
            <Text>send message</Text>
          </ScrollView>
        </View>
      );
    }
  }

  render() {
    const {state, goBack} = this.props.navigation;
    const params = state.params || {};

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.6}}
          style={{resizeMode: 'cover', flex: 1}}>
          <ScrollView style={styles.scrollContainer}>
            <Icon
              name="arrow-back"
              style={{
                color: '#4f6367',
                marginLeft: 10,
                marginBottom: 10,
              }}
              onPress={() => goBack(params.go_back_key)}
            />
            <View>
              <View>
                <View>
                  <Image
                    style={styles.profileImage}
                    source={
                      this.props.navigation.state.params.image
                        ? {uri: this.props.navigation.state.params.image}
                        : require('../images/user.png')
                    }
                  />
                  <Text style={styles.details}>
                    {this.props.navigation.state.params.firstName}{' '}
                    {this.props.navigation.state.params.lastName}
                    {', '}
                    {this.props.navigation.state.params.age}
                  </Text>
                  <Text style={styles.details}>
                    {this.props.navigation.state.params.percentage + '%'}
                  </Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.setState({choice: 'basicInformation'})}>
                  <Image
                    style={styles.icon}
                    source={require('../images/information.png')}
                  />
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.setState({choice: 'moreDetails'})}>
                  <Image
                    style={styles.icon}
                    source={require('../images/details.png')}
                  />
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.setState({choice: 'travelingDetails'})}>
                  <Image
                    style={styles.icon}
                    source={require('../images/airplane-take-off.png')}
                  />
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.setState({choice: 'message'})}>
                  <Image
                    style={styles.icon}
                    source={require('../images/send-message.png')}
                  />
                </TouchableHighlight>
              </View>
              {this.state.choice === '' ? (
                <View></View>
              ) : (
                this.displayRequestedDetails()
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
  },
  profileImage: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderWidth: 4,
    borderColor: '#dcdcdc',
  },
  details: {
    fontSize: 25,
    alignSelf: 'center',
    color: '#4f6367',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center',
  },
  button: {
    width: 70,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fe5f55',
    marginBottom: 20,
    borderRadius: 40,
    margin: 8,
    shadowColor: 'black',
    elevation: 13,
    borderWidth: 2,
    borderColor: '#fff',
  },
  icon: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
  boxDetails: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    //borderRadius: 1,
    borderColor: '#dcdcdc',
  },
});

export default PartnerProfile;
