import React from 'react';
import { Image } from 'react-native';
import {
    ItemBarView,
    Text
    } from './styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Home from '../../pages/Home';
import Profile from '../../pages/Profile'

const Tab = createBottomTabNavigator();

export default Tabs = () =>{
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel:true,
                activeTintColor: 'black',
                inactiveTintColor: 'gray',

            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
    
                    if (route.name === 'Home') {
                        return <AntDesign name="home" size={24} color={color} />
                        
                    } else {
                        return <MaterialCommunityIcons name="account" size={24} color={color} />
                    }
                },
              })
            }
        >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )

}