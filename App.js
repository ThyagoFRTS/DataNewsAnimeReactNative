import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Login from './src/pages/Login';
import Singin from './src/pages/Singin';


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Singin/>
      
    </>
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
