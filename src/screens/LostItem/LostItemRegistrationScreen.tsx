import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import CheckIcon from '../../assets/svg/icon_check.svg';
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
  const [isRewardChecked, setIsRewardChecked] = useState(false);

  const handleNavigateToMap = () => {};

  const isNextButtonEnabled =
    category.main === MainCategory.NONE ||
    (category.main !== null && category.sub !== null);

  const checkedStyle: ViewStyle | null = isRewardChecked
    ? {
        backgroundColor: COLORS.orange.Orange01,
        borderWidth: 0,
      }
    : null;

  const handleCheckbox = () => {
    setIsRewardChecked(prev => !prev);
  };

  return (
    <View style={[screenLayout, styles.container]}>
      <BackBtnGnbHeader title="분실물 등록" />
      <View style={styles.contentsWrapper}>
        <ImagePicker />
        <View style={styles.textInputWrapper}>
          <Text style={[typography.body_02_B, styles.label]}>물건명*</Text>
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
        <View style={styles.rewardWrapper}>
          <View style={styles.checkBoxWrapper}>
            <Pressable
              onPress={handleCheckbox}
              style={[styles.checkBox, checkedStyle]}>
              {isRewardChecked && <CheckIcon />}
            </Pressable>
          </View>
          <Text style={[typography.body_02, styles.rewardText]}>
            보상금 지급 의사
          </Text>
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
  rewardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(12),
    gap: ms(4),
  },
  checkBoxWrapper: {
    width: ms(24),
    height: ms(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    width: ms(18),
    height: ms(18),
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.gray.Gray02,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: COLORS.orange.Orange01,
    borderWidth: 0,
  },
  rewardText: {
    color: COLORS.gray.Gray04,
  },
});

export default LostItemRegistrationScreen;
