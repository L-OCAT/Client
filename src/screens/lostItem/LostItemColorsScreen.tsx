import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRecoilState } from 'recoil';
import { PrimaryLargeBtn } from '../../components/public/Buttons';
import { CloseBtnGnbHeader } from '../../components/public/GnbHeader';
import useModal from '../../hooks/useModal';
import { COLORS } from '../../lib/styles/theme';
import { typography } from '../../lib/styles/typography';
import { bottomWithSafeArea, ms } from '../../lib/utils/dimensions';
import { lostItemColorsAtom } from '../../stores/lostItem';
import { COLOR_VALUES, ColorOption } from '../../stores/lostItem/types';
import { LostItemColorsModalKeys, ScreenKeys } from '../../stores/modal/configs';

const LostItemColorsScreen = () => {
  const navigation = useNavigation();
  const {showModal, hideModal} = useModal();
  const [colors, setColors] = useRecoilState(lostItemColorsAtom);
  const [selectedColors, setSelectedColors] = useState<ColorOption[]>(colors);

  const colorList = useMemo(() => Object.values(ColorOption), []);

  const toggleColor = (color: ColorOption) => {
    setSelectedColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      } else if (color === ColorOption.OTHER) {
        if (prev.length > 0 && !prev.includes(ColorOption.OTHER)) {
          showModal({
            screen: ScreenKeys.LOST_ITEM_COLORS,
            modalKey: LostItemColorsModalKeys.OTHER_COLOR_SELECTED,
            customConfig: {
              onPrimaryButtonPress: hideModal,
            },
          });
        }
        return [color];
      } else if (prev.includes(ColorOption.OTHER)) {
        showModal({
          screen: ScreenKeys.LOST_ITEM_COLORS,
          modalKey: LostItemColorsModalKeys.OTHER_COLOR_SELECTED,
          customConfig: {
            onPrimaryButtonPress: hideModal,
          },
        });
        return prev;
      } else if (!prev.includes(ColorOption.OTHER) && prev.length < 2) {
        return [...prev, color];
      }
      return prev;
    });
  };

  const renderColorItem = ({item}: {item: ColorOption}) => (
    <View
      style={[
        styles.colorItemContainer,
        item === ColorOption.OTHER && styles.otherItemContainer,
      ]}>
      <Pressable
        style={styles.colorItem}
        onPress={() => toggleColor(item)}
        hitSlop={{top: 1, bottom: 1, left: 1, right: 1}}>
        {item !== ColorOption.OTHER && (
          <View
            style={[styles.colorCircle, {backgroundColor: COLOR_VALUES[item]!}]}
          />
        )}
        <Text style={[typography.body_02, styles.colorText]}>{item}</Text>
        {selectedColors.includes(item) && (
          <View style={styles.selectedBorder} />
        )}
      </Pressable>
    </View>
  );

  const isComplete = useMemo(
    () =>
      (selectedColors.length > 0 && selectedColors.length <= 2) ||
      selectedColors.includes(ColorOption.OTHER),
    [selectedColors],
  );

  const handleComplete = () => {
    if (isComplete) {
      setColors(selectedColors);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CloseBtnGnbHeader title="색상" />
      <Text style={[typography.subTitle_02, styles.title]}>
        최대 2가지 색상 선택이 가능해요
      </Text>
      <FlatList
        data={colorList}
        renderItem={renderColorItem}
        keyExtractor={item => item}
        numColumns={2}
        contentContainerStyle={styles.colorList}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={true}
        alwaysBounceVertical={false}
      />
      <View style={styles.btnBox}>
        <PrimaryLargeBtn
          text="선택완료"
          onPress={handleComplete}
          isDisabled={!isComplete}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  title: {
    marginVertical: ms(16),
    paddingHorizontal: ms(16),
    color: COLORS.black,
  },
  colorList: {
    paddingHorizontal: ms(16),
    paddingVertical: ms(12),
    gap: ms(12),
    paddingBottom: ms(80),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  colorItemContainer: {
    width: ms(168),
    height: ms(60),
    position: 'relative',
  },
  otherItemContainer: {
    width: ms(342),
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: ms(12),
    paddingVertical: ms(10),
    gap: ms(8),
    borderRadius: 8,
    backgroundColor: COLORS.gray.Gray01,
  },
  selectedBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: COLORS.orange.Orange01,
    borderRadius: 8,
    zIndex: 1,
  },
  colorCircle: {
    width: ms(18),
    height: ms(18),
    borderRadius: 100,
  },
  colorText: {
    color: COLORS.gray.Gray05,
  },
  btnBox: {
    position: 'absolute',
    bottom: bottomWithSafeArea(10),
  },
});

export default LostItemColorsScreen;
