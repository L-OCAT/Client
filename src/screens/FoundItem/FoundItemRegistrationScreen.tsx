import React from 'react';
import {Text, View} from 'react-native';
import {BackBtnGnbHeader} from '../../components/public/GnbHeader';
import {useScreenLayout} from '../../hooks/useScreenLayout';

const FoundItemRegistrationScreen = () => {
  const screenLayout = useScreenLayout();

  return (
    <View style={[screenLayout]}>
      <BackBtnGnbHeader title="습득물 등록" />
      <Text>습득물</Text>
    </View>
  );
};

export default FoundItemRegistrationScreen;
