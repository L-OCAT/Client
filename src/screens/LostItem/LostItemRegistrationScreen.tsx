import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import CategorySelector from '../../components/lostItem/CategorySelector';
import ColorSelector from '../../components/lostItem/ColorSelector';
import ImagePicker from '../../components/lostItem/ImagePicker';
import {PrimaryLargeBtn} from '../../components/public/Buttons';
import {BackBtnGnbHeader} from '../../components/public/GnbHeader';
import {useScreenLayout} from '../../hooks/useScreenLayout';
import {textInputStyles} from '../../lib/styles/textInputStyles';
import {COLORS} from '../../lib/styles/theme';
import {typography} from '../../lib/styles/typography';
import {ms, topWithSafeArea} from '../../lib/utils/dimensions';
import {
  lostItemCategoryAtom,
  lostItemDescriptionAtom,
  lostItemNameAtom,
  MainCategory,
} from '../../stores/lostItem';

const LostItemRegistrationScreen = () => {
  const screenLayout = useScreenLayout();
  const [itemName, setItemName] = useRecoilState(lostItemNameAtom);
  const [description, setDescription] = useRecoilState(lostItemDescriptionAtom);
  const category = useRecoilValue(lostItemCategoryAtom);

  const handleNavigateToMap = () => {};

  const isNextButtonEnabled =
    category.main === MainCategory.NONE ||
    (category.main !== null && category.sub !== null);

  return (
    <View style={[screenLayout, styles.container]}>
      <BackBtnGnbHeader title="분실물 등록" />
      <View style={styles.contentsWrapper}>
        <ImagePicker />
        <View style={styles.textInputWrapper}>
          <Text style={[typography.body_02_B, styles.label]}>물건명</Text>
          <TextInput
            style={textInputStyles.default}
            value={itemName}
            onChangeText={setItemName}
            placeholder="물건 이름을 입력해주세요."
            placeholderTextColor={COLORS.gray.Gray03}
          />
        </View>
        <CategorySelector />
        <ColorSelector />
        <View style={styles.textInputWrapper}>
          <Text style={[typography.body_02_B, styles.label]}>상세설명</Text>
          <TextInput
            style={textInputStyles.detailDescription}
            value={description}
            onChangeText={setDescription}
            placeholder="잃어버린 물건의 특징을 상세하게 작성해주세요."
            placeholderTextColor={COLORS.gray.Gray03}
            multiline
          />
        </View>
      </View>

      <View style={styles.btnBox}>
        <PrimaryLargeBtn
          text="다음"
          onPress={handleNavigateToMap}
          isDisabled={!isNextButtonEnabled}
        />
      </View>
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
  textInputWrapper: {
    paddingVertical: ms(12),
    gap: ms(8),
  },
  label: {
    color: COLORS.gray.Gray05,
  },
  btnBox: {
    position: 'absolute',
    top: topWithSafeArea(746),
  },
});

export default LostItemRegistrationScreen;
