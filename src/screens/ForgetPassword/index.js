import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FORGET_PASSWORD } from '../../config/ApiConfig';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ForgetPassword({ navigation }) {

  const insets = useSafeAreaInsets();
  const [email_phone, setEmailPhone] = useState('')
  const [errorMsg, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)



  const _getOTP = async () => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if ((reg.test(email_phone) === false) && email_phone.length != 10) {
      setErrorMessage("Please Enter Valid Email/Phone");
    } else {


      const formData = new FormData();
      formData.append('email_phone', email_phone);
      fetch(FORGET_PASSWORD, {
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
            // console.log(JSON.stringify(response, null, " "));
            if (response.status == false) {
              setErrorMessage(response.message);
            } else {
              navigation.navigate('OtpScreenForgetPass', { response: response });
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
  }, [navigation]);

  return (
    <>
      <View style={styles.backGround}>
        {isLoading ? <ActivityIndicator size="large" color="#AB0000" /> : <></>}
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }} style={[styles.backIconOuter,{paddingTop: insets.top+10}]} >
            <AntDesign name="arrowleft" style={styles.backIcon} />
          </TouchableOpacity>
          <ImageBackground source={require('../../assets/Image/loginBackground.png')} style={styles.pagenameBackGround} >
            <Text style={styles.loginText}>Forget Password</Text>
          </ImageBackground>
          <View style={{ flex: 1, padding: 10, marginTop: 20 }}>
            <Text style={styles.errorMessage}>{errorMsg}</Text>
            <View style={(Platform.OS == "android") ? styles.textInputOuter : styles.textInputOuterIos}>
              <AntDesign name="mail" style={styles.inputicon} />
              <TextInput
                placeholder={'email / phone'}
                style={[styles.textInput]}
                value={email_phone}
                onChangeText={(email_phone) => setEmailPhone(email_phone)}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>
          </View>


          <TouchableOpacity style={styles.btnOuter} onPress={() => {
            _getOTP()
          }}>
            <Text style={styles.btnMessage}>Send OTP</Text>
          </TouchableOpacity>
        </ScrollView>


      </View>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Login');
      }} style={styles.footerPart}>
        <Text style={styles.footerText}>Sign In</Text>
      </TouchableOpacity>
    </>
  )

}


export default ForgetPassword;