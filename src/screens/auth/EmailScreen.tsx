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
import {BackBtnGnbHeader} from '../../components/public/GnbHeader';
import {useScreenLayout} from '../../hooks/useScreenLayout';
import {ms} from '../../lib/utils/dimensions';
import {typography} from '../../lib/styles/typography';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavigationProp} from '../../navigation/types';

type AuthScreenNavigationProp = AuthStackNavigationProp;

const EmailScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const screenLayout = useScreenLayout();
  const [email, setEmail] = useState('');
  const [authNumber, setAuthNumber] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isAuthNumberValid, setIsAuthNumberValid] = useState(false);
  const [isCreateAuthNumber, setIsCreateAuthNumber] = useState(false)

  const initialTime = 179;
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(()=>{
    const timer = setInterval(() => {
        if (remainingTime > 0) {
            setRemainingTime((prevTime) => prevTime - 1);
        } else {
            clearInterval(timer);
        }
    }, 1000);

    return () => clearInterval(timer);
  },[remainingTime])

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes)}분 ${String(seconds)}초`;
  };

  const handleResendClick = () => {
    setRemainingTime(initialTime);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const isValid = emailRegex.test(value);
    setIsEmailValid(isValid);
    if(!isValid) {
      setIsCreateAuthNumber(false)
    }
  };

  useEffect(()=>{
    validateEmail(email)
  },[email])

  // 인증번호 확인
  const validateAuthNumber = () => {
    setIsAuthNumberValid(true)
  }

  // 인증번호 생성
  const createAuthNumber = () => {
    setIsCreateAuthNumber(true)
    handleResendClick()
  }
  
  const handleNavigateToProfileScreen = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={[styles.container, screenLayout]}>
      <View>
        <BackBtnGnbHeader title="이메일 인증" />
        <Text style={[typography.subTitle_01, styles.titleText]}>이메일을 입력해주세요</Text>
        <View style={styles.textInput}>
          <TextInput
            style={{...textInputStyles.default, flex: 1}}
            autoCapitalize="none"
            placeholder="이메일 입력"
            placeholderTextColor="#c1c1c1"
            value={email}
            onChangeText={e => setEmail(e)}
            onSubmitEditing={createAuthNumber}
          />
          <TertiaryMediumBtn
            text={isCreateAuthNumber ? '재전송' : '인증전송'}
            onPress={createAuthNumber}
            isDisabled={!isEmailValid}
          />
        </View>
        {isEmailValid && isCreateAuthNumber && 
        <View style={styles.textInput}>
          <TextInput
            style={{...textInputStyles.default, flex: 1}}
            autoCapitalize="none"
            placeholder="인증번호를 입력해주세요"
            placeholderTextColor="#c1c1c1"
            value={authNumber}
            onChangeText={e => setAuthNumber(e)}
            onSubmitEditing={validateAuthNumber}
          />
          <TertiaryMediumBtn
            text={'확인'}
            onPress={validateAuthNumber}
            isDisabled={!authNumber || remainingTime === 0}
          />
        </View>}
        {isCreateAuthNumber && 
        <Text style={[smallTextStyles.default, styles.smallText]}>
          남은 시간: {formatTime(remainingTime)}
        </Text>}
      </View>
      <PrimaryLargeBtn
        text={'다음'}
        onPress={handleNavigateToProfileScreen}
        isDisabled={!isAuthNumberValid}
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
    marginVertical: ms(16)
  },
  textInput: {
    gap: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
    marginTop: ms(14)
  },
  smallText: {
    paddingVertical: ms(8),
    paddingHorizontal: ms(14)
  }
});

export default EmailScreen;
