import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {BackBtnGnbHeader} from '../../components/public/GnbHeader';

const MatchingListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BackBtnGnbHeader title="매칭 리스트" />
      <Text>매칭 리스트</Text>
    </SafeAreaView>
  );
};

export default MatchingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
