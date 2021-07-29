import React, { useState, useEffect } from 'react'
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



export default ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");

    const database = firebase.database();
    


    const signUpUser = () => {
        try {

            if (pass.length < 6 || confPass.length < 6) {
                alert("Try pass with more than 5 characters");
                return;
            }
            if (pass != confPass) {
                alert("Passwords must be agree");
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email,pass)
            const currentUser = firebase.auth().currentUser.uid
            var today = new Date();
            var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;

            database
                .ref('/Users/'+currentUser)
                .set({
                    date_create_account: dateTime,
                    email: email,
                    id: currentUser,
                    pass: pass,
                    type: 'User',
                    url_img_profile: '',
                    userName: userName,
                })
            alert("Sucessfull");
            navigation.navigate('Home')

        } catch (error) {
            console.log(error.toString());
        }
    }

    return (
        <ScrollView>

            <Container>
                <Image
                    source={Logo}
                />
                <Input
                    onChangeText={userName => setUserName(userName)}
                    placeholder="Username"
                />
                <Input
                    onChangeText={email => setEmail(email)}
                    placeholder="Email"
                />
                <Input
                    onChangeText={pass => setPass(pass)}
                    secureTextEntry={true}
                    placeholder="Pass"
                />
                <Input
                    onChangeText={confPass => setConfPass(confPass)}
                    secureTextEntry={true}
                    placeholder="Confirm Pass"

                />


                <ButtonSubmit onPress={signUpUser}>
                    <TextButton>Sing Up</TextButton>
                </ButtonSubmit>
            </Container>

        </ScrollView>
    )
}