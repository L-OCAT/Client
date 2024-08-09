import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../lib/styles/theme';
import {getBottomTabOptions} from '../../lib/utils/bottom-tab-helper';
import HomeScreen from '../../screens/Home/HomeScreen';
import {BottomTabParamList} from '../types';
import MapStackNavigator from './MapStackNavigator';
import MyPageStackNavigator from './MyPageStackNavigator';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const tabBarStyles: ViewStyle = {
    ...styles.TabBarStyle,
    height: 48 + insets.bottom,
    paddingBottom: insets.bottom,
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: tabBarStyles,
      }}
      initialRouteName="HomeTab">
      <BottomTab.Screen
        options={({route}) => getBottomTabOptions(route.name)}
        name="HomeTab"
        component={HomeScreen}
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
    position: 'absolute',
    borderTopWidth: 1,
    borderTopColor: COLORS.shadow,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
});
