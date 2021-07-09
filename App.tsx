import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import AppLoading from "expo-app-loading";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { Rajdhani_500Medium, Rajdhani_700Bold } from "@expo-google-fonts/rajdhani";

import { Routes } from './src/routes';
import { AuthProvider } from './src/hooks/auth';
import { Background } from './src/components/Background';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold,
  });

  if(!fontsLoaded) {     
    return <AppLoading />
  }

  return (    
    <Background>
      
      <StatusBar
          barStyle="light-content"
          backgroundColor='transparent'
          translucent
        />

      <AuthProvider>
        <Routes />
      </AuthProvider>

    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});