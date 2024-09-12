import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';
import CustomModal from './components/public/Modal';
import {navigationRef} from './lib/utils/navigation-helper';
import RootStackNavigator from './navigation/RootStackNavigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
        <RecoilRoot>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <RootStackNavigator />
              <CustomModal />
            </NavigationContainer>
          </SafeAreaProvider>
        </RecoilRoot>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
