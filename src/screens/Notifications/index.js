import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
function Notifications({ navigation }) {



  useEffect(() => {
  }, [navigation]);
  
  return (
    <>
    <Header navigation={navigation} />
    <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>Notifications</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        
        <View style={styles.notificationOuter}>
          <Text style={styles.orderTitle}>Order Title</Text>
          <Text style={styles.orderDescription}>In pretium luctus lorem vel blandit. Donec mollis diam id </Text>
          <Text style={styles.orderDate}>Jan 12,2021</Text>
        </View>

        <View style={styles.notificationOuter}>
          <Text style={styles.orderTitle}>Order Title</Text>
          <Text style={styles.orderDescription}>In pretium luctus lorem vel blandit. Donec mollis diam id </Text>
          <Text style={styles.orderDate}>Jan 12,2021</Text>
        </View>


        <View style={styles.notificationOuter}>
          <Text style={styles.orderTitle}>Order Title</Text>
          <Text style={styles.orderDescription}>In pretium luctus lorem vel blandit. Donec mollis diam id </Text>
          <Text style={styles.orderDate}>Jan 12,2021</Text>
        </View>


        <View style={styles.notificationOuter}>
          <Text style={styles.orderTitle}>Order Title</Text>
          <Text style={styles.orderDescription}>In pretium luctus lorem vel blandit. Donec mollis diam id </Text>
          <Text style={styles.orderDate}>Jan 12,2021</Text>
        </View>

      </ScrollView>
    <Footer navigation={navigation} />
    </>
  )

}


export default Notifications;