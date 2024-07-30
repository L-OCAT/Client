import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MapScreen from '../../screens/map/MapScreen';

const MapStack = createStackNavigator();

const MapStackNavigator = () => {
  return (
    <MapStack.Navigator screenOptions={{headerShown: false}}>
      <MapStack.Screen name="Map" component={MapScreen} />
    </MapStack.Navigator>
  );
};

export default MapStackNavigator;
