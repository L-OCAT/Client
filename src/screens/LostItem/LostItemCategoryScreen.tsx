import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {PrimaryLargeBtn} from '../../components/public/Buttons';
import {CloseBtnGnbHeader} from '../../components/public/GnbHeader';
import {useScreenLayout} from '../../hooks/useScreenLayout';
import {COLORS} from '../../lib/styles/theme';
import {typography} from '../../lib/styles/typography';
import {ms, topWithSafeArea} from '../../lib/utils/dimensions';
import {
  lostItemCategoryAtom,
  MainCategory,
  SUB_CATEGORIES,
  SubCategory,
} from '../../stores/lostItem';

const LostItemCategoryScreen = () => {
  const navigation = useNavigation();
  const screenLayout = useScreenLayout();
  const [category, setCategory] = useRecoilState(lostItemCategoryAtom);
  const [selectedMain, setSelectedMain] = useState<MainCategory | null>(
    category.main,
  );
  const [selectedSub, setSelectedSub] = useState<SubCategory | null>(
    category.sub,
  );

  const mainCategories = useMemo(() => Object.values(MainCategory), []);

  const subCategories = useMemo(() => {
    return selectedMain && selectedMain in SUB_CATEGORIES
      ? SUB_CATEGORIES[selectedMain as keyof typeof SUB_CATEGORIES]
      : [];
  }, [selectedMain]);

  const getTextStyle = (item: MainCategory | SubCategory) => {
    return selectedMain === item || selectedSub === item
      ? [typography.body_02_B, styles.selectedText]
      : typography.body_02;
  };

  const renderMainCategory = ({item}: {item: MainCategory}) => (
    <Pressable
      style={[
        styles.mainCategoryItem,
        selectedMain === item && styles.selectedMainItem,
      ]}
      onPress={() => {
        setSelectedMain(item);
        if (selectedMain !== item) setSelectedSub(null);
      }}>
      <Text style={[styles.mainCategoryText, getTextStyle(item)]}>{item}</Text>
    </Pressable>
  );

  const renderSubCategory = ({item}: {item: SubCategory}) => (
    <View style={styles.subCategoryItemContainer}>
      <Pressable
        style={styles.subCategoryItem}
        onPress={() => setSelectedSub(item)}>
        <Text style={[styles.subCategoryText, getTextStyle(item)]}>{item}</Text>
      </Pressable>
      {selectedSub === item && <View style={styles.selectedBorder} />}
    </View>
  );

  const isComplete =
    (selectedMain && selectedSub) || selectedMain === MainCategory.NONE;

  const handleComplete = () => {
    if (isComplete) {
      setCategory({main: selectedMain, sub: selectedSub});
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (!category.main) {
      const defaultMainCategory = Object.values(MainCategory)[0];
      setSelectedMain(defaultMainCategory);
    }
  }, [category]);

  return (
    <View style={[screenLayout, styles.container]}>
      <CloseBtnGnbHeader title="카테고리" />
      <Text style={[typography.subTitle_02, styles.title]}>카테고리 선택</Text>
      <View style={styles.categoryContainer}>
        <FlatList
          data={mainCategories}
          renderItem={renderMainCategory}
          keyExtractor={item => item}
          style={styles.mainCategoryList}
        />
        {selectedMain && (
          <FlatList
            data={subCategories}
            renderItem={renderSubCategory}
            keyExtractor={item => item}
            style={styles.subCategoryList}
            numColumns={2}
            contentContainerStyle={styles.subListContainer}
            columnWrapperStyle={styles.subColumnWrapper}
          />
        )}
      </View>
      <View style={styles.btnBox}>
        <PrimaryLargeBtn
          text="선택완료"
          onPress={handleComplete}
          isDisabled={!isComplete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  title: {
    position: 'absolute',
    top: topWithSafeArea(200),
    left: ms(17),
    color: COLORS.black,
  },
  categoryContainer: {
    position: 'absolute',
    top: topWithSafeArea(246),
    bottom: 0,
    flexDirection: 'row',
  },
  mainCategoryList: {
    backgroundColor: COLORS.gray.Gray01,
    marginRight: ms(16),
  },
  mainCategoryItem: {
    width: ms(125),
    height: ms(60),
    paddingHorizontal: ms(16),
    paddingVertical: ms(8),
    justifyContent: 'center',
  },
  selectedMainItem: {
    backgroundColor: COLORS.white,
  },
  subCategoryList: {
    width: ms(220),
    paddingVertical: ms(12),
  },
  subListContainer: {
    alignItems: 'flex-start',
    gap: ms(12),
  },
  subColumnWrapper: {
    gap: ms(8),
  },
  subCategoryItemContainer: {
    width: ms(102),
    height: ms(48),
  },
  subCategoryItem: {
    width: '100%',
    height: '100%',
    paddingHorizontal: ms(12),
    paddingVertical: ms(10),
    justifyContent: 'center',
  },
  selectedBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.orange.Orange01,
  },
  mainCategoryText: {
    color: COLORS.gray.Gray04,
  },
  subCategoryText: {
    color: COLORS.gray.Gray05,
  },
  selectedText: {
    color: COLORS.gray.Gray07,
  },
  btnBox: {
    position: 'absolute',
    top: topWithSafeArea(746),
  },
});

export default LostItemCategoryScreen;
