import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {WithSplashScreen} from './components/Splash';

const PEER_PREP = 'https://ecme.acep.org/diweb/mylearning';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  const injectJavascriptCode = `
    document.addEventListener('click', function(e) {
      var target = e.target;
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }
      if (target && target.className.includes('launch')) {
        e.preventDefault();
        window.ReactNativeWebView.postMessage(target.href);
      }
    });
  `;
  const webViewRef = useRef<WebView>(null);
  const onMessage = (event: WebViewMessageEvent) => {
    const url = event.nativeEvent.data;
    webViewRef.current &&
      webViewRef.current.injectJavaScript(`window.location.href = '${url}';`);
  };

  useEffect(() => {
    setTimeout(() => {}, 2000);
    setIsAppReady(true);
  }, []);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={{width: '100%', height: '100%'}}>
            <WebView
              ref={webViewRef}
              source={{uri: PEER_PREP}}
              injectedJavaScript={injectJavascriptCode}
              onMessage={onMessage}
            />
          </View>
        </View>
      </SafeAreaView>
    </WithSplashScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
