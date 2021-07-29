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

export default ({ route }) => {
    const [data, setData] = useState([])
    const { item } = route.params;

    
    
    return (
        <Container>
            <Card>
                <Image source={{ uri: item.image_url }}
                    style={{ width: 100, height: 100, borderRadius: 8 }} />
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
                    <TextInfo>Genres: {item.genres.map(a => a.name+" ")}</TextInfo>
                    <TextInfo>MAL Identifier: {item.mal_id}</TextInfo>
                    
                </ContainerDescription>

                
        </Container>
    )
}