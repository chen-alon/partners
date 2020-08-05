import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {Title, ThemeProvider} from 'react-native-paper';
import firebase from 'firebase';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;

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
    //   .collection('Messages')
    //   .where('Uid' === this.state.uid || 'UidPartner' === this.state.uid)
    //   .orderBy('Date')
    //   .get()
    //   .then(querySnapshot => {
    //     if (this.state.oldMessages.length < 1) {
    //       querySnapshot.forEach(doc => {
    //         this.setState({
    //           oldMessages: [...this.state.oldMessages, doc.data()],
    //         });
    //       });
    //     }
    //   });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.5}}
          style={{resizeMode: 'cover', flex: 1}}>
          {/* <DotIndicator color="#fe5f55" /> */}
          <View style={styles.container}>
            <Title style={{color: '#4f6367'}}>conversations</Title>

            <ScrollView style={{flex: 1}}>
              {/*   <FlatList
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
              />*/}
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
});

export default Chat;
