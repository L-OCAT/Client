import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CloseIcon from '../../assets/svg/icon_close.svg';
import BackIcon from '../../assets/svg/icon_left.svg';
import {COLORS, FONTFAMILY} from '../../lib/styles/theme';

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
      <Text style={styles.headerTitle}>{title}</Text>
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
    height: 56,
    gap: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: FONTFAMILY.pretendard_bold,
    color: COLORS.black,
    textAlign: 'center',
  },
  BtnWrapper: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
