import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LostItemCategoryScreen from '../../screens/lostItem/LostItemCategoryScreen';
import LostItemColorsScreen from '../../screens/lostItem/LostItemColorsScreen';
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
      <LostItemStack.Screen
        name="LostItemCategory"
        component={LostItemCategoryScreen}
      />
      <LostItemStack.Screen
        name="LostItemColors"
        component={LostItemColorsScreen}
      />
    </LostItemStack.Navigator>
  );
};

export default LostItemStackNavigator;
