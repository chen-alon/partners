import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Button} from 'react-native-elements';
import {ListOfQandA} from './ListOfQandA';
import firebase from 'firebase';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListOfQandA,
      currentQ: 0,
    };
  }

  getAnswersCount() {
    let numOfAnswer = 0;
    for (let i = 0; i < this.state.ListOfQandA.length; i++) {
      if (this.state.ListOfQandA[i].a) {
        numOfAnswer++;
      }
    }
    if (this.state.ListOfQandA) return numOfAnswer;
  }

  getNext({currentQ, ListOfQandA}) {
    this.setState({textButton: "let's start"});
    let next = (currentQ + 1) % ListOfQandA.length;
    for (let i = 0; i < ListOfQandA.length; i++) {
      if (!ListOfQandA[next].a) return next;
      next = (next + 1) % ListOfQandA.length;
    }
  }

  renderQ(i, {q, aOptions}) {
    return (
      <View>
        <Text style={styles.question}>{q}</Text>
        <RadioButton.Group
          onValueChange={value => {
            this.setState(prev => {
              const ListOfQandA = [...prev.ListOfQandA];
              ListOfQandA[i] = {...prev.ListOfQandA[i], a: value};
              return {ListOfQandA};
            });
          }}
          value={this.state.ListOfQandA[i].a}>
          {aOptions.map(option => (
            <View
              style={{flexDirection: 'row', marginBottom: 12}}
              key={q + option}>
              <RadioButton
                value={option}
                uncheckedColor="#4f6367"
                color="#ef5f55"
              />
              <Text style={styles.textAnswers}>{option}</Text>
            </View>
          ))}
        </RadioButton.Group>
      </View>
    );
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.note}>Answered:</Text>
        <Text style={styles.counter}>{this.getAnswersCount()} / 15</Text>
        <View style={styles.RadioButtonStyle}>
          {this.renderQ(
            this.state.currentQ,
            this.state.ListOfQandA[this.state.currentQ],
          )}
        </View>
        <Button
          titleStyle={styles.buttonAnswer}
          title="Next Question"
          type="clear"
          color="#ef5f55"
          onPress={() => {
            if (this.getAnswersCount() === 15) {
              navigate('Navigation');
            }
            this.setState(prev => ({
              currentQ: this.getNext(prev),
            }));
          }}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#EEF5D8',
    justifyContent: 'center',
    borderWidth: 25,
    borderColor: '#bbd8d8',
    position: 'relative',
    alignItems: 'center',
  },

  RadioButtonStyle: {
    fontSize: 30,
    marginBottom: 60,
    marginTop: 40,
  },

  question: {
    fontSize: 20,
    marginBottom: 30,
    color: '#4f6367',
    // fontWeight: 'bold',
  },

  textAnswers: {
    color: '#7a9e9f',
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 10,
    fontWeight: 'bold',
  },

  note: {
    fontSize: 22,
    color: '#ef5f55',
    // paddingBottom: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  counter: {
    fontSize: 30,
    color: '#4f6367',
    paddingBottom: 50,
    fontWeight: 'bold',
    // paddingTop: 10,
    alignSelf: 'center',
  },

  buttonAnswer: {
    flexDirection: 'row',
    color: '#ef5f55',
    fontSize: 23,
    fontWeight: 'bold',
    //backgroundColor: '#eef5d8',
  },
});

export default Questions;
