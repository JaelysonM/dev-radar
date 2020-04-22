import React, {useState,useEFfect, useEffect} from 'react';
import {StyleSheet,Image,View,Text, TextInput,TouchableOpacity, Keyboard} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';


import {MaterialIcons} from '@expo/vector-icons';
export default function Main( {navigation}) {
   const [currentRegion,setCurrentRegion] = useState(null);
   useEffect(() => {
      async function loadPosition() {
     const {granted}  =await requestPermissionsAsync();

     if (granted) {
       const {coords} =await  getCurrentPositionAsync({
         enableHighAccuracy: true,
       });

       const {latitude, longitude} = coords;

       setCurrentRegion({
       latitude,
       longitude,
       latitudeDelta: 0.04,
       longitudeDelta: 0.04   
       });
       }
      }
      loadPosition();
  }, []);
  if (!currentRegion)  {
    return null;
  }
  return (

    <>
  <MapView initialRegion={currentRegion} style={styles.map}>
   <Marker coordinate={{latitude:-3.8048964, longitude:-38.4951963}}>
   <Image style={styles.avatar} source={{ uri: "https://avatars1.githubusercontent.com/u/54239323?s=460&v=4"}}></Image> 
   <Callout onPress= {() => {
     navigation.navigate('Profile', {github_username: "JaelysonM"});
   }}>
     <View style={styles.callout}>
       <Text style={styles.devName}>Jaelyson Martins</Text>
       <Text style={styles.devBio}>Um adorador da programação aprendendo novas linguagens e aperfeiçoando as já conhecidas; e um desenvolvedor com 5 anos de carreira quaseee full-stack.</Text>
       <Text style={styles.devTechs}>ReactJS</Text>
     </View>
   </Callout>
   </Marker>
  </MapView>
   <View style={styles.searchForm}>
    <TextInput
    style={styles.searchInput}
    placeholder="Buscar devs por tecnologias..."
    placeholderTextColor="#999"
    autoCapitalize="words"
    autoCorrect={false}
    />
    <TouchableOpacity onPress={()=>{}}style={styles.loadButton}>
        <MaterialIcons  name="my-location" size={20} color="#FFF"/>
    </TouchableOpacity>


   </View>
  </>

   

  )
}
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius:4,
    borderWidth: 4,
    borderColor: '#FFF'
  },

  callout: {
   width: 260
  },
  devName: {
  marginLeft: 8,
   marginTop: 5,
   fontWeight: 'bold',
   fontSize: 16
  },
  devBio: {
    marginLeft: 4,
    color: "#666",
    marginTop: 5,
  },
  devTechs: {
    marginLeft: 4,
   marginTop: 5,
  },
  searchForm: {
    position: "absolute",
    top: 20,
    left:20,
    right:20,
    zIndex: 5,
    flexDirection:"row"
  },
  searchInput: {
    flex:1,
    height: 50,
    backgroundColor: "#FFF",
    color: "#333",
    borderRadius:25,
    paddingHorizontal: 20,
    fontSize:16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: "#8e4dff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,

  } 
});