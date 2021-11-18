import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import Entypo from 'react-native-vector-icons/Entypo'
function ContactInfo({ navigation }) {



  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>Contact Info</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.card}>

          <View style={styles.itemOuter}>
            <View style={styles.itemLeft}>
              <Entypo name="location-pin" style={styles.itemIcon} />
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text1}>Our Address</Text>
              <Text style={styles.text2}>77 seventh Street, USA.</Text>
            </View>
          </View>

          <View style={styles.itemOuter}>
            <View style={styles.itemLeft}>
              <Entypo name="old-phone" style={styles.itemIcon} />
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text2}>716-298-1822</Text>
            </View>
          </View>

          <View style={styles.itemOuter}>
            <View style={styles.itemLeft}>
              <Entypo name="email" style={styles.itemIcon} />
            </View>
            <View style={styles.itemRight}>

              <Text style={styles.text2}>info@example.com</Text>
            </View>
          </View>

          <View style={[styles.itemOuter, { borderBottomColor: '#CCCCCC', borderBottomWidth: 1, paddingBottom: 10 }]}>
            <View style={styles.itemLeft}>
              <Entypo name="stopwatch" style={styles.itemIcon} />
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text1}>Openning Hour</Text>
              <Text style={styles.text2}>Monday - Friday. 9:00am - 5:00pm</Text>
            </View>
          </View>

          <Text style={styles.formTitle}>Get In Touch</Text>
          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Name'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>

          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Email'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>

          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Phone'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>

          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Subject'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>

          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Your Message'}
              style={[styles.textInput, { height: 100 }]}
              multiline={true}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>

          <TouchableOpacity style={styles.btnOuter}>
            <Text style={styles.btnMessage}>Send Message</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}


export default ContactInfo;