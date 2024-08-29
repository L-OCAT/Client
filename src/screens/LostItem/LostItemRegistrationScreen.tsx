import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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
import {bottomWithSafeArea, ms} from '../../lib/utils/dimensions';
import {
  hasSpecialCategoryOrColorSelector,
  isRequiredFilledSelector,
  lostItemDescriptionAtom,
  lostItemImagesAtom,
  lostItemIsRewardOfferedAtom,
  lostItemMainImageAtom,
  lostItemNameAtom,
  partialLostItemSelector,
} from '../../stores/lostItem';

const BTN_HEIGHT = 56;
const DETAIL_TEXTINPUT_HEIGHT = 140;

const LostItemRegistrationScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [images, setImages] = useRecoilState(lostItemImagesAtom);
  const [mainImage, setMainImage] = useRecoilState(lostItemMainImageAtom);

  const [lostItemName, setLostItemName] = useRecoilState(lostItemNameAtom);
  const [description, setDescription] = useRecoilState(lostItemDescriptionAtom);
  const [btnBottom, setBtnBottom] = useState(10);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const btnBottomAnimated = useSharedValue(10);
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

  const updateBtnBottom = useCallback((value: number) => {
    setBtnBottom(value);
  }, []);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        const newBtnBottom = e.endCoordinates.height - insets.bottom + 10;
        runOnJS(updateBtnBottom)(newBtnBottom);
        btnBottomAnimated.value = withTiming(newBtnBottom, {duration: 250});
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardWillHideListener = Keyboard.addListener(
      isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        runOnJS(updateBtnBottom)(10);
        btnBottomAnimated.value = withTiming(10, {duration: 250});
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [insets.bottom, updateBtnBottom]);

  const animatedBtnStyle = useAnimatedStyle(() => {
    return {
      transform: isIOS
        ? [{translateY: -btnBottomAnimated.value + 10}]
        : undefined,
    };
  });
  const extraScrollHeight = isIOS
    ? btnBottom - keyboardHeight + DETAIL_TEXTINPUT_HEIGHT
    : BTN_HEIGHT;
  return (
    <SafeAreaView style={styles.container}>
      <BackBtnGnbHeader
        title="분실물 등록"
        onPress={handleGoBackWithResetState}
      />
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        extraScrollHeight={extraScrollHeight}>
        <View style={styles.contentsWrapper}>
          <ImagePicker
            onImagesChange={setImages}
            onMainImageChange={setMainImage}
            maxImages={10}
            initialImages={images}
          />
          <View style={styles.contentsWrapper}>
            <Text style={[typography.body_02_B, styles.label]}>물건명*</Text>
            <TextInput
              style={textInputStyles.default}
              value={lostItemName}
              onChangeText={setLostItemName}
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
                {isRewardOffered && <CheckIcon />}
              </Pressable>
            </View>
            <Text style={[typography.body_02, styles.rewardText]}>
              보상금 지급 의사
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Animated.View style={[styles.btnBox, animatedBtnStyle]}>
        <PrimaryLargeBtn
          text="다음"
          onPress={handleNavigateToMap}
          isDisabled={!isRequiredFilled}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    gap: ms(12),
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
    bottom: bottomWithSafeArea(10),
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
