import React, { useState, useEffect } from 'react'
import { Image } from 'react-native'
import firebase from '../../settings/firebase';
import {
    Card,
    ContainerTex,
    TextInfo,
    Title,
    Container,
    ContainerDescription,
    ImageContainer
} from './styles'




export default () => {
    const [user, setUser] = useState();
    const currentUser = firebase.auth().currentUser;
    const database = firebase.database();
    database
        .ref('/Users/' + currentUser.uid)
        .once('value')
        .then(snapshot => {
            setUser(snapshot.val());
        });
        console.log(user)
    


    return (
        <Container>
            <Card>
                <ImageContainer>
                    <Image 
                        style={{ width: 100, height: 100, borderRadius: 8 }} />

                </ImageContainer>
                <ContainerTex>
                    <Title>User: {user.userName}</Title>
                    <TextInfo>Type: {user.type}</TextInfo>
                </ContainerTex>


            </Card>

            <ContainerDescription>

                <TextInfo>Account Created On: {user.date_create_account}</TextInfo>
                <TextInfo>Email: {user.email}</TextInfo>


            </ContainerDescription>


        </Container>
    )
}