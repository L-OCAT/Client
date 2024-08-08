import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MatchingListScreen from '../../screens/myPage/MatchingListScreen';
import MyPageScreen from '../../screens/myPage/MyPageScreen';
import {MyPageStackParamList} from '../types';

const MyPageStack = createStackNavigator<MyPageStackParamList>();

const MyPageStackNavigator = () => {
  return (
    <MyPageStack.Navigator screenOptions={{headerShown: false}}>
      <MyPageStack.Screen name="MyPage" component={MyPageScreen} />
      <MyPageStack.Screen name="MatchingList" component={MatchingListScreen} />
    </MyPageStack.Navigator>
  );
};

export default MyPageStackNavigator;
