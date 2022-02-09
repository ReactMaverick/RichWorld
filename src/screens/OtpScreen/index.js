import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import OTPTextInput from 'react-native-otp-textinput';
import { POST_PROCESS_SIGNUP } from '../../config/ApiConfig'

import AsyncStorage from '@react-native-async-storage/async-storage';

function OtpScreen({ navigation, route }) {
  const { response } = route.params;
  const [otpInput, setOtp] = useState("");
  const [errorMsg, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const checkOtp = () => {
    if (otpInput == "") {
      setErrorMessage("Please enter otp");
    } else if (otpInput != response.signUpData.otp) {
      setErrorMessage("Wrong otp");
    } else {
      setIsLoading(true)
      const formData = new FormData();

      formData.append('fullname', response.signUpData.fullname);
      formData.append('phone', response.signUpData.phone);
      formData.append('email', response.signUpData.emailaddress);
      formData.append('password', response.signUpData.password);

      fetch(POST_PROCESS_SIGNUP, {
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
            //console.log(status,response.userDetails[0]);
            if (response.status == false) {
              setErrorMessage(response.message);
            } else {
              AsyncStorage.setItem('userData', JSON.stringify(response.userDetails[0])).then(() => {
                navigation.navigate('HomeScreen');
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
            <Text style={styles.signupText2}>{response.signUpData.phone}</Text>

            <Text style={styles.errorMessage}>{errorMsg}</Text>

            <View style={styles.otpBoxOuter}>
              <OTPTextInput textInputStyle={styles.otpBoxStyle} handleTextChange={(otpInput) => setOtp(otpInput)} />
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


export default OtpScreen;