import React, { useState, useEffect } from 'react'
import { Image, FlatList, Text, View } from 'react-native'
import {
    Container,
    Card,
    ContainerTex,
    Title,
    TextInfo
} from './styles'

import SearchBar from '../../components/SearchBar'
import Loading from '../Loading'


const nextSeason = "https://api.jikan.moe/v3/season/later"
const searchAnimeTitleId = "https://api.jikan.moe/v3/anime/";

export default ({navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [cardInfo, setCardInfo] = useState([]);

    const [isRender, setIsRender] = useState(false);
    



    //const {uid} = route.params;

    console.log('==IN HOME==')

    //const {uid} = route.params;
    //console.log(uid)

    useEffect(() => {
        let isMounted = true;  
        fetch(nextSeason)
            .then((response) => response.json())
            .then((json) => { if (isMounted) setData(json.anime) })
            .catch((error) => alert(error))
            .then(setLoading(false));

                         // note mutable flag
            return () => { isMounted = false };

    }, [])

    const onPressItem = (item) =>{
        async function fetchData() {
            await fetch(searchAnimeTitleId + item.mal_id + "/news")
                .then((response) => response.json())
                .then((json) => {setCardInfo(json.articles) })
                .catch((error) => alert(error))

        }
        console.log("==========ON PREESS");
        console.log(cardInfo)
        
        navigation.navigate('CardInfo', {item:item})
    }

    const renderCard = ({ item, index }) => {
        return (
            <Card onPress={()=> onPressItem(item)}>
                <Image source={{ uri: item.image_url }}
                    style={{ width: 100, height: 100, borderRadius: 8 }} />
                <ContainerTex>
                    <Title>{item.title}</Title>
                    <TextInfo>{item.synopsis.length > 100 ? item.synopsis.substring(0, 100 - 3) + "..." : item.synopsis}</TextInfo>
                    <TextInfo>{item.type}</TextInfo>
                </ContainerTex>

            </Card>
        )
    }

    return (
        <Container>
            <SearchBar nav={navigation}/>
            {isLoading ? <Loading /> :
                <FlatList
                    data={data}
                    keyExtractor={({ mal_id }, index) => mal_id.toString()}
                    
                    renderItem={renderCard}
                    extraData={isRender}
                />
            }
        </Container>
    )
}