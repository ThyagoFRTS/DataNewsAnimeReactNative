import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import Home from '../../pages/Home';
import Profile from '../../pages/Profile'
import {HomeNavigation} from '../HomeNavigation'


const Tab = createBottomTabNavigator();



export default ProfileHomeNavigation = ({route, userid}) =>{
    const [lastSessionUser, setLastSession] = useState(false);
    const [newSessionUser, setNewSession] = useState(false);
    const [userId, setId] = useState("")
    console.log('===BarNavigation===')
    // const {uid} = route.params;
    // console.log(uid)
    // if(userid){
    //     console.log("User Ig getted in AuthStack from last UserSession: "+userid);
    //     setNewSession(false);
    //     //setId(userid);
        
    // }
    // if(route){
    //     console.log("User Ig getted in AuthStack from new UserSession: "+route.params.uid)
    //     setNewSession(true);
    //     //setId(route.params.uid)
        
    // }
    
    
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel:true,
                activeTintColor: '#6B3D6C',
                inactiveTintColor: 'gray',

            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
    
                    if (route.name === 'Home') {
                        return <Entypo name="home" size={24} color={color} />
                        
                    } else {
                        return <MaterialCommunityIcons name="account" size={24} color={color} />
                    }
                },
              })
            }
        >

            <Tab.Screen name="Home" component={HomeNavigation} 
            /*initialParams={{ uid: uid }}*//>
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )

}