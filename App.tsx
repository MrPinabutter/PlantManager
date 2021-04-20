import React from 'react';
import AppLoading from 'expo-app-loading'

import Routes from './src/routes';

import { useFonts, Jost_600SemiBold, Jost_400Regular } from '@expo-google-fonts/jost';

export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_600SemiBold,
    Jost_400Regular
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Routes />
  );
}