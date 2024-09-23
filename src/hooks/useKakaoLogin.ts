import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import Config from 'react-native-config';
import { WebViewNavigation } from 'react-native-webview';
import { authenticateUser } from '../api/auth';
import { AuthStackNavigationProp } from '../navigation/types';
import { AuthRequest, AuthResponse } from '../types/auth';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${Config.KAKAO_REDIRECT_URI}&lang=ko`;

export const useKakaoLogin = () => {
  const [showWebView, setShowWebView] = useState(false);
  const navigation = useNavigation<AuthStackNavigationProp>();
  
  const loginMutation = useMutation<AuthResponse, Error, AuthRequest>({
    mutationFn: authenticateUser,
    onSuccess: () => {
      navigation.navigate('Profile');
    },
    onError: (error) => {
      console.error('로그인 오류:', error);
    },
  });

  const handleShouldStartLoad = (event: WebViewNavigation) => {
    const { url } = event;

    if (Config.KAKAO_REDIRECT_URI && url.startsWith(Config.KAKAO_REDIRECT_URI)) {
      const code = extractCodeFromUrl(url);
      if (code) {
        console.log('code', code);
        setShowWebView(false);
        loginMutation.mutate({ provider: "KAKAO", code });
      } else {
        console.error('인가 코드를 추출할 수 없습니다.');
        setShowWebView(false);
      }
      return false;
    }
    return true;
  };

  const extractCodeFromUrl = (url: string): string | null => {
    const codeMatch = url.match(/code=([^&]+)/);
    return codeMatch ? codeMatch[1] : null;
  };

  const handleOpenKakaoLoginWebView = () => {
    setShowWebView(true);
  };

  const handleCloseKakaoLoginWebView = () => {
    setShowWebView(false);
  };

  return {
    showWebView,
    setShowWebView,
    handleShouldStartLoad,
    KAKAO_AUTH_URL,
    loginMutation,
    handleOpenKakaoLoginWebView,
    handleCloseKakaoLoginWebView,
  };
};