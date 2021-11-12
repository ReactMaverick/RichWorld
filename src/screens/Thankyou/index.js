import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, Modal } from 'react-native';
import ThankyouIcon from '../../assets/Image/Thankyou'
import styles from "./styles";
function Thankyou({ navigation }) {
  
  useEffect(() => {
  }, [navigation]);

  return (
    <>
       <View style={{ flex: 1 }}>
            
            <View style={{ flex: 1, padding: 20 }}>

                

                <View style={{ flex: 1, marginTop: 30, justifyContent:'center',alignItems:'center' }}>

              <ThankyouIcon width={80} height={80} color="#AB0000" />
                   <Text style={styles.thankyouText}>Thank you</Text>
                   <Text style={styles.thankyouText1}>Thankyou your order is confirmed</Text>
                   
                </View>
            </View>

            <TouchableOpacity  onPress={() => navigation.navigate('HomeScreen')} style={styles.enterBtn}>
                <Text style={styles.btnTxt}>Continue Purchase</Text>
            </TouchableOpacity>


        </View>

    </>
  )

}



export default Thankyou;