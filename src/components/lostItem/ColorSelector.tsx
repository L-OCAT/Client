import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import RightIcon from '../../assets/svg/icon_right.svg';
import {COLORS} from '../../lib/styles/theme';
import {typography} from '../../lib/styles/typography';
import {ms} from '../../lib/utils/dimensions';
import {MainStackNavigationProp} from '../../navigation/types';
import {lostItemColorsAtom} from '../../stores/lostItem';

const ColorSelector = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const colors = useRecoilValue(lostItemColorsAtom);

  const getColorText = () => {
    if (colors.length === 0) return null;
    return colors.join(', ');
  };

  const handlePress = () => {
    navigation.navigate('LostItemStack', {screen: 'LostItemColors'});
  };

  const colorText = getColorText();

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.textWrapper}>
        <Text style={[typography.body_02_SB, styles.label]}>색상*</Text>
        {colorText && (
          <Text style={[typography.body_02_SB, styles.value]}>{colorText}</Text>
        )}
      </View>
      {!colorText && <RightIcon width={ms(18)} height={ms(18)} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ms(60),
  },
  textWrapper: {
    flexDirection: 'row',
    width: ms(343),
    justifyContent: 'space-between',
  },
  label: {
    color: COLORS.gray.Gray06,
  },
  value: {
    color: COLORS.gray.Gray04,
  },
});

export default ColorSelector;
