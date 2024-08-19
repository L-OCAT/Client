import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import CategorySelector from '../../components/lostItem/CategorySelector';
import ColorSelector from '../../components/lostItem/ColorSelector';
import ImagePicker from '../../components/lostItem/ImagePicker';
import {BackBtnGnbHeader} from '../../components/public/GnbHeader';
import {useScreenLayout} from '../../hooks/useScreenLayout';
import {COLORS, FONTFAMILY} from '../../lib/styles/theme';
import {typography} from '../../lib/styles/typography';
import {ms} from '../../lib/utils/dimensions';
import {MainStackNavigationProp} from '../../navigation/types';
import {
  lostItemCategoryAtom,
  lostItemDescriptionAtom,
  lostItemNameAtom,
} from '../../stores/lostItem';

const LostItemRegistrationScreen = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const screenLayout = useScreenLayout();
  const [itemName, setItemName] = useRecoilState(lostItemNameAtom);
  const [description, setDescription] = useRecoilState(lostItemDescriptionAtom);
  const category = useRecoilValue(lostItemCategoryAtom);

  const handleCategoryPress = () => {
    navigation.navigate('LostItemStack', {screen: 'LostItemCategory'});
  };

  const handleColorPress = () => {
    navigation.navigate('LostItemStack', {screen: 'LostItemColors'});
  };

  const handleNavigateToMap = () => {};

  const isNextButtonEnabled = category.main !== null && category.sub !== null;

  return (
    <View style={[screenLayout, styles.container]}>
      <BackBtnGnbHeader title="분실물 등록" />
      <View style={styles.contentsWrapper}>
        <ImagePicker />
        <Text style={[typography.body_02_B, styles.label]}>물건명</Text>
        <TextInput
          style={styles.input}
          value={itemName}
          onChangeText={setItemName}
          placeholder="물건 이름을 입력해주세요."
          placeholderTextColor={COLORS.gray.Gray03}
        />
        <CategorySelector onPress={handleCategoryPress} />
        <ColorSelector onPress={handleColorPress} />

        <Text style={[typography.body_02_B, styles.label]}>상세설명</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="잃어버린 물건의 특징을 상세하게 작성해주세요."
          placeholderTextColor={COLORS.gray.Gray03}
          multiline
        />
      </View>
      <Pressable
        onPress={handleNavigateToMap}
        style={[
          styles.nextButton,
          !isNextButtonEnabled && styles.disabledButton,
        ]}>
        <Text style={styles.nextButtonText}>다음</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    gap: ms(12),
  },
  contentsWrapper: {
    paddingHorizontal: ms(16),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray.Gray02,
    borderRadius: 8,
    padding: ms(12),
    fontFamily: FONTFAMILY.pretendard_regular,
    fontSize: 14,
    color: COLORS.black,
  },
  label: {
    color: COLORS.gray.Gray05,
  },
  descriptionInput: {
    height: ms(150),
    textAlignVertical: 'top',
  },
  nextButton: {
    backgroundColor: COLORS.orange.Orange01,
    padding: ms(16),
    borderRadius: 8,
    alignItems: 'center',
    margin: ms(16),
  },
  disabledButton: {
    backgroundColor: COLORS.gray.Gray03,
  },
  nextButtonText: {
    color: COLORS.white,
    fontFamily: FONTFAMILY.pretendard_bold,
    fontSize: 16,
  },
});

export default LostItemRegistrationScreen;
