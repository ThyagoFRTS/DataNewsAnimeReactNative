import React, { useState, useEffect } from 'react'
import { Image } from 'react-native'
import firebase from '../../settings/firebase';
import Loading from '../Loading';
import {
    KeyboardView,
    Title,
    Container,
    Input,
    ButtonSubmit,
    TextButton
} from './styles'
import Logo from '../../../assets/ic_sakura_round.png'



export default ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [isLoading, setLoading] = useState(false);

    const loginUser = () => {
        setLoading(true)
        try {

            firebase.auth().signInWithEmailAndPassword(email, pass).then(

                function (user) {

                    const currentUser = firebase.auth().currentUser
                    navigation.navigate('Home', { uid: currentUser.uid });

                }
            );
        } catch (error) {
            console.log(error.toString());
        }
        setLoading(false)

    }

    const signUpUser = () => {

        navigation.navigate('Singin');

    }

    return (
        <KeyboardView>
            {isLoading ? <Loading /> :
                <Container>
                    <Image
                        source={Logo}
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
                    <ButtonSubmit onPress={loginUser}>
                        <TextButton>Login</TextButton>
                    </ButtonSubmit>

                    <ButtonSubmit onPress={signUpUser}>
                        <TextButton>Sing Up</TextButton>
                    </ButtonSubmit>
                </Container>}

        </KeyboardView>
    )
}