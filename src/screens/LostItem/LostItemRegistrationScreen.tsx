import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import CheckIcon from '../../assets/svg/icon_check.svg';
import CategorySelector from '../../components/lostItem/CategorySelector';
import ColorSelector from '../../components/lostItem/ColorSelector';
import ImagePicker from '../../components/lostItem/ImagePicker';
import {PrimaryLargeBtn} from '../../components/public/Buttons';
import {BackBtnGnbHeader} from '../../components/public/GnbHeader';
import {useResetOnBackNavigation} from '../../hooks/useResetStateOnBackNavigation';
import {textInputStyles} from '../../lib/styles/textInputStyles';
import {COLORS} from '../../lib/styles/theme';
import {typography} from '../../lib/styles/typography';
import {isIOS} from '../../lib/utils';
import {ms} from '../../lib/utils/dimensions';
import {
  hasSpecialCategoryOrColorSelector,
  isRequiredFilledSelector,
  lostItemDescriptionAtom,
  lostItemImageAtom,
  lostItemIsRewardOfferedAtom,
  lostItemNameAtom,
  partialLostItemSelector,
} from '../../stores/lostItem';

const LostItemRegistrationScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useRecoilState(lostItemImageAtom);
  const [lostItemName, setLostItemName] = useRecoilState(lostItemNameAtom);
  const [description, setDescription] = useRecoilState(lostItemDescriptionAtom);
  const [isRewardOffered, setIsRewardOffered] = useRecoilState(
    lostItemIsRewardOfferedAtom,
  );
  const isRequiredFilled = useRecoilValue(isRequiredFilledSelector);
  const hasSpecialCategoryOrColor = useRecoilValue(
    hasSpecialCategoryOrColorSelector,
  );
  const resetLostItem = useResetRecoilState(partialLostItemSelector);
  const handleGoBackWithResetState = useResetOnBackNavigation(resetLostItem);

  const handleNavigateToMap = () => {
    if (hasSpecialCategoryOrColor) {
      // 팝업 모달 기능 추가 예정
      console.log(
        '카테고리와 색상을 선택하지 않으면 매칭 리스트를 확인할 수 없어요. 이대로 등록할까요?',
      );
    } else {
      // 지도 스크린으로 이동
      // navigation.navigate('MapScreen');
      console.log('Navigate to Map Screen');
    }
  };
  const handleCheckbox = () => {
    setIsRewardOffered(prev => !prev);
  };

  const checkedStyle: ViewStyle | null = isRewardOffered
    ? {
        backgroundColor: COLORS.orange.Orange01,
        borderWidth: 0,
      }
    : null;

  //안드로이드는 기본 KeyboardAvoidingView만으로도 정상 작동
  const onFocusEffect = React.useCallback(() => {
    AvoidSoftInput.setAvoidOffset(-140);
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
    };
  }, []);

  isIOS && useFocusEffect(onFocusEffect);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flexBox}
        behavior={isIOS ? 'padding' : undefined}>
        <BackBtnGnbHeader
          title="분실물 등록"
          onPress={handleGoBackWithResetState}
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.contentsWrapper}>
            <ImagePicker onImageChange={setImage} />
            <Text style={[typography.body_02_B, styles.label]}>물건명*</Text>
            <TextInput
              style={textInputStyles.default}
              value={lostItemName}
              onChangeText={setLostItemName}
              placeholder="물건 이름을 입력해주세요."
              placeholderTextColor={COLORS.gray.Gray03}
            />
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
                scrollEnabled={false}
              />
            </View>
            <View style={styles.rewardWrapper}>
              <View style={styles.checkBoxWrapper}>
                <Pressable
                  onPress={handleCheckbox}
                  style={[styles.checkBox, checkedStyle]}>
                  {isRewardOffered && <CheckIcon />}
                </Pressable>
              </View>
              <Text style={[typography.body_02, styles.rewardText]}>
                보상금 지급 의사
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.btnBox}>
          <PrimaryLargeBtn
            text="다음"
            onPress={handleNavigateToMap}
            isDisabled={!isRequiredFilled}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    gap: ms(12),
    flex: 1,
  },
  flexBox: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentsWrapper: {
    paddingHorizontal: ms(16),
    flex: 1,
  },
  textInputWrapper: {
    paddingVertical: ms(12),
    gap: ms(8),
  },
  label: {
    color: COLORS.gray.Gray05,
  },
  btnBox: {
    paddingVertical: 10,
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
  rewardText: {
    color: COLORS.gray.Gray04,
  },
});

export default LostItemRegistrationScreen;
