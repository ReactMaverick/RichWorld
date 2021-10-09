import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput,ScrollView } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign'

function Login({ navigation }) {



  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <View style={styles.backGround}>

        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground source={require('../../assets/Image/loginBackground.png')} style={styles.pagenameBackGround} >
            <Text style={styles.loginText}>Sign In</Text>
          </ImageBackground>
          <View style={{ flex: 1, padding: 10, marginTop: 20 }}>

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
            <Text style={[styles.footerText, { alignSelf: 'center' }]}>Forgot password?</Text>

          </View>

        </ScrollView>

        <TouchableOpacity style={styles.btnOuter}>
        <AntDesign name="arrowright" style={styles.btnIcon} />
          <Text style={styles.btnMessage}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=>{
          navigation.navigate('Signup');
      }} style={styles.footerPart}>
        <Text style={styles.footerText}>Create Account</Text>
      </TouchableOpacity>
    </>
  )

}


export default Login;