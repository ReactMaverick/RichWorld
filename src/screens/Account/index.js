import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import HTMLView from 'react-native-htmlview';
import { BKColor } from "../../common/BKColor";

function Account({ navigation }) {



  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>My Account</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>

        <View style={styles.card}>
          <Text style={styles.cartText}>Product counts</Text>
          <Text style={styles.cartText}>22</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cartText}>Product in cart</Text>
          <Text style={styles.cartText}>10</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cartText}>Total payed amount</Text>
          <Text style={styles.cartText}>Rs.1810</Text>
        </View>

        <View style={{margin:10}}>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.text1}>Hi, </Text><Text style={[styles.text1,{color:BKColor.btnBackgroundColor1}]}>Bhuvanesh Sharma </Text>
          </View>
          
          <HTMLView
            value={'From your account dashboard. you can easily check & view your recent orders, manage your shipping and billing addresses and edit your password and account details.'}
            stylesheet={styles}
          />
        </View>

      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}


export default Account;