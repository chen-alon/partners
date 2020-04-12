import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import firebase from 'firebase';

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      tableData: [],
      key: '',
      uid: firebase.auth().currentUser.uid,
    };
  }

  // componentDidMount() {
  //   const {navigation} = this.props;
  //   const ref = firebase
  //     .firestore()
  //     .collection('users')
  //     .doc(JSON.parse(navigation.getParam('firstName')));
  //   ref.get().then(doc => {
  //     if (doc.exists) {
  //       this.setState({
  //         board: doc.data(),
  //         key: doc.id,
  //         isLoading: false,
  //       });
  //     } else {
  //       console.log('No such document!');
  //     }
  //   });
  // }

  getName = () => {
    // const name = this.state.firstName;
    // if (name == null || name.length <= 0) return 'User';
    // return name;
    Alert.alert('hellooo');
    // firebase
    //   .firestore()
    //   .collection('users')
    //   .doc(this.state.uid)
    //   .get(firstName)
    //   .then(doc => {
    //     if (doc.exists) {
    //       return doc;
    //     } else {
    //       // doc.data() will be undefined in this case
    //       return 'user';
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log('Error getting document:', error);
    //   });
  };

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Image
            style={styles.avatar}
            source={require('../images/profile.jpg')}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>chen alon</Text>
              <Text style={styles.info}>hitchhiker / 2020</Text>
              <Text style={styles.description}>
                Let's find your partner for your next vacation
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
    width: 190,
    height: 190,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fe5f55',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 50,
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
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: '#eef5d8',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    //marginTop: 10,
    textAlign: 'center',
    marginBottom: 10,
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

export default UserProfile;
