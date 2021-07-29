import React, {useState} from "react"
import { Text, Image } from "react-native"

import {
    Card,
    Title,
    ContainerTex,
    TextInfo
} from './styles'


export default ({data})=>{
    const maxlimit = 100;
    let syn = data.synopsis;
    
    return(
        <Card>
            <Image source={{uri: data.image_url}}
                    style={{width: 100, height: 100, borderRadius: 8}}/>
            <ContainerTex>
                <Title>{data.title}</Title>  
                <TextInfo>{syn.length > maxlimit? syn.substring(0,maxlimit-3)+"...":syn}</TextInfo>
            </ContainerTex>
            
        </Card>
    )
}