import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Login from './src/pages/Login';
import Singin from './src/pages/Singin';
import Loading from './src/pages/Loading';
import Home from './src/pages/Home';


export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  return (
    <>
      <StatusBar style="light" />
      <Home/>
      
    </>
  );
}

