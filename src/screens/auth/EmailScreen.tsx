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
import { useTimer, useFormatTime } from '../../hooks/useTimer';

const INITIAL_TIME = 179;

const EmailScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const screenLayout = useScreenLayout();
  const [email, setEmail] = useState('');
  const [authNumber, setAuthNumber] = useState('');
  const [showEmailValidErrorMessage, setShowEmailValidErrorMessage] = useState(false);
  const [showEmailDuplicateErrorMessage, setShowEmailDuplicateErrorMessage] = useState(false);
  const [isAuthNumberValid, setIsAuthNumberValid] = useState(false);
  const [showAuthNumberErrorMessage, setShowAuthNumberErrorMessage] = useState(false);
  const [isCreateAuthNumber, setIsCreateAuthNumber] = useState(false)
  
  const { remainingTime, resetTimer } = useTimer(INITIAL_TIME);
  const formatTime = useFormatTime();

  const handleResendClick = () => {
    resetTimer();
  };

  const validateEmail = (value: string) => {
    //이메일 유효성 검사
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const isValid = emailRegex.test(value);
    setShowEmailValidErrorMessage(!isValid)
    
    //이메일 유효성 검사를 통과하지 못한 경우
    if (!isValid) {
      setIsCreateAuthNumber(false);
      return;
    };

    // 유효성 검사를 통과한 경우 이메일 중복검사 실행
    checkEmailDuplicate(value)
    .then(checkDuplicate => {
      setShowEmailDuplicateErrorMessage(!checkDuplicate);
      
      if (checkDuplicate) {
        createAuthNumber();
      }
    })
    .catch(error => {
      console.log('중복 검사 중 에러 발생: ', error)
      // 오류 메시지 또는 사용자에게 알림 처리
      setShowEmailDuplicateErrorMessage(true);
    });
  };
  
  const checkEmailDuplicate = async (email: string): Promise<boolean> => {
    // 이메일 중복검사 API 호출
    return new Promise((resolve, reject) => {
      // 예를 들어, 임의로 중복 검사 결과를 반환
      setTimeout(() => resolve(true), 0); //중복검사를 통과했으면 true, 통과하지 못했으면 false
    });
  };
  
  // 인증번호 확인
  const validateAuthNumber = () => {
    setIsAuthNumberValid(false)
    setShowAuthNumberErrorMessage(true)
  }

  // 인증번호 생성
  const createAuthNumber = () => {
    setAuthNumber('')
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
            style={[
              showEmailDuplicateErrorMessage || showEmailValidErrorMessage ? 
              textInputStyles.errorInput : 
              textInputStyles.default, 
              { flex: 1 },
              isCreateAuthNumber && { color: COLORS.gray.Gray03 }
            ]}
            autoCapitalize="none"
            placeholder="이메일 입력"
            placeholderTextColor="#c1c1c1"
            value={email}
            onChangeText={e => setEmail(e)}
            onSubmitEditing={() => validateEmail(email)}
            editable={!isCreateAuthNumber}
          />
          <TertiaryMediumBtn
            text={isCreateAuthNumber ? '재전송' : '인증전송'}
            onPress={() => {
              isCreateAuthNumber ? createAuthNumber() : validateEmail(email), 
              setShowAuthNumberErrorMessage(false)
            }}
            isDisabled={!email}
          />
        </View>
        {showEmailValidErrorMessage &&
        <Text style={[smallTextStyles.error, styles.smallText]}>
          올바른 이메일 주소를 입력하세요
        </Text>}
        {showEmailDuplicateErrorMessage &&
        <Text style={[smallTextStyles.error, styles.smallText]}>
          중복된 이메일 주소입니다
        </Text>}
        {isCreateAuthNumber && 
        <View style={styles.textInput}>
          <TextInput
            style={[
              showAuthNumberErrorMessage ? textInputStyles.errorInput : textInputStyles.default,
              { flex: 1 },
            ]}
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
        {showAuthNumberErrorMessage &&
        <Text style={[smallTextStyles.error, styles.smallText]}>
          잘못된 인증번호입니다  
        </Text>}
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
    paddingTop: ms(8),
    paddingHorizontal: ms(14)
  }
});

export default EmailScreen;
