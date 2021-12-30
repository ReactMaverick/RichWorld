import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import HTMLView from 'react-native-htmlview';
import { GET_PRIVACY_POLICY } from '../../config/ApiConfig'
function PrivecyPolicy({ navigation }) {



  const [policy, setPolicy] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const _getData = async () => {
    setIsLoading(true)
    fetch(GET_PRIVACY_POLICY, {
      method: "GET",
    })
      .then((response) => {

        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {

        if (status == 200) {
          // console.log(status, response);
          setPolicy(response.privacyPolicyDetails.cms_text)
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
          <Text style={styles.CategoryText2}>Privacy Policy</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>

          <View style={styles.card}>

            <HTMLView
              value={policy}
              stylesheet={styles}
            />
          </View>

        </ScrollView>
        <Footer navigation={navigation} />
      </>
    )
  }

}


export default PrivecyPolicy;