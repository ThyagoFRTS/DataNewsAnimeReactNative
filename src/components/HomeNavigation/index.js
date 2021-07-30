import React from 'react';

import Home from '../../pages/Home';
import Login from '../../pages/Login'
import CardInfo from '../../pages/CardInfo'
import Profile from '../../pages/Profile'

import { createStackNavigator } from '@react-navigation/stack';



const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
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
export const ProfileNavigation = () =>{
  return (
    <ProfileStack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="Profile"
    >
      
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Login" component={Login} />

    </ProfileStack.Navigator>
  );
}

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




