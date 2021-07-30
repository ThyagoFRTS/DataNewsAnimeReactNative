import React, { useState, useEffect } from 'react'
import { Alert, Image } from 'react-native'
import firebase from '../../settings/firebase';
import Loading from '../Loading';
import ImageProfile from '../../components/ImageProfile';

import {
    Card,
    ContainerTex,
    TextInfo,
    Title,
    Container,
    ContainerDescription,
    ImageContainer,
    ButtonLogout,
    TextButton
} from './styles'


export default ({ route }) => {
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(true);
    const currentUser = firebase.auth().currentUser.uid;
    const database = firebase.database();
    console.log('============PROFILE=================')
    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            // You can await here
            const response = await database.ref().child('/Users/' + currentUser);
            if (response){
                response.once('value')
                .then(snapshot => {
                    setUser(snapshot.val());
                });
                setLoading(false) 
            // ...
          }
        }
        fetchData();
            
    }, [])
    
    console.log("aa")
    const logout = () =>{
        firebase.auth()
        .signOut()
        .then(() => {
            Alert.alert(
            'Logout',
            'You will sendded to Login page'
        )});
    }
    return (
        <>
            {isLoading ? <Loading /> :
                <Container>
                    <Card >

                        <ImageProfile uri={user.url_img_profile}/>
                        <ContainerTex>
                            <Title>User: {user.userName}</Title>
                            <TextInfo>Type: {user.type}</TextInfo>
                        </ContainerTex>
                    </Card>
                    <ContainerDescription>
                        <TextInfo>Account Created On: {user.date_create_account}</TextInfo>
                        <TextInfo>Email: {user.email}</TextInfo>
                    </ContainerDescription>
                    <ButtonLogout onPress={logout}>
                        <TextButton>Logout</TextButton>
                    </ButtonLogout>
                </Container>}
        </>

    )
}