import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {WithSplashScreen} from './components/Splash';

const PEER_PREP =
  'https://ecme.acep.org/diweb/assessment/self/home/self-eid/6508050/self-sid/163563942';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      
    }, 2000);
    setIsAppReady(true);
  }, []);
  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <View style={styles.container}>
        <View style={{width: '100%', height: '100%'}}>
          <WebView source={{uri: PEER_PREP}} />
        </View>
      </View>
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
