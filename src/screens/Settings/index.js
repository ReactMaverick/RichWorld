import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
function Settings({ navigation }) {



  useEffect(() => {
  }, [navigation]);
  
  return (
    <>
    <Header navigation={navigation} />
    <View style={styles.filterBar}>
                <View style={styles.filterTextBox}>
                    <Text style={styles.CategoryText1}>Account </Text>
                    <Text  style={styles.CategoryText2}>Setting</Text>
                </View>
            
            </View>
      <ScrollView style={{ flex: 1 }}>
        
      <View style={styles.card}>
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
              placeholder={'Phone Number'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>

        <View style={styles.passChange}>
          <Text style={styles.passChangeText}>Password change</Text>
        </View>


        <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Current Password'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>

          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'New Password'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>


          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Confirm Password'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>

          <TouchableOpacity style={styles.btnOuter}>
            <Text style={styles.btnMessage}>Save Chnages</Text>
          </TouchableOpacity>
      </View>

      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}


export default Settings;