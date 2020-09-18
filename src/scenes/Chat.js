import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Title} from 'react-native-paper';
import firebase from 'firebase';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.unsubscribe1 = null;
    this.unsubscribe2 = null;

    this.state = {
      uid: firebase.auth().currentUser.uid,
      partnersDetails: [],
      images: {},
      listOfUserCon: {},
      refreshing: false,
    };
  }

  componentDidMount() {
    this.renderMessages();

    this.unsubscribe1 = firebase
      .firestore()
      .collection('messages')
      .onSnapshot(this.renderMessages);

    this.unsubscribe2 = firebase
      .firestore()
      .collection('users')
      .onSnapshot(this.renderMessages);
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.renderMessages().then(() => this.setState({refreshing: false}));
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

  renderMessages = async () => {
    firebase
      .firestore()
      .collection('messages')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (this.state.uid === doc.data().Uid) {
            this.renderDetails(doc.data().UidPartner);
          } else if (this.state.uid === doc.data().UidPartner) {
            this.renderDetails(doc.data().Uid);
          }
        });
      });
  };

  renderDetails(refdoc) {
    const partnersDetails = [];
    if (!this.state.listOfUserCon[refdoc]) {
      this.setState({
        listOfUserCon: {...this.state.listOfUserCon, [refdoc]: refdoc},
      });
    }

    firebase
      .firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (
            this.state.uid != doc.data().uid &&
            this.state.listOfUserCon[doc.data().uid] &&
            !doc.data().disable &&
            !doc.data().delete
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
          if (!this.state.images[doc.data().uid]) {
            this.retrieveImage(doc);
          }
        });
      });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <ImageBackground
          source={require('../images/backgroundimagechat.jpeg')}
          imageStyle={{opacity: 0.1}}
          style={{resizeMode: 'cover', flex: 1}}>
          <View style={styles.container}>
            <Title style={{color: '#4f6367', fontSize: 25}}>
              conversations
            </Title>
          </View>

          <View style={{flex: 1, justifyContent: 'center', paddingTop: 10}}>
            <FlatList
              data={this.state.partnersDetails.sort((a, b) => b.Date - a.Date)}
              keyExtractor={item => item.uid}
              ItemSeparatorComponent={() => {
                return <View style={{marginTop: 10}} />;
              }}
              renderItem={post => {
                const item = post.item;
                return (
                  <View style={styles.boxDetails}>
                    <TouchableOpacity
                      style={styles.box}
                      onPress={() =>
                        this.props.navigation.navigate('Messages', {
                          ...item,
                          partnerUid: item.uid,
                          partnerImage: this.state.images[item.uid],
                          partnerFirstName: item.firstName,
                          partnerLastName: item.lastName,
                        })
                      }>
                      <View style={styles.imageContainer}>
                        <Image
                          style={styles.partnerImage}
                          source={
                            this.state.images[item.uid]
                              ? {uri: this.state.images[item.uid]}
                              : require('../images/user.png')
                          }
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.details}>
                          {item.firstName + ' ' + item.lastName}, {item.age}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{paddingRight: 15}}
                      onPress={() =>
                        this.props.navigation.navigate('PartnerProfile', {
                          ...item,
                          //percentage: this.state.percentage[item.uid],
                          image: this.state.images[item.uid],
                          months: item.selectedItems,
                        })
                      }>
                      {item.gender === 'male' ? (
                        <Image
                          style={styles.icon}
                          source={require('../images/info_male.png')}
                        />
                      ) : (
                        <Image
                          style={styles.icon}
                          source={require('../images/info_female.png')}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                );
              }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
            />
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
    padding: 15,
    backgroundColor: '#fff',
  },
  partnerImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#4f6367',
    marginLeft: 20,
    marginBottom: 10,
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
  boxDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderBottomWidth: 2,
  },
  box: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  details: {
    fontSize: 20,
    color: '#4f6367',
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 10,
  },
  icon: {
    width: 28,
    height: 28,
  },
});

export default Chat;
