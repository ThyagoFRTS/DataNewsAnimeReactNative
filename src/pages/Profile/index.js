import React, {useState, useEffect} from 'react'
import { Image } from 'react-native'
import firebase from '../../settings/firebase';
import {
    ScrollView,
    Container,
    Input,
} from './styles'
import Logo from '../../../assets/ic_sakura_round.png'



export default ()=>{
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");
    

    
    return (
        <ScrollView>
            <Input
                    onChangeText={confPass => setConfPass(confPass)}
                    secureTextEntry={true}
                    placeholder= "profile screen"

                />
            
        </ScrollView>
    )
}