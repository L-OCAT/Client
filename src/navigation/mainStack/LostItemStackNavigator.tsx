import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LostItemRegistrationScreen from '../../screens/lostItem/LostItemRegistrationScreen';
import {LostItemStackParamList} from '../types';

const LostItemStack = createStackNavigator<LostItemStackParamList>();

const LostItemStackNavigator = () => {
  return (
    <LostItemStack.Navigator screenOptions={{headerShown: false}}>
      <LostItemStack.Screen
        name="LostItemRegistration"
        component={LostItemRegistrationScreen}
      />
    </LostItemStack.Navigator>
  );
};

export default LostItemStackNavigator;
