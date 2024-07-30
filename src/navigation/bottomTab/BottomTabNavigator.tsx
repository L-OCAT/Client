import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStackNavigator from './HomeStackNavigator';
import MapStackNavigator from './MapStackNavigator';
import MyPageStackNavigator from './MyPageStackNavigator';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeTab">
      <BottomTab.Screen name="HomeTab" component={HomeStackNavigator} />
      <BottomTab.Screen name="MapTab" component={MapStackNavigator} />
      <BottomTab.Screen name="MyPageTab" component={MyPageStackNavigator} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
