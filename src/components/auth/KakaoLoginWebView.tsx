import React from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import CloseIcon from '../../assets/svg/icon_close.svg';
import { ms } from '../../lib/utils/dimensions';

interface KakaoLoginWebViewProps {
  visible: boolean;
  authUrl: string;
  onShouldStartLoadWithRequest: (event: WebViewNavigation) => boolean;
  onClose: () => void;
}

const KakaoLoginWebView = ({ visible, authUrl, onShouldStartLoadWithRequest, onClose }: KakaoLoginWebViewProps) => (
  <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <WebView
        source={{ uri: authUrl }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        javaScriptEnabled={true}
        incognito={true}
        cacheEnabled={false}
        style={styles.webview}
      />
      <Pressable style={styles.closeButton} onPress={onClose}>
      <CloseIcon />
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});

export default KakaoLoginWebView;