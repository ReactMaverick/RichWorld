import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import styles from "./styles";
function Search({ navigation }) {

  const [tab, setTab] = useState(1);

  useEffect(() => {
  }, [navigation]);

  return (
    <>
      
      <View style={styles.searchSection}>
        <AntDesign name="search1" style={styles.searchIcon} />
        <TextInput style={styles.searchSectionText} autoFocus={true} placeholder="Search your products, brands...."></TextInput>
        <TouchableOpacity style={styles.searchBoxAudio}>
          <Feather name="mic" style={styles.menuIconMic} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchMainSection}>


      <View style={styles.searchResult}>
        <View>
        <Image source ={require('../../assets/Image/ProductImg.png')} style={styles.searchImage} />
        </View>
        <View>
          <Text style={styles.searchResultText}>Lorem Ipsum has been the industry's </Text>
          <Text style={styles.searchResultTextCat}>Lorem Ipsum </Text>
        </View>
      </View>

      <View style={styles.searchResult}>
        <View>
        <Image source ={require('../../assets/Image/ProductImg.png')} style={styles.searchImage} />
        </View>
        <View>
          <Text style={styles.searchResultText}>Lorem Ipsum has been the industry's </Text>
          <Text style={styles.searchResultTextCat}>Lorem Ipsum </Text>
        </View>
      </View>

      <View style={styles.searchResult}>
        <View>
        <Image source ={require('../../assets/Image/ProductImg.png')} style={styles.searchImage} />
        </View>
        <View>
          <Text style={styles.searchResultText}>Lorem Ipsum has been the industry's </Text>
          <Text style={styles.searchResultTextCat}>Lorem Ipsum </Text>
        </View>
      </View>


      </View>
    </>
  )

}


export default Search;