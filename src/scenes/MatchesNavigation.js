import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Matches from './Matches';

const Stack = createStackNavigator();

export const MatchesNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Matches"
        component={Matches}
        options={{headerTitle: 'Matches'}}
      />
      {/* <Stack.Screen
                name="Page1"
                component={page1}
                options={{ headerTitle: 'Page1' }}
            />
            <Stack.Screen
                name="Page2"
                component={page2}
                options={{ headerTitle: 'Page2' }}
            /> */}
    </Stack.Navigator>
  );
};
