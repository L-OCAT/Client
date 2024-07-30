import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../lib/styles/theme';
import {getBottomTabOptions} from '../../lib/utils/bottom-tab-helper';
import HomeStackNavigator from './HomeStackNavigator';
import MapStackNavigator from './MapStackNavigator';
import MyPageStackNavigator from './MyPageStackNavigator';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.TabBarStyle,
      }}
      initialRouteName="HomeTab">
      <BottomTab.Screen
        options={({route}) => getBottomTabOptions(route.name)}
        name="HomeTab"
        component={HomeStackNavigator}
      />
      <BottomTab.Screen
        options={({route}) => getBottomTabOptions(route.name)}
        name="MapTab"
        component={MapStackNavigator}
      />
      <BottomTab.Screen
        options={({route}) => getBottomTabOptions(route.name)}
        name="MyPageTab"
        component={MyPageStackNavigator}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  TabBarStyle: {
    height: 80,
    position: 'absolute',
    borderTopWidth: 1,
    borderTopColor: COLORS.shadow,
    borderRadius: 8,
  },
});
