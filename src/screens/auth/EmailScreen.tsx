import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {
  PrimaryLargeBtn,
  TertiaryMediumBtn,
} from '../../components/public/Buttons';
import {BackBtnGnbHeader} from '../../components/public/GnbHeader';
import {KeyboardAvoidingWrapper} from '../../components/public/KeyboardAvoidingWrapper';
import {useFormatTime, useTimer} from '../../hooks/useTimer';
import {
  smallTextStyles,
  textInputStyles,
} from '../../lib/styles/textInputStyles';
import {COLORS} from '../../lib/styles/theme';
import {typography} from '../../lib/styles/typography';
import {ms} from '../../lib/utils/dimensions';
import {AuthStackNavigationProp} from '../../navigation/types';

const INITIAL_TIME = 179;

enum ErrorType {
  EMAIL_INVALID,
  EMAIL_DUPLICATE,
  AUTH_NUMBER_INVALID,
  AUTH_NUMBER_TIMEOUT,
}

const EmailScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [email, setEmail] = useState('');
  const [authNumber, setAuthNumber] = useState('');
  const [isAuthNumberValid, setIsAuthNumberValid] = useState(false);
  const [isCreateAuthNumber, setIsCreateAuthNumber] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const {remainingTime, resetTimer} = useTimer(INITIAL_TIME);
  const formatTime = useFormatTime();

  const getErrorMessage = (errorType: ErrorType | null): string => {
    switch (errorType) {
      case ErrorType.EMAIL_INVALID:
        return '이메일 형식을 확인해주세요';
      case ErrorType.EMAIL_DUPLICATE:
        return '이미 사용중인 이메일입니다';
      case ErrorType.AUTH_NUMBER_INVALID:
        return '잘못된 인증번호입니다';
      case ErrorType.AUTH_NUMBER_TIMEOUT:
        return '입력 시간이 초과됐습니다';
      default:
        return '';
    }
  };

  // 이메일 유효성 검사
  const validateEmail = (value: string) => {
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const isValid = emailRegex.test(value);

    return isValid;
  };

  // 이메일 중복 검사
  const checkEmailDuplicate = async (email: string): Promise<boolean> => {
    // 이메일 중복검사 API 호출
    return new Promise((resolve, reject) => {
      // 예를 들어, 임의로 중복 검사 결과를 반환
      setTimeout(() => resolve(true), 0); //중복검사를 통과했으면 true, 통과하지 못했으면 false
    });
  };

  // 인증번호 생성
  const createAuthNumber = () => {
    setAuthNumber('');
    setIsCreateAuthNumber(true);
    setError(null);
    resetTimer();
  };

  //남은 시간이 0일시 에러메시지 출력
  useEffect(() => {
    if (remainingTime === 0) {
      setError(ErrorType.AUTH_NUMBER_TIMEOUT);
    }
  }, [remainingTime]);

  // onPress 이벤트 핸들러
  const handleSendAuthNumber = async () => {
    if (!validateEmail(email)) {
      setError(ErrorType.EMAIL_INVALID);
      return;
    }

    const isDuplicate = await checkEmailDuplicate(email);
    if (!isDuplicate) {
      setError(ErrorType.EMAIL_DUPLICATE);
      return;
    }

    // 모두 통과하면 인증번호 생성
    createAuthNumber();
  };

  // 인증번호 확인
  const validateAuthNumber = () => {
    setIsAuthNumberValid(false);
    setError(ErrorType.AUTH_NUMBER_INVALID);
  };

  const handleNavigateToProfileScreen = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingWrapper>
        <BackBtnGnbHeader title="이메일 인증" />
        <View style={styles.contentsWrapper}>
          <Text style={[typography.subTitle_01, styles.titleText]}>
            이메일을 입력해주세요
          </Text>
          <View style={styles.textInput}>
            <TextInput
              style={[
                error === ErrorType.EMAIL_INVALID ||
                error === ErrorType.EMAIL_DUPLICATE
                  ? textInputStyles.errorInput
                  : textInputStyles.default,
                {flex: 1},
                isCreateAuthNumber && {color: COLORS.gray.Gray03},
              ]}
              autoCapitalize="none"
              placeholder="이메일 입력"
              placeholderTextColor="#c1c1c1"
              value={email}
              onChangeText={e => setEmail(e)}
              onSubmitEditing={() => handleSendAuthNumber()}
              editable={!isCreateAuthNumber}
            />
            <TertiaryMediumBtn
              text={isCreateAuthNumber ? '재전송' : '인증전송'}
              onPress={() => {
                isCreateAuthNumber
                  ? createAuthNumber()
                  : handleSendAuthNumber();
              }}
              isDisabled={!email}
            />
          </View>
          {(error === ErrorType.EMAIL_INVALID ||
            error === ErrorType.EMAIL_DUPLICATE) && (
            <Text style={[smallTextStyles.error, styles.smallText]}>
              {getErrorMessage(error)}
            </Text>
          )}
          {isCreateAuthNumber && (
            <View style={styles.textInput}>
              <TextInput
                style={[
                  error === ErrorType.AUTH_NUMBER_INVALID
                    ? textInputStyles.errorInput
                    : textInputStyles.default,
                  {flex: 1},
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
            </View>
          )}
          {(error === ErrorType.AUTH_NUMBER_INVALID ||
            error === ErrorType.AUTH_NUMBER_TIMEOUT) && (
            <Text style={[smallTextStyles.error, styles.smallText]}>
              {getErrorMessage(error)}
            </Text>
          )}
          {isCreateAuthNumber && (
            <Text style={[smallTextStyles.default, styles.smallText]}>
              남은 시간: {formatTime(remainingTime)}
            </Text>
          )}
        </View>
        <View style={styles.btnBox}>
          <PrimaryLargeBtn
            text={'다음'}
            onPress={handleNavigateToProfileScreen}
            isDisabled={!isAuthNumberValid}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  contentsWrapper: {
    paddingHorizontal: ms(23),
    flex: 1,
  },
  titleText: {
    color: COLORS.gray.Gray07,
    marginVertical: ms(16),
  },
  textInput: {
    gap: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(14),
  },
  smallText: {
    paddingTop: ms(8),
  },
  btnBox: {
    paddingVertical: 10,
  },
});

export default EmailScreen;
