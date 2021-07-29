import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Login from './src/pages/Login';
import Singin from './src/pages/Singin';
import Loading from './src/pages/Loading';
import Home from './src/pages/Home';
import firebase from './src/settings/firebase';
import { NavigationContainer } from '@react-navigation/native';
import BarNavigation  from './src/components/NavigationBar'
import { AuthNavigation } from './src/components/NavigationStack'

export default function App() {
  const [loading, setLoading] = useState(true)

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  

  
  if (!user) {
    return (
      <NavigationContainer>
        <StatusBar style="light" />
        <AuthNavigation />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <AuthNavigation />
    </NavigationContainer>
  );

}

