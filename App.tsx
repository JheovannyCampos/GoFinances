import React from 'react';
import AppLoading from 'expo-app-loading'
import { ThemeProvider } from "styled-components"
import "react-native-gesture-handler";

import { Routes } from "./src/routes";
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
//import  { AppRoutes }  from './src/routes/app.routes';
import { SignIn } from './src/screens/SignIn'

import { AuthProvider, useAuth } from './src/hooks/auth'

export default function App() {
  const[fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });
  
  const { userStorageLoading } = useAuth();

  if(!fontsLoaded || userStorageLoading) {
    return <AppLoading />
  }

  return(
  <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
  </ThemeProvider>
  )
}
