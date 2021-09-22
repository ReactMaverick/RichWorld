import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Myaccount({ navigation }) {



  useEffect(() => {
  }, [navigation]);
  
  return (
    <>
    <Header navigation={navigation} />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Myaccount</Text>
    </View>
    <Footer navigation={navigation} />
    </>
  )

}


export default Myaccount;