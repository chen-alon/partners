import React, {Component} from 'react';
import {Header, ListItem} from 'react-native-elements';
import {
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {Footer, Container, Icon, View} from 'native-base';
import firebase from 'firebase';

class Messages extends Component {
  constructor(props) {
    super(props);

    this.messagesRef = firebase.firestore().collection('Messages');
    //.where('Uid1', 'array-contains', 'hfc');
    this.userid = firebase.auth().currentUser.uid;
    this.newUid =
      firebase.auth().currentUser.uid +
      this.props.navigation.state.params.partnerUid;
    this.state = {
      oldMessages: [],
      message: '',
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
          title={message.Message}
        />
      ) : (
        <ListItem
          titleStyle={styles.titleStyle2}
          containerStyle={styles.containerStyle2}
          key={i}
          title={message.Message}
        />
      ),
    );
  }

  clear() {
    this.textInputRef.clear();
  }

  onPressOut(message, partnerUid) {
    if (message !== '') {
      this.clear();
      this.addMessageToFirebase(message, partnerUid);
    }
  }
  addMessageToFirebase(message, partnerUid) {
    this.messagesRef
      .add({
        Message: message,
        Date: Date(),
        Uid: this.userid,
        UidPartner: partnerUid,
        Uid1: [this.userid + partnerUid, partnerUid + this.userid],
      })
      .then(function(docRef) {
        this.setState({
          message: '',
        });
      })
      .catch(function(docRef) {});
  }

  render() {
    const {state, goBack} = this.props.navigation;
    const params = state.params || {};
    return (
      <Container style={{flex: 1}}>
        <Header
          containerStyle={{
            backgroundColor: '#fff',
            width: Dimensions.get('window').width, //full width
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="arrow-back"
              style={{
                color: '#4f6367',
                alignSelf: 'center',
                marginBottom: 20,
                marginLeft: 10,
              }}
              onPress={() => goBack(params.go_back_key)}
            />
            <Image
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
            </View>
          </View>
        </Header>

        <ImageBackground
          source={require('../images/imagebackgroundchat.jpeg')}
          imageStyle={{opacity: 0.5}}
          style={{resizeMode: 'cover', flex: 1}}>
          <ScrollView
            style={{flex: 1, margin: 10}}
            ref="flatList"
            onContentSizeChange={() => this.refs.flatList.scrollToEnd()}>
            <View>{this.displayMessages(this.state.oldMessages)}</View>
          </ScrollView>

          <Footer
            style={{
              backgroundColor: '#fff',
              height: 50,
              justifyContent: 'space-between',
              paddingLeft: 20,
              paddingRight: 15,
            }}>
            <TextInput
              style={styles.input}
              placeholder={'Write your message here...'}
              height={45}
              autoCorrect={false}
              ref={ref => (this.textInputRef = ref)}
              onChangeText={message => this.setState({message})}
              value={this.state.message}
            />
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => {
                this.onPressOut(
                  this.state.message,
                  this.props.navigation.state.params.partnerUid,
                );
                Keyboard.dismiss();
              }}>
              <Image
                style={styles.icon}
                source={require('../images/send.png')}
              />
            </TouchableOpacity>
          </Footer>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  partnerImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#4f6367',
    marginLeft: 20,
    marginBottom: 25,
  },
  input: {
    marginRight: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    alignSelf: 'center',
    marginTop: 15,
  },
  titleStyle1: {
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
    borderColor: '#005D93',
  },
  titleStyle2: {
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
    borderColor: '#005D93',
  },
  containerStyle1: {
    backgroundColor: '#bbd8d8',
    borderWidth: 0.5,
    borderRadius: 10,
    width: 250,
    alignSelf: 'flex-end',
    marginTop: 10,
    shadowColor: 'black',
    elevation: 10,
  },
  containerStyle2: {
    borderWidth: 0.5,
    borderRadius: 10,
    width: 250,
    alignSelf: 'flex-start',
    marginTop: 10,
    shadowColor: 'black',
    elevation: 10,
  },
  icon: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
});

export default Messages;
