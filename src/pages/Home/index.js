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
import Logo from '../../../assets/ic_sakura_round.png'


const nextSeason = "https://api.jikan.moe/v3/season/later"


export default ({navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isRender, setIsRender] = useState(false);
    const [a, setA] = useState("");



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
        setA(item.title)
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
            <SearchBar uId={a} />
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