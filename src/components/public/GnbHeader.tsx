import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CloseIcon from '../../assets/svg/icon_close.svg';
import BackIcon from '../../assets/svg/icon_left.svg';
import {COLORS} from '../../lib/styles/theme';
import {typography} from '../../lib/styles/typography';
import {ms} from '../../lib/utils/dimensions';

enum GnbHeaderType {
  BACK = 'back',
  CLOSE = 'close',
}

interface GnbHeaderProps {
  title: string;
  type: GnbHeaderType;
  onPress?: () => void;
}

const navigation = useNavigation();

const GnbHeader = ({
  title,
  type,
  onPress = () => navigation.goBack(),
}: GnbHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.BtnWrapper}>
        {type === GnbHeaderType.BACK && (
          <Pressable onPress={onPress}>
            <BackIcon />
          </Pressable>
        )}
      </View>
      <Text style={[typography.body_01_B, styles.headerTitle]}>{title}</Text>
      <View style={styles.BtnWrapper}>
        {type === GnbHeaderType.CLOSE && (
          <Pressable onPress={onPress}>
            <CloseIcon />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const createHeader =
  (type: GnbHeaderType) => (props: Omit<GnbHeaderProps, 'type'>) =>
    <GnbHeader {...props} type={type} />;

export const BackBtnGnbHeader = (props: Omit<GnbHeaderProps, 'type'>) =>
  createHeader(GnbHeaderType.BACK)(props);

export const CloseBtnGnbHeader = (props: Omit<GnbHeaderProps, 'type'>) =>
  createHeader(GnbHeaderType.CLOSE)(props);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: ms(56),
    gap: ms(12),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    color: COLORS.black,
    textAlign: 'center',
  },
  BtnWrapper: {
    height: ms(48),
    width: ms(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
