import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BottomTabNavigator from '../bottomTab/BottomTabNavigator';
import {MainStackParamList} from '../types';
import FoundItemStackNavigator from './FoundItemStackNavigator';
import LostItemStackNavigator from './LostItemStackNavigator';

const MainStack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="BottomTab" component={BottomTabNavigator} />
      <MainStack.Screen
        name="LostItemStack"
        component={LostItemStackNavigator}
      />
      <MainStack.Screen
        name="FoundItemStack"
        component={FoundItemStackNavigator}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
