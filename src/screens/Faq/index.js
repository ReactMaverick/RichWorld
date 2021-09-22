import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import AccordionComponent from "../../components/AccordionComponent";

function Faq({ navigation }) {
 
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

  useEffect(() => {
  }, [navigation]);
  
  return (
    <>
    <Header navigation={navigation} />
    <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>Faq</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        
      <View style={styles.card}>
     
      <AccordionComponent item={SECTIONS}  />
      </View>

      </ScrollView>
    <Footer navigation={navigation} />
    </>
  )

}


export default Faq;