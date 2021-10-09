import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
function Signup({ navigation }) {



  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <View style={styles.backGround}>

        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground source={require('../../assets/Image/loginBackground.png')} style={styles.pagenameBackGround} >
            <Text style={styles.loginText}>Create Account</Text>
          </ImageBackground>
          <View style={{ flex: 1, padding: 10, marginTop: 20 }}>

          <View style={styles.textInputOuter}>
              <AntDesign name="user" style={styles.inputicon} />
              <TextInput
                placeholder={'Full Name'}
                style={[styles.textInput]}
              // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
              />
            </View>

            <View style={styles.textInputOuter}>
              <AntDesign name="mail" style={styles.inputicon} />
              <TextInput
                placeholder={'Enter Email ID'}
                style={[styles.textInput]}
              // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
              />
            </View>

            <View style={styles.textInputOuter}>
              <AntDesign name="lock" style={styles.inputicon} />
              <TextInput
                placeholder={'Password'}
                style={[styles.textInput]}
              // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
              />
            </View>
          
          </View>

        </ScrollView>

        <TouchableOpacity style={styles.btnOuter}>
          <AntDesign name="arrowright" style={styles.btnIcon} />
          <Text style={styles.btnMessage}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Login');
      }} style={styles.footerPart}>
        <Text style={styles.footerText}>Sign In</Text>
      </TouchableOpacity>
    </>
  )

}


export default Signup;