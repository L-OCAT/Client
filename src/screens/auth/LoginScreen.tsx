import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import { isIOS } from '../../lib/utils';

// svg
import AppleIcon from '../../assets/svg/appleIcon.svg';
import KakaoIcon from '../../assets/svg/kakaoIcon.svg';
import Logo from '../../assets/svg/logo.svg';
import { ms } from '../../lib/utils/dimensions';

const LoginScreen = () => {
  const kakaoLogin = async () => {
    console.log('kakaoLogin');
  };

  const appleLogin = () => {
    console.log('appleLogin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo style={styles.logo} />
      <Pressable style={[styles.btn, styles.kakaoBtn]} onPress={kakaoLogin}>
        <KakaoIcon />
        <Text style={[styles.btnText, styles.kakaoBtnText]}>카카오 로그인</Text>
      </Pressable>

      {isIOS && (
        <Pressable style={[styles.btn, styles.appleBtn]} onPress={appleLogin}>
          <AppleIcon />
          <Text style={[styles.btnText, styles.appleBtnText]}>애플 로그인</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 8,
  },
  kakaoBtn: {
    backgroundColor: '#FEE500',
  },
  appleBtn: {
    backgroundColor: 'black',
    marginTop: ms(14),
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    padding: ms(16),
    width: '78%',
  },
  kakaoBtnText: {
    color: '#262200',
  },
  appleBtnText: {
    color: 'white',
  },
  logo: {
    marginBottom: ms(40),
  },
});

export default LoginScreen;
