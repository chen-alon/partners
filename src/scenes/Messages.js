import React, {Component} from 'react';
import {Header, ListItem} from 'react-native-elements';
import {TextInput, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Footer, Container} from 'native-base';
import firebase from 'firebase';

class Messages extends Component {
  constructor(props) {
    super(props);
    console.log(props.navigation.state.params);

    this.messagesRef = firebase.firestore().collection('Messages');
    //.where('Uid1', 'array-contains', 'hfc');
    this.userid = firebase.auth().currentUser.uid;
    this.newUid =
      firebase.auth().currentUser.uid +
      this.props.navigation.state.params.choosenUid;
    console.log(this.newUid);
    this.state = {
      oldMessages: [],
      message: '',
      username: '',
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase
      .firestore()
      .collection('Messages')
      .orderBy('Date')
      .where('Uid1', 'array-contains-any', [this.newUid])
      .onSnapshot(this.onCollectionUpdate);

    firebase
      .firestore()
      .collection('Messages')
      .where('Uid1', 'array-contains-any', [this.newUid])
      .orderBy('Date')
      .get()
      .then(querySnapshot => {
        if (this.state.oldMessages.length < 1) {
          querySnapshot.forEach(doc => {
            this.setState({
              oldMessages: [...this.state.oldMessages, doc.data()],
            });
          });
        }
      });
  }

  onCollectionUpdate = querySnapshot => {
    this.setState({oldMessages: []});
    querySnapshot.forEach(doc => {
      this.setState({oldMessages: [...this.state.oldMessages, doc.data()]});
    });
  };

  displayMessages(oldMessages) {
    return oldMessages.map((message, i) =>
      this.userid === message.Uid ? (
        <ListItem
          titleStyle={styles.titleStyle1}
          containerStyle={styles.containerStyle1}
          key={i}
          title={message.Date + message.Message}
          subtitle={<Text style={{color: '#fff'}}>{message.Username}</Text>}
        />
      ) : (
        <ListItem
          titleStyle={styles.titleStyle2}
          containerStyle={styles.containerStyle2}
          key={i}
          title={message.Message}
          subtitle={<Text>{message.Username}</Text>}
        />
      ),
    );
  }

  clear() {
    this.textInputRef.clear();
  }

  onPressOut(message, choosenUid) {
    if (message !== '') {
      this.clear();
      this.addMessageToFirebase(message, choosenUid);
    }
  }
  addMessageToFirebase(message, choosenUid) {
    this.messagesRef
      .add({
        Message: message,
        Date: Date(),
        Uid: this.userid,
        Uid1: [this.userid + choosenUid, choosenUid + this.userid],
        Username: this.state.username,
      })
      .then(function(docRef) {
        this.setState({
          message: '',
        });
      })
      .catch(function(docRef) {});
  }

  onLogOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        alert('You have been successfully logged out');
      })
      .catch(function(error) {});
  }

  render() {
    return (
      <Container>
        {/* <Image
          style={styles.profileImage}
          source={
            this.props.navigation.state.params.image
              ? {uri: this.props.navigation.state.params.image}
              : require('../images/user.png')
          }
        /> */}
        <ScrollView style={{flexDirection: 'column-reverse', marginBottom: 20}}>
          {this.displayMessages(this.state.oldMessages)}
          <Text>{this.props.navigation.state.params.choosenUsername}</Text>
        </ScrollView>

        <Footer>
          <TextInput
            style={styles.input}
            placeholder={'Write your message here...'}
            placeholderTextColor="#BCBCBC"
            height={45}
            autoCorrect={false}
            ref={ref => (this.textInputRef = ref)}
            onChangeText={message => this.setState({message})}
            value={this.state.message}
          />

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              this.onPressOut(
                this.state.message,
                this.props.navigation.state.params.choosenUid,
              );
            }}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

export default Messages;

const styles = {
  input: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderColor: '#005D93',
    borderWidth: 2,
    fontSize: 18,
    width: '70%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    alignSelf: 'center',
    marginTop: 15,
  },
  buttonStyle: {
    marginTop: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1B9CE5',
  },
  titleStyle1: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'right',
    borderColor: '#005D93',
  },
  titleStyle2: {
    fontSize: 18,
    color: '#000',
    textAlign: 'right',
    borderColor: '#005D93',
  },
  containerStyle1: {
    backgroundColor: '#005D93',
    borderWidth: 2,
    borderRadius: 40,
    width: 300,
    height: 60,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  containerStyle2: {
    borderWidth: 2,
    borderRadius: 40,
    width: 300,
    height: 60,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
};
