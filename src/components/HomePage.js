// import React, {Component} from 'react';
// import {Text} from 'react-native';
// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

// // import Card from
// // import CardSection from

// createMaterialBottomTabNavigator(
//   RouteConfigs,
//   MaterialBottomTabNavigatorConfig,
// );

// const HomePage = ({user}) => {
//   //const { firstName, lastName, image} = user;
//   // return(
//   // <Card>
//   //     <CardSection>
//   //         <View></View>
//   //         <View>
//   //             <Text>helloooo</Text>
//   //             <Text>roii</Text>
//   //         </View>
//   //     </CardSection>
//   // </Card>
//   // )
// };

// const styles = {};

// export default HomePage;

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
} from 'react-native';

export default class ProfileCardView extends Component {
  constructor(props) {
    super(props);
  }

  onClickListener = viewId => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Image
              style={styles.profileImage}
              source={{
                uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
              }}
            />
            <Text style={styles.name}>John Doe</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={[styles.button, styles.buttonMessage]}
              onPress={() => this.onClickListener('message')}>
              <Image
                style={styles.icon}
                source={{uri: 'https://png.icons8.com/message/win8/100/ffffff'}}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.buttonLike]}
              onPress={() => this.onClickListener('like')}>
              <Image
                style={styles.icon}
                source={{
                  uri: 'https://png.icons8.com/facebook-like/win10/100/ffffff',
                }}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.buttonLove]}
              onPress={() => this.onClickListener('love')}>
              <Image
                style={styles.icon}
                source={{
                  uri: 'https://png.icons8.com/heart/androidL/100/ffffff',
                }}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.buttonCall]}
              onPress={() => this.onClickListener('phone')}>
              <Image
                style={styles.icon}
                source={{uri: 'https://png.icons8.com/phone/win8/100/ffffff'}}
              />
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  box: {
    marginTop: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
    paddingTop: 10,
  },
  profileImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  name: {
    fontSize: 35,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },

  button: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
    margin: 10,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    elevation: 4,
  },
  buttonMessage: {
    backgroundColor: '#00BFFF',
  },
  buttonLike: {
    backgroundColor: '#228B22',
  },
  buttonLove: {
    backgroundColor: '#FF1493',
  },
  buttonCall: {
    backgroundColor: '#40E0D0',
  },
  icon: {
    width: 35,
    height: 35,
  },
});
