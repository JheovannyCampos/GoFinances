import React from 'react';
import AppLoading from 'expo-app-loading'
import { ThemeProvider } from "styled-components"

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import  {CategorySelect}  from './src/screens/CategorySelect';
import theme from "./src/global/styles/theme";

export default function App() {
  const[fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });
  
  if(!fontsLoaded) {
    return <AppLoading />
  }

  return(
  <ThemeProvider theme={theme}>
    <CategorySelect />
  </ThemeProvider>
  )
}
