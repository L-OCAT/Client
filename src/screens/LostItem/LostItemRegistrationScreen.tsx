import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import CategorySelector from '../../components/lostItem/CategorySelector';
import ColorSelector from '../../components/lostItem/ColorSelector';
import DetailInput from '../../components/lostItem/DetailInput';
import ImagePicker from '../../components/lostItem/ImagePicker';
import {BackBtnGnbHeader} from '../../components/public/GnbHeader';
import {useScreenLayout} from '../../hooks/useScreenLayout';
import {textInputStyles} from '../../lib/styles/textInputStyles';
import {COLORS, FONTFAMILY} from '../../lib/styles/theme';

const LostItemRegistrationScreen = () => {
  const navigation = useNavigation();
  const screenLayout = useScreenLayout();

  const [images, setImages] = useState<string[]>([]);
  const [representativeImage, setRepresentativeImage] = useState<string | null>(
    null,
  );
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  const handleNavigateToMap = () => {};

  const isFormValid = itemName && category && colors.length > 0;

  return (
    <View style={[screenLayout, styles.container]}>
      <BackBtnGnbHeader title="분실물 등록" />
      <View style={styles.contentsWrapper}>
        <ImagePicker
          images={images}
          setImages={setImages}
          representativeImage={representativeImage}
          setRepresentativeImage={setRepresentativeImage}
        />
        <Text style={styles.label}>물건명</Text>
        <TextInput
          style={textInputStyles.default}
          value={itemName}
          onChangeText={setItemName}
          placeholder="물건 이름을 입력해주세요."
          placeholderTextColor={COLORS.gray.Gray03}
        />
        <CategorySelector category={category} setCategory={setCategory} />
        <ColorSelector colors={colors} setColors={setColors} />
        <DetailInput
          description={description}
          setDescription={setDescription}
        />
      </View>
      <Pressable
        style={[styles.nextButton, !isFormValid && styles.disabledButton]}
        onPress={handleNavigateToMap}
        disabled={!isFormValid}>
        <Text style={styles.nextButtonText}>다음</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    gap: 12,
  },
  contentsWrapper: {
    paddingHorizontal: 16,
    gap: 20,
  },
  label: {
    fontFamily: FONTFAMILY.pretendard_medium,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 8,
  },
  nextButton: {
    backgroundColor: COLORS.orange.Orange01,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
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
