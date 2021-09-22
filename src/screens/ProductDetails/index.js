import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import HTMLView from 'react-native-htmlview';
function ProductDetails({ navigation }) {



  useEffect(() => {
  }, [navigation]);
  
  return (
    <>
     <Header navigation={navigation} />
     <View style={styles.filterBar}>
                <View style={styles.filterTextBox}>
                    <Text style={styles.CategoryText1}>Sport </Text>
                    <Text  style={styles.CategoryText2}>Socks</Text>
                </View>
           
            </View>
      <ScrollView style={{ flex: 1 }}>
        
      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}


export default ProductDetails; 