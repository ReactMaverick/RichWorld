import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import HTMLView from 'react-native-htmlview';
import { GET_TERMS_CONDITIONS } from '../../config/ApiConfig'
function TermsCondition({ navigation }) {

  const [terms, setTerms] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const _getData = async () => {
    setIsLoading(true)
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
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }


  useEffect(() => {
    _getData();
  }, [navigation]);
  if (isLoading) {
    return (
      <>
        <Header navigation={navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#620000" />
        </View>
      </>
    )
  } else {
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

}


export default TermsCondition;