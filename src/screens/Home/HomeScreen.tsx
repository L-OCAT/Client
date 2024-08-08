import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
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
    <View style={styles.wrapper}>
      <View style={styles.navigationBtnWrapper}>
        <Pressable
          style={styles.navigationBtn}
          onPress={handleNavigateToLostItem}>
          <Text>분실물 등록</Text>
        </Pressable>
        <Pressable
          style={styles.navigationBtn}
          onPress={handleNavigateToFoundItem}>
          <Text>습득물 등록</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.navigationBtn}
        onPress={handleNavigateToMatchingList}>
        <Text>매칭 리스트</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  navigationBtnWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  navigationBtn: {
    width: 160,
    height: 160,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
