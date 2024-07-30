import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import  * as KakaoLogin from '@react-native-seoul/kakao-login';
import { isIOS } from '../../lib/utils/platform';

// svg
import Logo from '../../assets/svg/logo.svg';
import KakaoIcon from '../../assets/svg/kakaoIcon.svg';
import AppleIcon from '../../assets/svg/appleIcon.svg';

const LoginScreen = () => {
  
  const kakaoLogin = async () => {
    await KakaoLogin.login()
      .then((result) => {
        console.log("Login Success", JSON.stringify(result));
      })
      .catch((error) => {
        console.error(`Login Failed: ${error.code} - ${error.message}`);
      });
  }

  const appleLogin = () => {
    console.log('appleLogin')
  }

  return (
    <View style={styles.container}>
      <Logo style={styles.logo}/>
      <Pressable style={[styles.btn, styles.kakaoBtn]} onPress={kakaoLogin}>
        <KakaoIcon/>
        <Text style={[styles.btnText, styles.kakaoBtnText]}>카카오 로그인</Text>
      </Pressable>

      {isIOS && 
      <Pressable style={[styles.btn, styles.appleBtn]} onPress={appleLogin}>
        <AppleIcon/>
        <Text style={[styles.btnText, styles.appleBtnText]}>애플 로그인</Text>
      </Pressable>}

    </View>
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
    borderRadius: 8
  },
  kakaoBtn: {
    backgroundColor: '#FEE500',
  },
  appleBtn: {
    backgroundColor: 'black',
    marginTop: 14,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    width: '78%'
  },
  kakaoBtnText: {
    color: '#262200'
  },
  appleBtnText: {
    color: "white"
  },
  logo: {
    marginBottom: 40
  }
})

export default LoginScreen;
