import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {listOfQandA} from './listOfQandA';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfQandA,
      currentQ: 0,
    };
  }
  getAnswersCount() {
    let numOfAnswer = 0;
    for (let i = 0; i < this.state.listOfQandA.length; i++)
      if (this.state.listOfQandA[i].a) numOfAnswer++;
    return numOfAnswer;
  }
  getNext({currentQ, listOfQandA}) {
    let next = (currentQ + 1) % listOfQandA.length;
    for (let i = 0; i < listOfQandA.length; i++) {
      if (!listOfQandA[next].a) return next;
      next = (next + 1) % listOfQandA.length;
    }
  }

  renderQ(i, {q, aOptions}) {
    return (
      <View>
        <Text>{q}</Text>
        <RadioButton.Group
          onValueChange={value => {
            console.log('bla', value);
            this.setState(prev => {
              const listOfQandA = [...prev.listOfQandA];
              listOfQandA[i] = {...prev.listOfQandA[i], a: value};
              return {listOfQandA};
            });
          }}
          value={this.state.listOfQandA[i].a}>
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
      <View>
        <Text>
          {this.getAnswersCount()} / {listOfQandA.length}
        </Text>
        {this.renderQ(
          this.state.currentQ,
          this.state.listOfQandA[this.state.currentQ],
        )}
        <Button
          title="Next"
          onPress={() => {
            this.setState(prev => ({
              currentQ: this.getNext(prev),
            }));
          }}></Button>
      </View>

      //   <Header>this.numOfQuestionsAnswered()</Header>
      //this.listOfQuestions()
    );
  }
}

export default Questions;
