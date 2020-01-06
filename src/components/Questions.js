import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Button} from 'react-native-elements';

import {ListOfQandA} from './ListOfQandA';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListOfQandA,
      currentQ: 0,
      textButton: 'Next',
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

  done() {
    // if (this.state.numOfAnswer === 4) {
    //     this.setState({textButton: "let's start"});
    // }
  }

  renderQ(i, {q, aOptions}) {
    return (
      <View>
        <Text style={styles.question}>{q}</Text>
        <RadioButton.Group
          //   style={styles.RadioButtonStyle}
          RadioButtonStyle={{
            //flexDirection: 'row',
            //justifyContent: 'flex-start',
            alignSelf: 'center',
            color: '#FE5F55',
            fontSize: 30,
            marginBottom: 20,
            marginTop: 40,
            backgroundColor: '#fff',
          }}
          onValueChange={value => {
            this.setState(prev => {
              const ListOfQandA = [...prev.ListOfQandA];
              ListOfQandA[i] = {...prev.ListOfQandA[i], a: value};
              return {ListOfQandA};
            });
          }}
          value={this.state.ListOfQandA[i].a}>
          {aOptions.map(option => (
            <View key={q + option}>
              <Text>{option}</Text>
              <RadioButton value={option} />
            </View>
          ))}
        </RadioButton.Group>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          You have to answer 20 questions in total
        </Text>
        <Text style={styles.text}>
          {this.getAnswersCount()} / {ListOfQandA.length}
        </Text>
        <View style={styles.RadioButtonStyle}>
          {this.renderQ(
            this.state.currentQ,
            this.state.ListOfQandA[this.state.currentQ],
          )}
        </View>
        <Button
          buttonStyle={styles.buttonAnswer}
          //   buttonStyle={{backgroundColor: 'eef5d8'}}
          title="Next"
          type="clear"
          onPress={() => {
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
  },

  RadioButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    color: '#FE5F55',
    fontSize: 30,
    marginBottom: 20,
    marginTop: 40,
  },

  question: {
    fontSize: 22,
    marginBottom: 30,
    color: '#4f6367',
  },

  nextQstyle: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#FE5F55',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    width: 200,
    color: '#FE5F55',
  },

  text: {
    fontSize: 26,
    color: '#4f6367',
    paddingBottom: 20,
    fontWeight: 'bold',
    // paddingTop: 10,
    alignSelf: 'center',
  },

  buttonAnswer: {
    paddingTop: 60,
    flexDirection: 'row',
    backgroundColor: '#eef5d8',
  },
});

export default Questions;
