import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AuthStackNavigator from './authStack/AuthStackNavigator';
import MainStackNavigator from './mainStack/MainStackNavigator';
import {RootStackParamList} from './types';

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="AuthStack">
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
      <RootStack.Screen name="MainStack" component={MainStackNavigator} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
