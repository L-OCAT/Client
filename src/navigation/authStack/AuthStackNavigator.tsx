import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../../screens/auth/LoginScreen';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Auth" component={LoginScreen} />
      {/* 프로필 설정 스크린 추가 */}
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
