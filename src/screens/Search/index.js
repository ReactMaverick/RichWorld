import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import styles from "./styles";

import Voice from '@react-native-community/voice';

function Search({ navigation }) {

  const [tab, setTab] = useState(1);
  const [result, setResult] = useState('')

  useEffect(() => {

    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }

  }, [navigation]);


  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e)
  }
  const onSpeechEndHandler = (e) => {
   // setLoading(false)
    console.log("stop handler", e)
  }

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0]
    setResult(text)
    console.log("speech result handler", e)
  }

  const startRecording = async () => {
   // setLoading(true)
    try {
      await Voice.start('en-Us')
    } catch (error) {
      console.log("error raised", error)
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop()
    } catch (error) {
      console.log("error raised", error)
    }
  }

  return (
    <>

      <View style={styles.searchSection}>
        <AntDesign name="search1" style={styles.searchIcon} />
        <TextInput 
        style={styles.searchSectionText} 
        autoFocus={true} 
        placeholder="Search your products, brands...."
        onChangeText={(result) => setResult(result)}
        />
        <TouchableOpacity style={styles.searchBoxAudio}
          onPressIn={() => {
            startRecording()
          }}
          onPressOut={() => {
            stopRecording()
          }}
        >
          <Feather name="mic" style={styles.menuIconMic} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchMainSection}>


        <View style={styles.searchResult}>
          <View>
            <Image source={require('../../assets/Image/ProductImg.png')} style={styles.searchImage} />
          </View>
          <View>
            <Text style={styles.searchResultText}>Lorem Ipsum has been the industry's </Text>
            <Text style={styles.searchResultTextCat}>Lorem Ipsum </Text>
          </View>
        </View>

        <View style={styles.searchResult}>
          <View>
            <Image source={require('../../assets/Image/ProductImg.png')} style={styles.searchImage} />
          </View>
          <View>
            <Text style={styles.searchResultText}>Lorem Ipsum has been the industry's </Text>
            <Text style={styles.searchResultTextCat}>Lorem Ipsum </Text>
          </View>
        </View>

        <View style={styles.searchResult}>
          <View>
            <Image source={require('../../assets/Image/ProductImg.png')} style={styles.searchImage} />
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