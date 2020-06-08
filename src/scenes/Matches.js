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
  Alert,
} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import firebase from 'firebase';

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;

    this.state = {
      loading: false,
      percentage: [],
      uid: firebase.auth().currentUser.uid,
    };
  }

  checkMatch(doc, currentUser) {
    var idealHitch = 0;
    if (
      currentUser.partnerGender === doc.data().gender ||
      currentUser.partnerGender === 'all' ||
      doc.data().partnerGender === 'all'
    ) {
      idealHitch++;
    }
    if (
      currentUser.theme === doc.data().theme ||
      currentUser.theme === 'all the theme' ||
      doc.data().theme === 'all the theme'
    ) {
      idealHitch++;
    }
    if (
      currentUser.partnerAge === doc.data().partnerAge ||
      currentUser.partnerAge === 'all' ||
      doc.data().partnerAge === 'all'
    ) {
      idealHitch++;
    }
    if (
      currentUser.selectedItems[0] === '0' ||
      doc.data().selectedItems[0] === '0'
    ) {
      idealHitch++;
    }
    // else {
    //   let index = 1;
    //   let similarMonths = 0;
    //   while (similarMonths == 0) {
    //     if (
    //       currentUser.selectedItems[index] === doc.data().selectedItems[index]
    //     ) {
    //       similarMonths = 1;
    //     }
    //     if (
    //       currentUser.selectedItems[index] === doc.data().selectedItems[index]
    //     ){

    //     }
    //       index++;
    //   }
    // }
    var similarAnswers = 0;
    for (let i = 0; i < doc.data().ListOfQandA.length; i++) {
      if (doc.data().ListOfQandA[i].a && currentUser.ListOfQandA[i].a) {
        if (doc.data().ListOfQandA[i].a === currentUser.ListOfQandA[i].a) {
          similarAnswers++;
        }
      }
    }

    var perID = Math.round((idealHitch / 4) * 40);
    var perSA = Math.round((similarAnswers / 15) * 60);
    var percent = perID + perSA;

    if (similarAnswers >= 1) {
      this.setState({
        percentage: [...this.state.percentage, [doc.data().uid, percent]],
      });
      return true;
    } else {
      this.setState({
        percentage: [...this.state.percentage, [doc.data().uid, percent]],
      });
      return false;
    }
  }

  componentDidMount() {
    const partnersDetails = [];

    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            currentUserDetails: doc.data(),
            isLoading: false,
          });
        } else {
          console.log('No such document!');
        }
      });

    this.ref.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (
          this.state.uid != doc.data().uid &&
          this.state.currentUserDetails.mode === doc.data().mode &&
          (this.state.currentUserDetails.area === doc.data().area ||
            this.state.currentUserDetails.country === doc.data().country ||
            this.state.currentUserDetails.area === 'no matter' ||
            doc.data().area === 'no matter' ||
            this.state.currentUserDetails.country === 'all country' ||
            doc.data().country === 'all country') &&
          this.checkMatch(doc, this.state.currentUserDetails)
        ) {
          const {
            uid,
            email,
            firstName,
            lastName,
            age,
            gender,
            dateOfBirth,
            ListOfQandA,
            mode,
            area,
            country,
            theme,
            selectedItems,
          } = doc.data();
          partnersDetails.push({
            key: doc.id,
            doc,
            uid,
            email,
            firstName,
            lastName,
            age,
            gender,
            dateOfBirth,
            ListOfQandA,
            mode,
            area,
            country,
            theme,
            selectedItems,
          });
          this.setState({
            partnersDetails,
            loading: false,
          });
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
              data={this.state.partnersDetails}
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
                    {/* onPress={() => navigate('PartnerProfile')}> */}
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
                      <Text style={styles.percentage}>
                        {this.state.percentage.map(percent => {
                          if (percent[0] == item.uid) {
                            return percent[1] + '%';
                          }
                        })}
                      </Text>
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
    fontSize: 20,
    flex: 1,
    //color: '#eef5db',
    color: '#4f6367',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default Matches;
