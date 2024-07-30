import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MyPageScreen from '../../screens/myPage/MyPageScreen';

const MyPageStack = createStackNavigator();

const MyPageStackNavigator = () => {
  return (
    <MyPageStack.Navigator screenOptions={{headerShown: false}}>
      <MyPageStack.Screen name="MyPage" component={MyPageScreen} />
    </MyPageStack.Navigator>
  );
};

export default MyPageStackNavigator;
