import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LostItemCategoryScreen from '../../screens/LostItem/LostItemCategoryScreen';
import LostItemRegistrationScreen from '../../screens/LostItem/LostItemRegistrationScreen';
import {LostItemStackParamList} from '../types';

const LostItemStack = createStackNavigator<LostItemStackParamList>();

const LostItemStackNavigator = () => {
  return (
    <LostItemStack.Navigator screenOptions={{headerShown: false}}>
      <LostItemStack.Screen
        name="LostItemRegistration"
        component={LostItemRegistrationScreen}
      />
      <LostItemStack.Screen
        name="LostItemCategory"
        component={LostItemCategoryScreen}
      />
    </LostItemStack.Navigator>
  );
};

export default LostItemStackNavigator;
