import React, { useState, useEffect } from "react"
import { Text, Image, FlatList, ActivityIndicator } from "react-native"
import CardNS from '../../components/CardNS'
import {
    Card,
    Title,
    ContainerTex,
    TextInfo,
    Container,
    ContainerDescription,
    ImageLoad
} from './styles'

const searchAnimeTitle = "https://api.jikan.moe/v3/search/anime?q=";


export default ({ route }) => {
    const [data, setData] = useState([])
    const [haveContent, setHaveContent] = useState(false);
    const { anime_name } = route.params;
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            await fetch(searchAnimeTitle + anime_name)
                .then((response) => response.json())
                .then((json) => {
                    if (isMounted) {
                        setData(json.results)
                        console.log("======json received")
                        console.log(json.results)
                    }
                })
                .catch((error) => alert(error));

            setHaveContent(true);
        }
        console.log("================USE EFECT SEARCH RESUL===============")
        console.log("String url: " + searchAnimeTitle + anime_name)
        fetchData();


        return () => { isMounted = false };

    }, [])

    function listarTodasAsPropriedades(o) {
        var objectoASerInspecionado;
        var resultado = [];

        for (objectoASerInspecionado = o; objectoASerInspecionado !== null; objectoASerInspecionado = Object.getPrototypeOf(objectoASerInspecionado)) {
            resultado = resultado.concat(Object.getOwnPropertyNames(objectoASerInspecionado));
        }

        return resultado;
    }
    console.log("====================Data Visible")
    //console.log(listarTodasAsPropriedades(data))

    return (
        <Container>



            {haveContent ?
                <>
                    <Card>
                        <Image source={{ uri: data[0].image_url }}
                            style={{ width: 100, height: 130, borderRadius: 8 }} />
                        <ContainerTex>
                            <Title>{data[0].title}</Title>
                            <TextInfo>{"Type: " + data[0].type}</TextInfo>

                        </ContainerTex>
                    </Card>
                    <ContainerDescription>

                        <TextInfo>{"Synopsis: " + data[0].synopsis} </TextInfo>
                        <TextInfo>{"Airing: " + data[0].airing.toString()}</TextInfo>
                        <TextInfo>{"Episodes: " + data[0].episodes}</TextInfo>
                        <TextInfo>{"Membres: " + data[0].members}</TextInfo>
                        <TextInfo>{"Start Date: " + data[0].start_date}</TextInfo>
                        <TextInfo>{"End Data: " + data[0].end_date}</TextInfo>
                        <TextInfo>{"Url: " + data[0].url}</TextInfo>
                    </ContainerDescription>
                </>
                :
                <ImageLoad>
                    <ActivityIndicator size="large" color="#6B3D6C"
                        style={{ width: 100, height: 130 }}
                    />
                </ImageLoad>
            }




        </Container>
    )
}