import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {
  PrimaryLargeBtn,
  TertiaryMediumBtn,
} from '../../components/public/Buttons';
import {
  smallTextStyles,
  textInputStyles,
} from '../../lib/styles/textInputStyles';
import {COLORS} from '../../lib/styles/theme';

//svg
import ProfileImg from '../../assets/svg/defaultProfile.svg';
import {BackBtnGnbHeader} from '../../components/public/GnbHeader';
import {useScreenLayout} from '../../hooks/useScreenLayout';
import {ms} from '../../lib/utils/dimensions';
import { typography } from '../../lib/styles/typography';

const ProfileScreen = () => {
  const screenLayout = useScreenLayout();
  const [isValid, setIsValid] = useState(false);
  const [nickname, setNickname] = useState('');

  const checkNicknameDuplicate = () => {
    console.log('isDuplicate', nickname);
  };

  const validateNickname = (value: string) => {
    // iOS 시뮬레이터 한글 완성이 안되는 이슈때문에 개발중엔 임시로 자음+모음도 허용
    const nicknameRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ]{2,7}$/;
    const isValid = nicknameRegex.test(value);
    setIsValid(isValid);
  };

  useEffect(() => {
    validateNickname(nickname);
  }, [nickname]);

  const handleNextPage = () => {
    console.log('next');
  };

  return (
    <View style={[styles.container, screenLayout]}>
      <View>
        <BackBtnGnbHeader title="프로필 설정" />
        <Text style={[typography.subTitle_01, styles.titleText]}>프로필과 닉네임을 설정해주세요</Text>
        <View style={styles.profileImg}>
          <ProfileImg />
        </View>
        <View style={styles.textInput}>
          <TextInput
            style={{...textInputStyles.default, flex: 1}}
            autoCapitalize="none"
            maxLength={7}
            placeholder="2글자 이상 8글자 미만"
            placeholderTextColor="#c1c1c1"
            value={nickname}
            onChangeText={e => setNickname(e)}
            onSubmitEditing={checkNicknameDuplicate}
          />
          <TertiaryMediumBtn
            text={'중복확인'}
            onPress={checkNicknameDuplicate}
            isDisabled={!nickname}
          />
        </View>
        <Text style={smallTextStyles.default}>
          닉네임은 추후 수정이 가능해요
        </Text>
      </View>
      <PrimaryLargeBtn
        text={'다음'}
        onPress={handleNextPage}
        isDisabled={!isValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  titleText: {
    color: COLORS.gray.Gray07,
    marginLeft: ms(20),
    marginTop: ms(16)
  },
  profileImg: {
    alignItems: 'center',
    marginVertical: ms(30),
  },
  textInput: {
    gap: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
  },
});

export default ProfileScreen;
