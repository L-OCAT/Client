import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  BackHandler,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
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
  hasSpecialCategoryOrColorSelector,
  isRequiredFilledSelector,
  lostItemDescriptionAtom,
  lostItemImagesAtom,
  lostItemIsRewardOfferedAtom,
  lostItemMainImageAtom,
  lostItemNameAtom,
  partialLostItemSelector,
} from '../../stores/lostItem';

const LostItemRegistrationScreen = () => {
  const navigation = useNavigation();
  const screenLayout = useScreenLayout();
  const [images, setImages] = useRecoilState(lostItemImagesAtom);
  const [mainImage, setMainImage] = useRecoilState(lostItemMainImageAtom);

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
  const hasReset = useRef(false);

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

  const handleReset = useCallback(() => {
    if (!hasReset.current) {
      resetLostItem();
      hasReset.current = true;
    }
  }, [resetLostItem]);

  const handleGoBack = useCallback(() => {
    handleReset();
    navigation.dispatch(CommonActions.goBack());
  }, [handleReset, navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        handleGoBack();
        return true;
      },
    );

    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (!hasReset.current) {
        e.preventDefault();
        handleGoBack();
      }
    });

    return () => {
      backHandler.remove();
      unsubscribe();
    };
  }, [navigation, handleGoBack]);

  return (
    <View style={[screenLayout, styles.container]}>
      <BackBtnGnbHeader title="분실물 등록" onPress={handleGoBack} />
      <View style={styles.contentsWrapper}>
        <ImagePicker
          onImagesChange={setImages}
          onMainImageChange={setMainImage}
          maxImages={10}
          initialImages={images}
        />
        <View style={styles.textInputWrapper}>
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
      <View style={styles.btnBox}>
        <PrimaryLargeBtn
          text="다음"
          onPress={handleNavigateToMap}
          isDisabled={!isRequiredFilled}
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
  rewardText: {
    color: COLORS.gray.Gray04,
  },
});

export default LostItemRegistrationScreen;
