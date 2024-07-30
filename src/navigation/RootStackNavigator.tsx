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
      {/* 우선 initialRouteName에 각자 네비게이터 넣고 작업하면 될것같고 로그인 기능 구현되면 로직에 따라 수정해주세요 :) */}
      {/* 스플래시 스크린 활용 여부 논의 & 처음 앱 진입 시 로그인 여부에 따라 보여지는 첫 화면을 어떻게 제어할지? */}
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
      <RootStack.Screen name="MainStack" component={MainStackNavigator} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
