import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import HomeIcon from '../../assets/svg/ico_home.svg';
import MapIcon from '../../assets/svg/ico_map.svg';
import MyPageIcon from '../../assets/svg/ico_my_page.svg';
import {BottomTabParamList} from '../../navigation/types';
import {COLORS, FONTFAMILY} from '../styles/theme';
import {h, w} from './dimensions';

const defaultOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: COLORS.orange.Orange01,
  tabBarInactiveTintColor: COLORS.gray.Gray04,
};

export const getBottomTabOptions = (
  routeName: keyof BottomTabParamList,
): BottomTabNavigationOptions => {
  const options: BottomTabNavigationOptions = defaultOptions;

  switch (routeName) {
    case 'HomeTab':
      options.tabBarLabel = '홈';
      options.tabBarLabelStyle = {
        fontSize: 13,
        fontFamily: FONTFAMILY.pretendard_bold,
      };
      options.tabBarIcon = props =>
        HomeIcon({
          ...props,
          fill: props.color,
          width: w(28),
          height: h(28),
        });
      break;
    case 'MapTab':
      options.tabBarLabel = '지도';
      options.tabBarIcon = props =>
        MapIcon({
          ...props,
          fill: props.color,
          width: w(28),
          height: h(28),
        });
      break;
    case 'MyPageTab':
      options.tabBarLabel = '마이페이지';
      options.tabBarIcon = props =>
        MyPageIcon({
          ...props,
          fill: props.color,
          width: w(28),
          height: h(28),
        });
  }

  return options;
};
