import React, {useState, useEffect} from 'react'
import { Image } from 'react-native'
import firebase from '../../settings/firebase';
import auth from '@react-native-firebase/auth';
import {
    KeyboardView,
    Title,
    Container,
    Input,
    ButtonSubmit,
    TextButton
} from './styles'
import Logo from '../../../assets/ic_sakura_round.png'



export default ()=>{
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const loginUser = () =>{
        try{
            
            firebase.auth().signInWithEmailAndPassword(email,pass).then(
                function(user){
                    console.log(user);
                }
            );
        }catch(error){
            console.log(error.toString());
        }
        
    }

    const signUpUser = () =>{
        try{
            
            if (pass.length < 6){
                alert("Try pass with more than 5 characters");
                return;
            }
            
            firebase.auth().createUserWithEmailAndPassword(email,pass);
        }catch(error){
            console.log(error.toString());
        }
    }
    
    return (
        <KeyboardView>
            
            <Container>
                <Image
                    source={Logo}
                />
                <Input
                    onChangeText={email => setEmail(email)}
                    placeholder= "Email"
                />
                <Input
                    onChangeText={pass => setPass(pass)}
                    secureTextEntry={true}
                    placeholder= "Pass"

                />
                <ButtonSubmit onPress={loginUser}>
                    <TextButton>Login</TextButton>
                </ButtonSubmit>

                <ButtonSubmit onPress={signUpUser}>
                    <TextButton>Sing Up</TextButton>
                </ButtonSubmit>
            </Container>
            
        </KeyboardView>
    )
}