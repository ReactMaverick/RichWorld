import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import HTMLView from 'react-native-htmlview';
import { GET_TERMS_CONDITIONS } from '../../config/ApiConfig'
function TermsCondition({ navigation }) {

  const [terms, setTerms] = useState()
  const _getData = async () => {
    fetch(GET_TERMS_CONDITIONS, {
      method: "GET",
    })
      .then((response) => {
      
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
     
        if (status == 200) {
          console.log(status, response);
          setTerms(response.termsDetails.cms_text)
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error",error))
      .finally(() => {
        
       });
  }


  useEffect(() => {
    _getData();
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>Terms & Conditions</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        
      <View style={styles.card}>

      <HTMLView
        value={terms}
        stylesheet={styles}
      />
      </View>

      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}


export default TermsCondition;