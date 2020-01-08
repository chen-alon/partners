import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = ({onPress, children}) => {
  const {buttonStyle} = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text
        style={{
          fontFamily: 'AmaticSC-Bold',
          alignSelf: 'center',
          color: '#fff',
          fontSize: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    borderRadius: 10,
    width: '30%',
    alignSelf: 'center',
    color: '#eef5d8',
    fontWeight: 'bold',
    backgroundColor: '#fe5f55',
    marginBottom: 15,
  },
};

export default Button;
