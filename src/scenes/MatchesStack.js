import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Matches from './Matches';
import PartnerProfile from './PartnerProfile';

const Stack = createStackNavigator();

export const MatchesStack = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Matches"
        component={Matches}
        options={{headerTitle: 'Matches'}}
      />
      <Stack.Screen
        name="PartnerProfile"
        component={PartnerProfile}
        options={{headerTitle: 'Partner_Profile'}}
      />
    </Stack.Navigator>
  );
};
