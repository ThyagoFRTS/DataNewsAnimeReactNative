import React, {useState, useEffect} from 'react'
import { Image } from 'react-native'
import firebase from '../../settings/firebase';
import {
    ScrollView,
    Title,
    Container,
    Input,
    ButtonSubmit,
    TextButton
} from './styles'
import Logo from '../../../assets/ic_sakura_round.png'



export default ()=>{
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");
    

    
    return (
        <ScrollView>
            
            <Container>
                <Image
                    source={Logo}
                />
                <Input
                    onChangeText={name => setEmail(name)}
                    placeholder= "Username"
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
                <Input
                    onChangeText={confPass => setConfPass(confPass)}
                    secureTextEntry={true}
                    placeholder= "Confirm Pass"

                />
                

                <ButtonSubmit onPress={signUpUser}>
                    <TextButton>Sing Up</TextButton>
                </ButtonSubmit>
            </Container>
            
        </ScrollView>
    )
}