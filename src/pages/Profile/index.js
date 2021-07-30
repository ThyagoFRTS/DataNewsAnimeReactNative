import React, { useState, useEffect } from 'react'
import { Image } from 'react-native'
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
    ImageContainer
} from './styles'


export default ({ route }) => {
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(false);
    const currentUser = firebase.auth().currentUser.uid;
    const database = firebase.database();

    useEffect(() => {
        database
            .ref('/Users/' + currentUser)
            .once('value')
            .then(snapshot => {
                setUser(snapshot.val());
            });
    }, [])


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
                </Container>}
        </>

    )
}