import React, { useState, useEffect } from "react"
import { Text, Image, FlatList } from "react-native"
import CardNS from '../../components/CardNS'
import {
    Card,
    Title,
    ContainerTex,
    TextInfo,
    Container,
    ContainerDescription
} from './styles'
const search = "https://api.jikan.moe/v3/search/anime?q="
const searchAnimeTitleId = "https://api.jikan.moe/v3/anime/";
const searchAnimeTitle = "https://api.jikan.moe/v3/search/anime?q=";

export default ({ route }) => {
    const [data, setData] = useState([])
    const { item } = route.params;

    useEffect(() => {
        let isMounted = true;
        console.log("===========CARD INFORMATION============");
        console.log(searchAnimeTitleId + item.mal_id + "/news");
        fetch(searchAnimeTitleId + item.mal_id + "/news")
            .then((response) => response.json())
            .then((json) => {
                if (isMounted) {
                    setData(json.articles)
                    console.log("====================JASON PURO")
                    console.log(json.articles);
                    console.log("====================filtrado")
                    
                    console.log(listarTodasAsPropriedades(json.articles[0]));
                }
            })
            .catch((error) => alert(error));

        // note mutable flag
        return () => { isMounted = false };

    }, [])
    function listarTodasAsPropriedades(o){
        var objectoASerInspecionado;
        var resultado = [];
    
        for(objectoASerInspecionado = o; objectoASerInspecionado !== null; objectoASerInspecionado = Object.getPrototypeOf(objectoASerInspecionado)){
            resultado = resultado.concat(Object.getOwnPropertyNames(objectoASerInspecionado));
        }
    
        return resultado;
    }
    console.log("====================ATTT")
    console.log(listarTodasAsPropriedades(data))


    return (
        <Container>
            <Card>
                <Image source={{ uri: item.image_url }}
                    style={{ width: 140, height: 140, borderRadius: 8 }} />
                <ContainerTex>
                    <Title>{item.title}</Title>
                    <TextInfo>{item.synopsis.length > 100 ? item.synopsis.substring(0, 100 - 3) + "..." : item.synopsis}</TextInfo>
                    <TextInfo>{item.type}</TextInfo>
                </ContainerTex>


            </Card>

            <ContainerDescription>

                <TextInfo>Synopsis: {item.synopsis}</TextInfo>
                <TextInfo>Source: {item.source}</TextInfo>
                <TextInfo>Number of Members: {item.members}</TextInfo>
                <TextInfo>Genres: {item.genres.map(a => a.name + " ")}</TextInfo>
                <TextInfo>MAL Identifier: {item.mal_id}</TextInfo>

            </ContainerDescription>

            <Card>
                <Image source={{ uri: data[0].image_url }}
                    style={{ width: 100, height: 130, borderRadius: 8 }} />
                <ContainerTex>
                    <Title>{data[0].title}</Title>
                    <TextInfo>{data[0].intro}</TextInfo>
                    <TextInfo>{data[0].author_name}</TextInfo>
                </ContainerTex>


            </Card>
        </Container>
    )
}