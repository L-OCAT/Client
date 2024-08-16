import React from 'react';
import {Text, View} from 'react-native';
import {BackBtnGnbHeader} from '../../components/public/GnbHeader';
import {useScreenLayout} from '../../hooks/useScreenLayout';

const MatchingListScreen = () => {
  const screenLayout = useScreenLayout();
  return (
    <View style={[screenLayout]}>
      <BackBtnGnbHeader title="매칭 리스트" />
      <Text>매칭 리스트</Text>
    </View>
  );
};

export default MatchingListScreen;
