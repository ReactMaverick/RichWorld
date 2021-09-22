import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import HTMLView from 'react-native-htmlview';
function TermsCondition({ navigation }) {

 

  useEffect(() => {
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
        value={'Vivamus a lectus feugiat, feugiat ex ac, mollis massa. Duis malesuada efficitur sapien, eu blandit risus pharetra eget. Nunc elementum tellus ligula, at vestibulum lorem auctor vel. Pellentesque volutpat tempus imperdiet. Aenean ut malesuada augue. In commodo vitae felis eu ornare.'}
        stylesheet={styles}
      />
      </View>

      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}


export default TermsCondition;