import React, {useState} from "react"
import { Text, Image } from "react-native"
import { AntDesign } from '@expo/vector-icons'; 
import {
    SearchSubmit,
    Search,
    Container,
    TextInfo
} from './styles'


export default ()=>{
    const [item, setItem] = useState("")
    return(
        <Container>
            <SearchSubmit>
                <AntDesign name="search1" size={24} color="black" />

            </SearchSubmit>
            <Search
                onChangeText={item => setItem(item)}
                placeholder= "Search"
            />
            
        </Container>
            
            
        
    )
}