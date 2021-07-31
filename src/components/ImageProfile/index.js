import React, { useState, useEffect } from 'react'
import {
    Alert,
    Image,
    ActivityIndicator
} from 'react-native';
import firebase, {storageRef} from '../../settings/firebase';
import * as ImagePicker from 'expo-image-picker';
import { utils } from '@react-native-firebase/app';
import { AntDesign } from '@expo/vector-icons';
import Loading from '../../pages/Loading';
//import ImagePicker from 'react-native-image-picker';
import {
    Card,
    ContainerTex,
    TextInfo,
    Title,
    ImageLoad,
    ContainerDescription,
    ImageContainer
} from './styles'
import { set } from 'react-native-reanimated';




export default ({ uri }) => {
    const cloudStorage = firebase.storage();
    
    const [image, setImage] = useState(null);
    const [isUpLoading, setUpLoading] = useState(false);
    const [isVoid, setVoid] = useState(false);
    const [wasSeted, setWasSeted] = useState(false);
    const [uriImage, setUriImage] = useState("");
    
    console.log("========PROFILE PIC==========")
    
    useEffect(()=>{
        if(uri == ""){
            setVoid(true)
        }else{
            setVoid(false)
        }
        console.log("=========USE EFEQUIT");
        console.log(uri)
        console.log(isVoid)
        console.log()
    },[uri,image])
    if (!wasSeted){
        
        cloudStorage.ref(uri).getDownloadURL()
            .then(url => {
                console.log(url)
                if (!wasSeted) {
                    setImage(url)
    
                }
                setWasSeted(true);
            })
            .catch(e => { console.log(e); });
            

    }



        
 
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            
            console.log("=============================RESULT PICK")
            const user = firebase.auth().currentUser.uid;
            uri = result.uri;
            console.log(user)
            console.log(uri)
            setImage(result.uri);
            setUpLoading(true);
            try {
                console.log("-------------------Result RUI-----------------")
                console.log(result.uri)

                var extension= result.uri.substring(result.uri.lastIndexOf('.') + 1);
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                      resolve(xhr.response);
                    };
                    xhr.onerror = function () {
                      reject(new TypeError("Network request failed"));
                    };
                    xhr.responseType = "blob";
                    xhr.open("GET", result.uri, true);
                    xhr.send(null);
                  });
                const snapshot = await cloudStorage.ref(user+"."+extension).put(blob, { contentType: "image/jpeg" });
                
                setVoid(false);
                const userRef = firebase.database().ref("Users/"+user);
                userRef.update({"url_img_profile": user+"."+extension}).then(()=>{
                    console.log("=========================ADD TO DATABASE")
                })
                setWasSeted(true);
                Alert.alert(
                    'Image Sended Sucessfull',
                    'Your image has saved'
                )
                
            } catch (e) {
                console.log(e);
            }
            
        }
    };

    

    return (
        <ImageContainer onPress={pickImage}>
            {isVoid?
                <ImageLoad>
                    <AntDesign name="adduser" size={120} color="gray" />
                </ImageLoad>
            :
            !wasSeted ?
                <ImageLoad>
                    <ActivityIndicator size="large" color="#6B3D6C"
                        style={{ width: 120, height: 120 }}
                    />
                </ImageLoad>
                :
                <Image source={{ uri: image }}
                    style={{ width: 120, height: 120, borderRadius: 8 }} />

            }

        </ImageContainer>









    )
}
