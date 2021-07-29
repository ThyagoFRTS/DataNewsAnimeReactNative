import React from 'react';



import Login from '../../pages/Login'
import NavigationBar from '../NavigationBar';
import Singin from '../../pages/Singin';

import { createStackNavigator } from '@react-navigation/stack';


const AuthStack = createStackNavigator();




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
}


