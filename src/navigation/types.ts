import {NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Email: undefined;
  Profile: undefined;
};

export type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;

export type MainStackParamList = {
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
  LostItemStack: NavigatorScreenParams<LostItemStackParamList>;
  FoundItemStack: NavigatorScreenParams<FoundItemStackParamList>;
};

export type MainStackNavigationProp = StackNavigationProp<MainStackParamList>;

export type BottomTabParamList = {
  HomeTab: undefined;
  MapTab: undefined;
  MyPageTab: NavigatorScreenParams<MyPageStackParamList>;
};

export type MyPageStackParamList = {
  MyPage: undefined;
  MatchingList: undefined;
};

export type LostItemStackParamList = {
  LostItemRegistration: undefined;
  LostItemCategory: undefined;
  LostItemColors: undefined;
};

export type FoundItemStackParamList = {
  FoundItemRegistration: undefined;
};
