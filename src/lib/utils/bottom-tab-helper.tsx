import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import HomeIcon from '../../assets/svg/ico_home.svg';
import MapIcon from '../../assets/svg/ico_map.svg';
import MyPageIcon from '../../assets/svg/ico_my_page.svg';
import {BottomTabParamList} from '../../navigation/types';
import {COLORS, FONTFAMILY} from '../styles/theme';
import {ms} from './dimensions';

const defaultOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: COLORS.orange.Orange01,
  tabBarInactiveTintColor: COLORS.gray.Gray04,
};

type TabBarLabelProps = {
  focused: boolean;
  color: string;
  children: string;
};

const TabBarLabel = ({focused, color, children}: TabBarLabelProps) => (
  <Text
    style={{
      fontSize: 13,
      fontFamily: focused
        ? FONTFAMILY.pretendard_bold
        : FONTFAMILY.pretendard_regular,
      color,
    }}>
    {children}
  </Text>
);

export const getBottomTabOptions = (
  routeName: keyof BottomTabParamList,
): BottomTabNavigationOptions => {
  const options: BottomTabNavigationOptions = defaultOptions;

  switch (routeName) {
    case 'HomeTab':
      options.tabBarLabel = ({focused, color}) => (
        <TabBarLabel focused={focused} color={color}>
          홈
        </TabBarLabel>
      );
      options.tabBarIcon = props =>
        HomeIcon({
          ...props,
          fill: props.color,
          width: ms(28),
          height: ms(28),
        });
      break;
    case 'MapTab':
      options.tabBarLabel = ({focused, color}) => (
        <TabBarLabel focused={focused} color={color}>
          지도
        </TabBarLabel>
      );
      options.tabBarIcon = props =>
        MapIcon({
          ...props,
          fill: props.color,
          width: ms(28),
          height: ms(28),
        });
      break;
    case 'MyPageTab':
      options.tabBarLabel = ({focused, color}) => (
        <TabBarLabel focused={focused} color={color}>
          마이페이지
        </TabBarLabel>
      );
      options.tabBarIcon = props =>
        MyPageIcon({
          ...props,
          fill: props.color,
          width: ms(28),
          height: ms(28),
        });
  }

  return options;
};
