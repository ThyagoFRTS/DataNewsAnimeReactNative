import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Home from '../../pages/Home';
import Profile from '../../pages/Profile'
import {HomeNavigation} from '../HomeNavigation'


const Tab = createBottomTabNavigator();



export default ProfileHomeNavigation = ({route}) =>{
    console.log('===Profile Home Navigation=')
    //const {uid} = route.params;
    //console.log(uid)
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

            <Tab.Screen name="Home" component={HomeNavigation} /*initialParams={{ uid: uid }}*//>
            <Tab.Screen name="Profile" component={Profile} /*initialParams={{ uid: uid }}*//>
        </Tab.Navigator>
    )

}