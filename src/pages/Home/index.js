import React, {useState, useEffect} from 'react'
import { Image, FlatList, Text,View} from 'react-native'
import { getNextSeason } from '../../Handlers/handleJson'
import {
    ScrollView,
    Title,
    Container,
    Input,
    ButtonSubmit,
    TextButton
} from './styles'
import Loading from '../Loading'
import Logo from '../../../assets/ic_sakura_round.png'

const movies = "https://reactnative.dev/movies.json"
const nextSeason = "https://api.jikan.moe/v3/season/later"


export default ()=>{
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetch(nextSeason)
        .then( (response) => response.json())
        .then( (json) => {setData(json.anime)
            console.log(data)
            console.log("AQUI CARAI")
        })
        .catch( (error) => alert(error))
        .then(setLoading(false));

    },[])


    
    return (
        <ScrollView horizontal={true}>
            
                <FlatList
                    data={data}
                    keyExtractor={({mal_id},index) => mal_id.toString()}
                    renderItem={({item})=>(
                        
                            <Text >{item.title}, {item.mal_id} aa</Text>
                        
                    )}
                />
            <Container>
                {isLoading ? <Loading/> : <Text>aaa</Text>
                }
                
            </Container>
            
        </ScrollView>
    )
}