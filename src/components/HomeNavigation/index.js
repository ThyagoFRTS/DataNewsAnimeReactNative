import React from 'react';

import Home from '../../pages/Home';
import Login from '../../pages/Login'
import CardInfo from '../../pages/CardInfo'
import Singin from '../../pages/Singin';

import NavigationBar from '../NavigationBar';
import { createStackNavigator } from '@react-navigation/stack';


const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
/*
export const AuthNavigation = () =>{
  return (
    <AuthStack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="Login"
    >
      <AuthStack.Screen name="Login" component={Login}/>
      <AuthStack.Screen name="Singin" component={Singin} />
      <AuthStack.Screen name="Home" component={NavigationBar} />


    </AuthStack.Navigator>
  );
}*/

export const HomeNavigation = () =>{
  return (
    <HomeStack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="Home"
    >
      
      <HomeStack.Screen name="BackToHome" component={Home} />
      <HomeStack.Screen name="CardInfo" component={CardInfo} />

    </HomeStack.Navigator>
  );
}




