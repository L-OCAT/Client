import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {BackBtnGnbHeader} from '../../components/public/GnbHeader';

const FoundItemRegistrationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BackBtnGnbHeader title="습득물 등록" />
      <Text>습득물</Text>
    </SafeAreaView>
  );
};

export default FoundItemRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
