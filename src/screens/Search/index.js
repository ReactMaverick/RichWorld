import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import styles from "./styles";
import { SEARCH_SUGGESSION } from '../../config/ApiConfig'
import Voice from '@react-native-community/voice';
import ActionSheet from "react-native-actions-sheet";
const actionSheetRef = createRef();

function Search({ navigation, route }) {
  const { text } = route.params;
  const [tab, setTab] = useState(1);
  const [result, setResult] = useState('')
  const [products, setProducts] = useState([])
  const [tagvalue, setTagvalue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    _search_suggession(text)
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }

  }, [navigation]);

  const _search_suggession = async (result_text) => {
    setResult(result_text)
    if (result_text.length >= 3) {
      console.log(result_text);
      fetch(SEARCH_SUGGESSION + result_text.toLowerCase(), {
        method: "get"
      })
        .then((response) => {
          const statusCode = response.status;
          const data = response.json();
          return Promise.all([statusCode, data]);
        })
        .then(([status, response]) => {
          if (status == 200) {
            if (response.tagvalue.length > 0) {
              setTagvalue(response.tagvalue);
              setProducts([]);
            } else {
              setTagvalue('');
              setProducts(response.product);
            }
          } else {
            console.log(status, response);
          }
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setIsLoading(false)

        });
    } else {
      setProducts([]);
    }

  }
  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e)
    // actionSheetRef.current?.setModalVisible();
  }
  const onSpeechEndHandler = (e) => {
    console.log("stop handler", e)
    actionSheetRef.current?.setModalVisible();
  }

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0]
    setResult(text)
    _search_suggession(text)
    console.log("speech result handler", e)
    actionSheetRef.current?.setModalVisible();
  }

  const startRecording = async () => {
    // setLoading(true)
    try {
      actionSheetRef.current?.setModalVisible();
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
          value={result}
          onChangeText={(result) => _search_suggession(result)}
        />
        <TouchableOpacity style={styles.searchBoxAudio}
          onPress={() => {
            startRecording()
          }}
        // onPressIn={() => {
        //   startRecording()
        // }}
        // onPressOut={() => {
        //   stopRecording()
        // }}
        >
          <Feather name="mic" style={styles.menuIconMic} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchMainSection}>
        {tagvalue.length > 0 ?
          < TouchableOpacity onPress={() => {
            navigation.navigate('ProductList', { title1: tagvalue, title2: "", filterParam: { 'search': tagvalue } })
          }} style={styles.searchResult} >

            <View>
              <Text style={styles.searchResultText}>{tagvalue} </Text>
            </View>
          </TouchableOpacity>
          :
          products.map((item, key) => (
            <TouchableOpacity onPress={() => {
              navigation.navigate('ProductDetails', { products_id: item.products_id, products_attributes_prices_id: item.products_attributes_prices_id })
            }} style={styles.searchResult} key={key} >
              <View>
                <Image source={{ uri: item.image_path }} style={styles.searchImage} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.searchResultText}>{item.products_name} </Text>
                <Text style={styles.searchResultTextCat}>{item.categories_name} </Text>
              </View>
            </TouchableOpacity>
          ))
        }

        <ActionSheet ref={actionSheetRef}>
          <View style={styles.listening}>
            <Text style={{ fontSize: 20 }}>Listening...</Text>
          </View>
        </ActionSheet>

      </View>
    </>
  )

}


export default Search;