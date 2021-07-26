import React, { useState, useEffect } from 'react'
import { Image, FlatList, Text, View } from 'react-native'
import CardNS from '../../components/CardNS'
import {
    Container,
} from './styles'
import SearchBar from '../../components/SearchBar'
import Loading from '../Loading'
import Logo from '../../../assets/ic_sakura_round.png'
const nextSeason = "https://api.jikan.moe/v3/season/later"


export default () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(nextSeason)
            .then((response) => response.json())
            .then((json) => { setData(json.anime) })
            .catch((error) => alert(error))
            .then(setLoading(false));

    }, [])



    return (


        <Container>
            <SearchBar/>
            {isLoading ? <Loading /> :
                <FlatList
                    data={data}
                    keyExtractor={({ mal_id }, index) => mal_id.toString()}
                    renderItem={({ item }) => (
                        <CardNS data={item} />
                        

                    )}
                />
            }



        </Container>
    )
}