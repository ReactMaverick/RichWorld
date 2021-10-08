import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
function MyAddress({ navigation }) {



  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>Privacy Policy</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>

        <View style={styles.card}>
          <View style={[styles.headerSection,{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
            <Text style={styles.headerTitle}>Billing Address</Text>
            <AntDesign name="enviromento" style={styles.downicon} />
          </View>
          <View style={styles.headerSection}>
          <Text style={styles.text1}>Bhavesh sharma</Text>
          <Text style={styles.text2}>987 test Address, 57 Road, TN, INDIA, 600033</Text>
          <Text style={styles.text2}>Mobile: (91) 9561459321</Text>
          </View>
          
          <Text style={styles.editText}>Edit Address</Text>
        </View>


        <View style={styles.card}>
          <View style={[styles.headerSection,{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
            <Text style={styles.headerTitle}>Shipping Address</Text>
            <AntDesign name="enviromento" style={styles.downicon} />
          </View>
          <View style={styles.headerSection}>
          <Text style={styles.text1}>Bhavesh sharma</Text>
          <Text style={styles.text2}>987 test Address, 57 Road, TN, INDIA, 600033</Text>
          <Text style={styles.text2}>Mobile: (91) 9561459321</Text>
          </View>
          
          <Text style={styles.editText}>Edit Address</Text>
        </View>

      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}


export default MyAddress;