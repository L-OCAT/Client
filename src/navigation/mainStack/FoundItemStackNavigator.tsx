import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import FoundItemRegistrationScreen from '../../screens/FoundItem/FoundItemRegistrationScreen';
import {FoundItemStackParamList} from '../types';

const FoundItemStack = createStackNavigator<FoundItemStackParamList>();

const FoundItemStackNavigator = () => {
  return (
    <FoundItemStack.Navigator screenOptions={{headerShown: false}}>
      <FoundItemStack.Screen
        name="FoundItemRegistration"
        component={FoundItemRegistrationScreen}
      />
    </FoundItemStack.Navigator>
  );
};

export default FoundItemStackNavigator;
