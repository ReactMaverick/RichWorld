import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import OTPTextInput from 'react-native-otp-textinput';

function OtpScreen({ navigation }) {

  useEffect(() => {

  }, []);

  return (
    <>
      <View style={styles.backGround}>

        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground source={require('../../assets/Image/loginBackground.png')} style={styles.pagenameBackGround} >
            <Text style={styles.loginText}>OTP Verification</Text>
          </ImageBackground>
          <View style={{ flex: 1, padding: 10, marginTop: 20 }}>
            <Text style={styles.signupText1}>We have sent and OTP to your</Text>
            <Text style={styles.signupText2}>+91972877653</Text>

            <View style={styles.otpBoxOuter}>
              <OTPTextInput textInputStyle={styles.otpBoxStyle} handleTextChange={(otpInput) => setOtp(otpInput)} />
            </View>


            <TouchableOpacity style={styles.resendButton}>
              <Text style={styles.resendButtonText}>Resend Otp</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.btnOuter} onPress={() => {
              navigation.navigate('HomeScreen');
            }}>
              <AntDesign name="arrowright" style={styles.btnIcon} />
              <Text style={styles.btnMessage}>Submit</Text>
            </TouchableOpacity>
          </View>





        </ScrollView>


      </View>

    </>
  )

}


export default OtpScreen;