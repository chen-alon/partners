import React, {Component} from 'react';
// import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
// import {Card} from './common/Card';
// import {CardSection} from './common/CardSection';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-paper';
// const UserDetail = props => {
//const {userName, age, pic, percentage} = partner;
class UserDetail extends Component {
  //   render() {
  //     return (
  //       //   <Card>
  //       //     <CardSection>
  //       <ScrollView style={styles.scroll}>
  //         <View>
  //           <Image
  //             style={styles.picStyle}
  //             source={require('./images/start.jpg')}
  //           />
  //           <Text style={styles.percentStyle}>percentage</Text>
  //         </View>
  //         <View style={styles.detailStyle}>
  //           <Text>userName, age</Text>
  //         </View>
  //       </ScrollView>
  //       //     </CardSection>
  //       //   </Card>
  //     );
  //   }
  // }

  // const styles = StyleSheet.create({
  //   detailStyle: {
  //     //flexDirection: 'column',
  //     justifyContent: 'space-around',
  //   },
  //   scroll: {
  //     flex: 1,
  //     padding: 20,
  //     backgroundColor: '#7a9e9f',
  //   },
  //   percentStyle: {
  //     fontSize: 20,
  //     fontWeight: 'bold',
  //   },
  //   picStyle: {
  //     height: 150,
  //     width: 150,
  //     justifyContent: 'space-around',
  //     flexDirection: 'column',
  //     marginLeft: 10,
  //   },
  // });

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          firstName: 'Chen',
          age: '26',
          percentage: '90',
          image: 'https://lorempixel.com/400/200/nature/6/',
        },
        {
          firstName: 'Roi',
          age: '27',
          percentage: '89',
          image: 'https://lorempixel.com/400/200/nature/5/',
        },
        {
          firstName: 'Tehila',
          age: '21',
          percentage: '81',
          image: 'https://lorempixel.com/400/200/nature/4/',
        },
        {
          firstName: 'Naomi',
          age: '26',
          percentage: '81',
          image: 'https://lorempixel.com/400/200/nature/6/',
        },
        {
          firstName: 'Stav',
          age: '20',
          percentage: '77',
          image: 'https://lorempixel.com/400/200/sports/1/',
        },
        {
          firstName: 'Gal',
          age: '19',
          percentage: '70',
          image: 'https://lorempixel.com/400/200/nature/8/',
        },
        {
          firstName: 'Yuri',
          age: '24',
          percentage: '70',
          image: 'https://lorempixel.com/400/200/nature/1/',
        },
        {
          firstName: 'Israel',
          age: '28',
          percentage: '69',
          image: 'https://lorempixel.com/400/200/nature/3/',
        },
        {
          firstName: 'Yossi',
          age: '54',
          percentage: '62',
          image: 'https://lorempixel.com/400/200/nature/4/',
        },
        {
          firstName: 'Iris',
          age: '51',
          percentage: '61',
          image: 'https://lorempixel.com/400/200/nature/5/',
        },
      ],
    };
  }

  addProductToCart = () => {
    Alert.alert('Success', 'The product has been added to your cart');
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={post => {
            const item = post.item;
            return (
              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image style={styles.cardImage} source={{uri: item.image}} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.details}>
                    {item.firstName}, {item.age}
                  </Text>
                  <Text style={styles.percentage}>{item.percentage}%</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7a9e9f',
  },
  list: {
    paddingHorizontal: 10,
  },
  listContainer: {
    alignItems: 'center',
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
    color: '#eef5db',
    alignSelf: 'center',
  },

  percentage: {
    fontSize: 24,
    flex: 1,
    color: '#eef5db',
    alignSelf: 'center',
  },
});

export default UserDetail;
