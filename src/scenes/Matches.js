import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import firebase from '../utils/firebase/firebase-db';

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;

    this.state = {
      details: [],
      loading: false,
      uid: firebase.auth().currentUser.uid,
    };
  }

  // componentDidMount() {
  //   this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  // }

  // onCollectionUpdate = querySnapshot => {
  //   const details = [];
  //   querySnapshot.forEach(doc => {
  //     const {email, firstName, lastName, age, gender, dateOfBirth} = doc.data();
  //     details.push({
  //       key: doc.id,
  //       doc, // DocumentSnapshot
  //       email,
  //       firstName,
  //       lastName,
  //       age,
  //       gender,
  //       dateOfBirth,
  //     });
  //   });
  //   this.setState({
  //     details,
  //     loading: false,
  //   });
  // };

  componentDidMount() {
    const details = [];
    const currentUserDetails = [];
    this.arr = this.ref.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (this.state.uid !== doc.data().uid) {
          const {
            email,
            firstName,
            lastName,
            age,
            gender,
            dateOfBirth,
          } = doc.data();
          details.push({
            key: doc.id,
            doc,
            email,
            firstName,
            lastName,
            age,
            gender,
            dateOfBirth,
          });
          this.setState({
            details,
            loading: false,
          });
        } else {
        }
      });
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.5}}
          style={{resizeMode: 'cover', flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <FlatList
              style={styles.list}
              //contentContainerStyle={styles.listContainer}
              data={this.state.details}
              horizontal={false}
              numColumns={2}
              keyExtractor={item => item.uid}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              renderItem={post => {
                const item = post.item;
                return (
                  <TouchableOpacity style={styles.card}>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.cardImage}
                        source={
                          item.image
                            ? {uri: item.image}
                            : require('../images/user.png')
                        }
                      />
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.details}>
                        {item.firstName + ' ' + item.lastName}, {item.age}
                      </Text>
                      <Text style={styles.percentage}>{item.percentage}%</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  listContainer: {
    //alignItems: 'center',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    marginVertical: 8,
    //backgroundColor: '#eef5db',

    flexBasis: '45%',
    marginHorizontal: 10,
  },
  cardContent: {
    //paddingVertical: 17,
    justifyContent: 'space-between',
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  /******** card components **************/
  details: {
    fontSize: 20,
    flex: 1,
    //color: '#eef5db',
    color: '#4f6367',
    alignSelf: 'center',
  },

  percentage: {
    fontSize: 24,
    flex: 1,
    //color: '#eef5db',
    color: '#4f6367',
    alignSelf: 'center',
  },
});

export default Matches;
