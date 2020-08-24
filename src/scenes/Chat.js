import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {List, ListItem, Icon, Button} from 'react-native-elements';

import {Title, ThemeProvider} from 'react-native-paper';
import firebase from 'firebase';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.messagesRef = firebase.firestore().collection('messages');

    this.state = {
      loading: false,
      percentage: {},
      uid: firebase.auth().currentUser.uid,
      partnersDetails: [],
      images: {},
    };
  }

  componentDidMount() {
    // this.unsubscribe = firebase
    //   .firestore()
    //   .collection('Messages')
    //   .orderBy('Date')
    //   .where('Uid', '==', this.state.uid || 'UidPartner', '==', this.state.uid)
    //   .onSnapshot(this.onCollectionUpdate);
    // firebase
    //   .firestore()
    //   .collection('messages')
    //   .where('Uid' === this.state.uid || 'UidPartner' === this.state.uid)
    //   .get();

    firebase
      .firestore()
      .collection('messages')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (
            this.state.uid === doc.data().Uid ||
            this.state.uid === doc.data().UidPartner
          ) {
            const {Date, Uid, UidPartner} = doc.data();
            partnersDetails.push({
              key: doc.id,
              doc,
              Date,
              Uid,
              UidPartner,
            });
            this.setState({
              partnersDetails,
            });
          }
        });
      });
  }

  renderDetails() {
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

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.5}}
          style={{resizeMode: 'cover', flex: 1}}>
          <View style={styles.container}>
            <Title style={{color: '#4f6367'}}>conversations</Title>

            <ScrollView style={{flex: 1}}>
              <FlatList
                style={styles.list}
                //contentContainerStyle={styles.listContainer}
                data={this.state.partnersDetails
                  .filter(partner => this.state.percentage[partner.uid])
                  .sort(
                    (a, b) => this.state.Date[b.uid] - this.state.Date[a.uid],
                  )}
                keyExtractor={item => item.uid}
                ItemSeparatorComponent={() => {
                  return <View style={{marginTop: 10}} />;
                }}
                renderItem={post => {
                  const item = post.item;
                  return (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() =>
                        this.props.navigation.navigate('Messages', {
                          ...item,
                          // partnerUid: this.props.navigation.state.params.uid,
                          // partnerImage: this.props.navigation.state.params.image,
                          // partnerFirstName: this.props.navigation.state.params
                          //   .firstName,
                          // partnerLastName: this.props.navigation.state.params
                          //   .lastName,
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
              {/* <Image
                style={styles.partnerImage}
                source={
                  this.props.navigation.state.params.partnerImage
                    ? {uri: this.props.navigation.state.params.partnerImage}
                    : require('../images/user.png')
                }
              />
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 10,
                  marginBottom: 20,
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {this.props.navigation.state.params.partnerFirstName}
                </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {' ' + this.props.navigation.state.params.partnerLastName}
                </Text>
              </View> */}
              {/* <FlatList
                style={styles.list}
                data={this.state.partnersDetails
                  .filter(partner => this.state.percentage[partner.uid])
                  .sort(
                    (a, b) =>
                      this.state.percentage[b.uid] -
                      this.state.percentage[a.uid],
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
              /> */}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  partnerImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#4f6367',
    marginLeft: 20,
    marginBottom: 25,
  },
  box: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'column',
    borderColor: '#d3d3d3',
    borderBottomWidth: 2,
    height: '14%',
  },
});

export default Chat;
