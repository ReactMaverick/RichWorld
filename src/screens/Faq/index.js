import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import { FAQ } from '../../config/ApiConfig';
import AccordionComponent from "../../components/AccordionComponent";

function Faq({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [faqList, setFaqList] = useState([]);

const SECTIONS = [
  {
    title: 'Registration',
    content: 'When you place an order, we collect and sometimes store basic information such as your name, email and delivery address(es), a contact telephone number and your user name and password. We may also receive and store certain information automatically from your computer, such as your IP address, browser type and other computer and connection information, the time that you logged on',
  },
  {
    title: 'Payment',
    content: 'Lorem ipsum...',
  },
];

const _getFaqs = async () => {

  fetch(FAQ, {
    method: "get",
  })
    .then((response) => {

      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(([status, response]) => {
      if (status == 200) {
        console.log(response.faq_list)
        // console.log(JSON.stringify(response.faq_list, null, " "));
        setFaqList(response.faq_list);
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
    _getFaqs()
  }, [navigation]);
  
  return (
    <>
    <Header navigation={navigation} />
    <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>Faq</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        
      <View style={styles.card}>
     
      <AccordionComponent item={faqList}  />
      </View>

      </ScrollView>
    <Footer navigation={navigation} />
    </>
  )

}


export default Faq;