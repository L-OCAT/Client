import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, View } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import CloseIcon from '../../assets/svg/icon_close.svg';
import { COLORS } from '../../lib/styles/theme';
import { ms } from '../../lib/utils/dimensions';

interface KakaoLoginWebViewProps {
  visible: boolean;
  authUrl: string;
  onShouldStartLoadWithRequest: (event: WebViewNavigation) => boolean;
  onClose: () => void;
}

const KakaoLoginWebView = ({ visible, authUrl, onShouldStartLoadWithRequest, onClose }: KakaoLoginWebViewProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      setIsLoading(true);
    }
  }, [visible]);

  const handleClose = () => {
    setIsLoading(true);
    onClose();
  };


  return (
  <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <WebView
        source={{ uri: authUrl }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        javaScriptEnabled={true}
        incognito={true}
        cacheEnabled={false}
        style={styles.webview}
        startInLoadingState={true}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator 
              size="large" 
              color={COLORS.orange.Orange01} 
            />
          </View>
        )}
        {!isLoading && (
          <Pressable style={styles.closeButton} onPress={onClose}>
            <CloseIcon />
          </Pressable>
        )}

  </Modal>
);}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: ms(48),
    height: ms(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});

export default KakaoLoginWebView;