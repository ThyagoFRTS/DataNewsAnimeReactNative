import React, { useState, useEffect } from 'react'
import {
    Alert,
    Image,
    ActivityIndicator
} from 'react-native';
import firebase, {storageRef} from '../../settings/firebase';
import * as ImagePicker from 'expo-image-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
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




export default ({ uri }) => {
    const cloudStorage = firebase.storage();
    const [image, setImage] = useState(null);
    const [isUpLoading, setUpLoading] = useState(false);
    const [profileUrl, setProfileUrl] = useState("");
    const [wasSeted, setWasSeted] = useState(false);
    
    console.log("========PROFILE PIC==========")
    //console.log("uri: getted "+ref)
    

    // useEffect(()=>{
    //     setProfileUrl(firebase.auth().currentUser.uid+".jpeg");
    //     async function fetchImage(){
    //         //const currentUser = firebase.auth().currentUser.uid+".jpeg";
    //         const ref = cloudStorage.ref(uri);
    //         console.log("this is uri")
    //         console.log(ref);



    //         // await ref.getDownloadURL().then(function(url) {
    //         //     // `url` is the download URL for 'images/stars.jpg'
              
    //         //     // This can be downloaded directly:
    //         //     var xhr = new XMLHttpRequest();
    //         //     xhr.responseType = 'blob';
    //         //     xhr.onload = function(event) {
    //         //       var blob = xhr.response;
    //         //     };
    //         //     xhr.open('GET', url);
    //         //     xhr.send();
                
    //         //     // Or inserted into an <img> element:
    //         //     if (!wasSeted) {
    //         //         setImage(url)
    
    //         //         setWasSeted(true);
    //         //     }
    //         //   }).catch(function(error) {
    //         //     // Handle any errors
    //         //   });

    //         // const response = await ref.getDownloadURL().then(url => {
    //         //     console.log("Dentro do then")
    //         //     console.log(url)
    //         //     if (!wasSeted) {
    //         //         setImage(url)
    
    //         //     }
    //         //     setWasSeted(true);
    //         // })
    //         // .catch(e => { console.log(e); });
    //     }
    //     fetchImage();
    // },[wasSeted])
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

            setImage(result.uri);
            setUpLoading(true);
            try {
                console.log("-------------------Result RUI-----------------")
                console.log(result.uri)
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
                const snapshot = await cloudStorage.ref(uri).put(blob, { contentType: "image/jpeg" });
                
                setUpLoading(false);
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
            {!wasSeted ?
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
