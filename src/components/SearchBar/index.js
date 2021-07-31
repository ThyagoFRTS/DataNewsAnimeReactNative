import React, {useState} from "react"
import { Text, Image } from "react-native"
import { AntDesign } from '@expo/vector-icons'; 
import {
    SearchSubmit,
    Search,
    Container,
    TextInfo
} from './styles'


export default ({nav})=>{
    const [item, setItem] = useState("")

    const sendItemName = () => {

        console.log(nav.navigate("SearchResult", { anime_name: item }));

    }
    
    return(
        <Container>
            <SearchSubmit onPress={sendItemName}>
                <AntDesign name="search1" size={24} color="black" />

            </SearchSubmit>
            <Search
                onChangeText={item => setItem(item)}
                placeholder= "Search Anime Here"
                
            />
            
        </Container>
            
            
        
    )
}