import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import OTPTextInput from 'react-native-otp-textinput';
import { UPDATE_PHONE_EMAIL } from '../../config/ApiConfig'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";

function OtpVerification({ navigation, route }) {
  const { id, otp, email, phone } = route.params;
  console.log("otp",otp);
  const [otpInput, setOtpInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");
  const _showMessage = (message) => {
    showMessage({
      message: message,
      type: "info",
      backgroundColor: "#808080",
    });
  }
  const checkOtp = () => {
    if (otpInput == "") {
      setErrorMsg("Please enter otp");
    } else if (otpInput != otp.toString()) {
      setErrorMsg("Wrong otp");
    } else {
      setIsLoading(true)
      const formData = new FormData();
      formData.append('user_id', id);
      formData.append('phone', phone);
      formData.append('email', email);

      fetch(UPDATE_PHONE_EMAIL, {
        method: "POST",
        body: formData
      })
        .then((response) => {

          const statusCode = response.status;
          const data = response.json();
          return Promise.all([statusCode, data]);
        })
        .then(([status, response]) => {

          if (status == 200) {
            // console.log(status,response);
            if (response.status == false) {
              setOtpInput("")
              _showMessage(response.message);
            } else {
              setOtpInput("")
              AsyncStorage.setItem('userData', JSON.stringify(response.userDetails[0])).then(() => {
                _showMessage(response.message);
                navigation.navigate('Settings');
              })
            }
          } else {
            console.log(status, response);
          }
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setIsLoading(false)
        });

    }
  }
  useEffect(() => {

  }, []);
  if (isLoading) {
    return (
      <>
        <Header navigation={navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#620000" />
        </View>
      </>
    )
  } else {
  return (
    <>
      <View style={styles.backGround}>
        {isLoading ? <ActivityIndicator size="large" color="#AB0000" /> : <></>}
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }} style={styles.backIconOuter} >
            <AntDesign name="arrowleft" style={styles.backIcon} />
          </TouchableOpacity>
          <ImageBackground source={require('../../assets/Image/loginBackground.png')} style={styles.pagenameBackGround} >
            <Text style={styles.loginText}>OTP Verification</Text>
          </ImageBackground>
          <View style={{ flex: 1, padding: 10, marginTop: 20 }}>
            <Text style={styles.signupText1}>We have sent and OTP to your</Text>
            <Text style={styles.signupText2}>{phone != "" ? phone : email}</Text>

            <Text style={styles.errorMessage}>{errorMsg}</Text>

            <View style={styles.otpBoxOuter}>
              <OTPTextInput textInputStyle={styles.otpBoxStyle} handleTextChange={(otpInput) => {
                setErrorMsg("")
                setOtpInput(otpInput)
                }} />
            </View>
            {/*
              <TouchableOpacity style={styles.resendButton}>
                <Text style={styles.resendButtonText}>Resend Otp</Text>
              </TouchableOpacity>
            */}

            <TouchableOpacity style={styles.btnOuter} onPress={() => {
              checkOtp()
            }}>
              <Text style={styles.btnMessage}>Submit</Text>
            </TouchableOpacity>
          </View>





        </ScrollView>


      </View>

    </>
  )
          }

}


export default OtpVerification;