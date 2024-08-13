import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTFAMILY} from '../../lib/styles/theme';
import {typography} from '../../lib/styles/typography';

import FastImage from 'react-native-fast-image';
import RightIcon from '../../assets/svg/icon_right.svg';
import {useScreenLayout} from '../../hooks/useScreenLayout';
import {h, s, w} from '../../lib/utils/dimensions';
import {
  BottomTabParamList,
  MainStackNavigationProp,
} from '../../navigation/types';

type HomeScreenNavigationProp = CompositeNavigationProp<
  MainStackNavigationProp,
  BottomTabNavigationProp<BottomTabParamList>
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const screenLayout = useScreenLayout();

  const handleNavigateToLostItem = () => {
    navigation.navigate('LostItemStack', {screen: 'LostItemRegistration'});
  };

  const handleNavigateToFoundItem = () => {
    navigation.navigate('FoundItemStack', {screen: 'FoundItemRegistration'});
  };

  const handleNavigateToMatchingList = () => {
    navigation.navigate('MyPageTab', {screen: 'MatchingList'});
  };

  return (
    <View style={[styles.container]}>
      <Text style={[typography.subTitle_01, styles.titleText]}>
        00님의 소중한 물건,{'\n'}
        LOCAT에서 찾아요!
      </Text>
      <FastImage
        source={require('../../assets/images/character_border.png')}
        style={styles.characterImage}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.contentsWrapper}>
        <View style={styles.navigationBtnWrapper}>
          <View style={styles.registrationBtnWrapper}>
            <Pressable
              style={[styles.navigationBtn, styles.registrationBtn]}
              onPress={handleNavigateToLostItem}>
              <Text style={typography.subTitle_02}>
                잃어버린 물건{'\n'}등록하기
              </Text>
              <FastImage
                source={require('../../assets/images/lostItem.png')}
                style={styles.lostItemImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            </Pressable>
            <Pressable
              style={[styles.navigationBtn, styles.registrationBtn]}
              onPress={handleNavigateToFoundItem}>
              <Text style={typography.subTitle_02}>
                습득한 물건{'\n'}등록하기
              </Text>
              <FastImage
                source={require('../../assets/images/foundItem.png')}
                style={styles.foundItemImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            </Pressable>
          </View>
          <Pressable
            style={[styles.navigationBtn, styles.matchingListBtn]}
            onPress={handleNavigateToMatchingList}>
            <Text style={typography.subTitle_02}>등록한 물건 리스트</Text>
            <FastImage
              source={require('../../assets/images/matchingList.png')}
              style={styles.matchingListImage}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Pressable>
        </View>
        {/* 아래 부분은 추후 분실물 등록 여부에 따라 제어 */}
        <View style={styles.bottomContentsWrapper}>
          <View>
            <Text style={typography.subTitle_02}>최근 등록된 습득물</Text>
            <Text style={styles.subText}>
              내 위치 주변에 등록된 습득물을 확인해요
            </Text>
          </View>
          <Pressable style={[styles.navigationBtn, styles.bottomContentsBtn]}>
            <View style={styles.iconBox}>
              <RightIcon width={18} height={18} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: h(50),
    backgroundColor: COLORS.orange.Orange01,
  },
  titleText: {
    width: '100%',
    color: COLORS.white,
    marginTop: h(112),
    paddingHorizontal: w(16),
  },
  characterImage: {
    position: 'absolute',
    left: w(225),
    top: h(64),
    width: w(245),
    height: h(279),
  },
  contentsWrapper: {
    position: 'absolute',
    top: h(249),
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.defaultBG,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  navigationBtnWrapper: {
    paddingTop: h(20 + 12),
    paddingBottom: h(20),
    paddingHorizontal: w(16),
    gap: h(10),
  },
  registrationBtnWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navigationBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  registrationBtn: {
    width: w(166),
    height: h(180),
    padding: s(16),
    justifyContent: 'space-between',
  },
  lostItemImage: {
    width: w(77),
    height: h(92),
    alignSelf: 'flex-end',
  },
  foundItemImage: {
    width: w(87),
    height: h(88),
    alignSelf: 'flex-end',
  },
  matchingListBtn: {
    width: w(343),
    height: h(76),
    padding: s(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchingListImage: {
    width: w(40),
    height: h(40),
  },
  bottomContentsWrapper: {
    paddingVertical: h(20),
    paddingHorizontal: w(16),
    gap: h(16),
  },
  subText: {
    fontFamily: FONTFAMILY.pretendard_medium,
    fontSize: 16,
    lineHeight: 16 * 1.3,
    color: COLORS.gray.Gray04,
  },
  bottomContentsBtn: {
    justifyContent: 'center',
    height: h(100),
  },
  iconBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: w(295),
    width: w(48),
    height: h(48),
  },
});
