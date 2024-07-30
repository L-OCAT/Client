import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BottomTabNavigator from '../bottomTab/BottomTabNavigator';
import {MainStackParamList} from '../types';

const MainStack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="BottomTab" component={BottomTabNavigator} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
