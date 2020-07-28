import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Icon} from 'native-base';

class PartnerProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.navigation.state.params);
    this.state = {
      choice: '',
    };
  }
  onClickInformation() {
    return (
      <View style={styles.boxDetails}>
        <Text
          style={styles.inputBox}
          placeholder={'languages i know'}
          autoCapitalize="none"
        />
      </View>
    );
  }

  displayRequestedDetails() {
    if (this.state.choice === 'moreDetails') {
      return (
        <View style={styles.boxDetails}>
          <ScrollView>
            <View style={styles.boxText}>
              <Text style={{fontWeight: 'bold', fontSize: 19}}>
                {'summary: '}
              </Text>
              <Text style={{fontSize: 16}}>
                {this.props.navigation.state.params.more}
              </Text>
            </View>
            <View>
              <View style={styles.boxText}>
                <Text style={{fontWeight: 'bold', fontSize: 19}}>
                  {'countries: '}
                </Text>
                <Text style={{fontSize: 16}}>
                  {this.props.navigation.state.params.countries}
                </Text>
              </View>
              <View style={styles.boxText}>
                <Text style={{fontWeight: 'bold', fontSize: 19}}>
                  {'languages: '}
                </Text>
                <Text style={{fontSize: 16}}>
                  {this.props.navigation.state.params.languages}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }

    if (this.state.choice === 'travelingDetails') {
      return (
        <View style={styles.boxDetails}>
          <ScrollView>
            <View>
              {this.props.navigation.state.params.mode == 'israel' ? (
                <View style={styles.boxText}>
                  <Text style={{fontWeight: 'bold', fontSize: 19}}>
                    {'area: '}
                  </Text>
                  <Text style={{fontSize: 16}}>
                    {this.props.navigation.state.params.area}
                  </Text>
                </View>
              ) : (
                <View style={styles.boxText}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    {'country : '}
                  </Text>
                  <Text style={{fontSize: 20}}>
                    {this.props.navigation.state.params.mainland +
                      ', ' +
                      this.props.navigation.state.params.country}
                  </Text>
                </View>
              )}

              <View style={styles.boxText}>
                <Text style={{fontWeight: 'bold', fontSize: 19}}>
                  {'months: '}
                </Text>
                <Text style={{fontSize: 16}}>
                  {this.props.navigation.state.params.selectedIteams}
                </Text>
              </View>

              <View style={styles.boxText}>
                <Text style={{fontWeight: 'bold', fontSize: 19}}>
                  {'theme: '}
                </Text>
                <Text style={{fontSize: 16}}>
                  {this.props.navigation.state.params.theme}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }

  render() {
    const {state, goBack} = this.props.navigation;
    const params = state.params || {};

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../images/background.jpg')}
          imageStyle={{opacity: 0.4}}
          style={{resizeMode: 'cover', flex: 1}}>
          <ScrollView style={styles.scrollContainer}>
            <Icon
              name="arrow-back"
              style={{
                color: '#4f6367',
                marginLeft: 10,
                marginBottom: 10,
              }}
              onPress={() => goBack(params.go_back_key)}
            />
            <View>
              <View>
                <View>
                  <Image
                    style={styles.profileImage}
                    source={
                      this.props.navigation.state.params.image
                        ? {uri: this.props.navigation.state.params.image}
                        : require('../images/user.png')
                    }
                  />
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text style={styles.detailstext}>
                        {this.props.navigation.state.params.firstName}{' '}
                        {this.props.navigation.state.params.lastName}
                        {',\n'}
                        {this.props.navigation.state.params.gender}
                        {', '}
                        {this.props.navigation.state.params.age}
                      </Text>
                    </View>
                    <View style={styles.percent}>
                      <Text style={styles.percentText}>
                        {this.props.navigation.state.params.percentage + '%'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.setState({choice: 'moreDetails'})}>
                  <Image
                    style={styles.icon}
                    source={require('../images/information.png')}
                    // source={require('../images/details.png')}
                  />
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.setState({choice: 'travelingDetails'})}>
                  <Image
                    style={styles.icon}
                    source={require('../images/airplane-take-off.png')}
                  />
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.button}
                  onPress={() =>
                    this.props.navigation.navigate('Messages', {
                      choosenUid: this.props.navigation.state.params.uid,
                    })
                  }>
                  <Image
                    style={styles.icon}
                    source={require('../images/send-message.png')}
                  />
                </TouchableHighlight>
              </View>
              {this.state.choice === '' ? (
                <View></View>
              ) : (
                this.displayRequestedDetails()
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
  },
  profileImage: {
    alignSelf: 'center',
    width: 230,
    height: 230,
    borderWidth: 4,
    borderColor: '#dcdcdc',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
  },
  button: {
    width: 70,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fe5f55',
    marginBottom: 20,
    borderRadius: 40,
    // margin: 8,
    margin: 15,
    shadowColor: 'black',
    elevation: 13,
    borderWidth: 2,
    borderColor: '#fff',
  },
  icon: {
    width: 40,
    height: 40,
  },
  boxDetails: {
    backgroundColor: '#dcdcdc',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 50,
    marginTop: 20,
  },
  percent: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#dcdcdc',
    borderRadius: 40,
    elevation: 15,
    borderWidth: 2,
    borderColor: '#fff',
    color: '#4f6367',
    alignSelf: 'center',
    marginLeft: 60,
  },
  detailstext: {
    fontSize: 25,
    //color: '#4f6367',
    fontWeight: 'bold',
    paddingLeft: 40,
    paddingTop: 10,
    paddingBottom: 10,
  },
  boxText: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  percentText: {
    fontSize: 25,
    //color: '#4f6367',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default PartnerProfile;
