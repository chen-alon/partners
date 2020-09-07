import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Title} from 'react-native-paper';
import firebase from 'firebase';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: firebase.auth().currentUser.uid,
      partnersDetails: [],
      images: {},
      listOfUserCon: {},
    };
  }

  componentDidMount() {
    this.renderMessages();

    this.unsubscribe = firebase
      .firestore()
      .collection('messages')
      .onSnapshot(this.renderMessages);
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

  renderMessages() {
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
  }

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
            const {uid, firstName, lastName, age} = doc.data();
            partnersDetails.push({
              key: doc.id,
              doc,
              uid,
              firstName,
              lastName,
              age,
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
              data={this.state.partnersDetails}
              keyExtractor={item => item.uid}
              ItemSeparatorComponent={() => {
                return <View style={{marginTop: 10}} />;
              }}
              renderItem={post => {
                const item = post.item;
                return (
                  <TouchableOpacity
                    style={styles.boxDetails}
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
                    <View>
                      <Text style={styles.details}>
                        {item.firstName + ' ' + item.lastName}, {item.age}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
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
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    borderColor: '#d3d3d3',
    borderBottomWidth: 2,
  },
  details: {
    fontSize: 20,
    color: '#4f6367',
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default Chat;
