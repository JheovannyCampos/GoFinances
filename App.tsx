import React from 'react';
import AppLoading from 'expo-app-loading'
import { ThemeProvider } from "styled-components"
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

//import  { Register }  from './src/screens/Register';
import theme from "./src/global/styles/theme";
import  { AppRoutes }  from './src/routes/app.routes';

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
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  </ThemeProvider>
  )
}
