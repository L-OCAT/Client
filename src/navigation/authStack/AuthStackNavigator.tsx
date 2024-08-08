import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../../screens/auth/LoginScreen';
import ProfileScreen from '../../screens/auth/ProfileScreen';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {/* <AuthStack.Screen name="Auth" component={LoginScreen} /> */}
      <AuthStack.Screen name="Profile" component={ProfileScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
