// Polyfills must be at the very top to ensure they are loaded first
import 'react-native-get-random-values'; // Provides crypto.getRandomValues
import 'react-native-url-polyfill/auto'; // Provides URL, URLSearchParams, etc.

import { Buffer } from 'buffer';
global.Buffer = Buffer;

// Polyfill for process and process.env
if (typeof global.process === 'undefined') {
  global.process = require('process');
}
// Ensure process.env exists and is an object
if (typeof global.process.env === 'undefined') {
  global.process.env = {};
}
// Set NODE_ENV if it's not already set (Expo usually handles this, but being explicit)
if (typeof global.process.env.NODE_ENV === 'undefined') {
  global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production';
}
// Add other common process properties if needed by libraries
if (typeof global.process.version === 'undefined') {
  global.process.version = 'v18.0.0'; // Mock a Node.js version
}
if (typeof global.process.nextTick === 'undefined') {
  global.process.nextTick = (fn) => setTimeout(fn, 0);
}

import { useEffect } from 'react';
import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { 
  useFonts,
  RobotoMono_400Regular 
} from '@expo-google-fonts/roboto-mono';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AbstraxionProvider } from '@burnt-labs/abstraxion-react-native';
import { xionConfig } from '@/config/xion';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'RobotoMono-Regular': RobotoMono_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AbstraxionProvider
      config={{
        dappId: xionConfig.appId,
        chainId: xionConfig.chainId,
        rpcUrl: xionConfig.rpcUrl,
        restUrl: xionConfig.restUrl,
        redirectUri: xionConfig.redirectUri,
      }}
    >
      <>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </>
    </AbstraxionProvider>
  );
}
