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
    // this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;

    if (firebase.auth().currentUser != null) {
      this.state = {
        percentage: {},
        uid: firebase.auth().currentUser.uid,
        partnersDetails: [],
        images: {},
      };
    }
  }

  retrieveImage(doc) {
    let imageRef = firebase
      .storage()
      .ref('images')
      .child(doc.data().uid);
    imageRef
      .getDownloadURL()
      .then(url => {
        //from url you can fetched the uploaded image easily
        this.setState({images: {...this.state.images, [doc.data().uid]: url}});
      })
      .catch(_ => {});
  }

  checkMatch(doc, currentUser) {
    var idealHitch = 0;
    var similarMonths = 0;
    if (
      currentUser.partnerGender === doc.data().gender ||
      currentUser.partnerGender === 'all' ||
      (currentUser.partnerGender != 'all' && doc.data().partnerGender === 'all')
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
      currentUser.partnerAge === doc.data().rangeAge ||
      currentUser.partnerAge === 'all' ||
      (currentUser.partnerAge != 'all' && doc.data().partnerAge === 'all')
    ) {
      idealHitch++;
    }

    if (
      currentUser.selectedItems[0] === '0' ||
      doc.data().selectedItems[0] === '0'
    ) {
      idealHitch++;
    } else {
      let indexCurrentUser = 0;
      let indexPartnerUser = 0;
      while (
        indexCurrentUser < currentUser.selectedItems.length &&
        indexPartnerUser < doc.data().selectedItems.length &&
        similarMonths != 1
      ) {
        if (
          currentUser.selectedItems[indexCurrentUser] <
          doc.data().selectedItems[indexPartnerUser]
        ) {
          indexCurrentUser++;
        } else if (
          currentUser.selectedItems[indexCurrentUser] >
          doc.data().selectedItems[indexPartnerUser]
        ) {
          indexPartnerUser++;
        } else {
          similarMonths++;
        }
      }
    }
    if (similarMonths === 1) {
      idealHitch++;
    }

    var similarAnswers = 0;
    for (let i = 0; i < doc.data().ListOfQandA.length; i++) {
      if (doc.data().ListOfQandA[i].a && currentUser.ListOfQandA[i].a) {
        if (doc.data().ListOfQandA[i].a === currentUser.ListOfQandA[i].a) {
          similarAnswers++;
        }
      }
    }

    var perIdealHitch = Math.round((idealHitch / 4) * 60);
    var perSimilarAnswer = Math.round((similarAnswers / 15) * 40);
    var percent = perIdealHitch + perSimilarAnswer;
    if (percent >= 60) {
      if (!this.state.images[doc.data().uid]) {
        this.retrieveImage(doc);
      }
      this.setState({
        percentage: {
          ...this.state.percentage,
          [doc.data().uid]: percent,
        },
      });
      return true;
    } else {
      return false;
    }
  }

  renderDetails() {
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
          });
        } else {
          console.log('No such document!');
        }
      });

    firebase
      .firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (
            this.state.uid != doc.data().uid &&
            !doc.data().disable &&
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
              firstName,
              lastName,
              age,
              rangeAge,
              gender,
              dateOfBirth,
              countries,
              languages,
              more,
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
              firstName,
              lastName,
              age,
              rangeAge,
              gender,
              dateOfBirth,
              countries,
              languages,
              more,
              ListOfQandA,
              mode,
              area,
              country,
              theme,
              selectedItems,
            });
            this.setState({
              partnersDetails,
            });
          }
        });
      });
  }

  componentDidMount() {
    this.renderDetails();

    // this.unsubscribe = firebase
    //   .firestore()
    //   .collection('users')
    //   .onSnapshot(this.renderDetails);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.5}}
          style={{resizeMode: 'cover', flex: 1}}>
          <FlatList
            style={styles.list}
            //contentContainerStyle={styles.listContainer}
            data={this.state.partnersDetails
              .filter(partner => this.state.percentage[partner.uid])
              .sort(
                (a, b) =>
                  this.state.percentage[b.uid] - this.state.percentage[a.uid],
              )}
            horizontal={false}
            numColumns={2}
            keyExtractor={item => item.uid}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={post => {
              const item = post.item;
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    this.props.navigation.navigate('PartnerProfile', {
                      ...item,
                      percentage: this.state.percentage[item.uid],
                      image: this.state.images[item.uid],
                    })
                  }>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.cardImage}
                      source={
                        this.state.images[item.uid]
                          ? {uri: this.state.images[item.uid]}
                          : require('../images/user.png')
                      }
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.details}>
                      {item.firstName + ' ' + item.lastName}, {item.age}
                    </Text>
                    <Text style={styles.percentage}>
                      {this.state.percentage[item.uid] + '%'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
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
    width: 150,
    alignSelf: 'center',
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
    //fontSize: 20,
    flex: 1,
    color: '#4f6367',
    alignSelf: 'center',
  },

  percentage: {
    fontSize: 20,
    flex: 1,
    color: '#4f6367',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default Matches;
