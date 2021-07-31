import React, { useState, useEffect } from "react"
import { Text, Image, FlatList, ActivityIndicator } from "react-native"
import CardNS from '../../components/CardNS'
import { Rating, AirbnbRating } from 'react-native-ratings';
import {
    Card,
    Title,
    ContainerTex,
    TextInfo,
    Container,
    ContainerDescription,
    ImageLoad,
    RatingContainer
} from './styles'

const searchAnimeTitle = "https://api.jikan.moe/v3/search/anime?q=";


export default ({ route }) => {
    const [data, setData] = useState([])
    const [haveContent, setHaveContent] = useState(false);
    const [defaltRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const { anime_name } = route.params;

    const starImgFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png'
    const starImgCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png'




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
                        <RatingContainer>

                            <Rating
                                type='custom'
                                showRating={false}
                                readonly={true}
                                ratingCount={10}
                                imageSize={33}
                                startingValue={data[0].score}
                            />
                        </RatingContainer>


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