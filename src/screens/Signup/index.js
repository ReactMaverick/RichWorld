import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView,ActivityIndicator } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { POST_SIGNUP } from '../../config/ApiConfig'
function Signup({ navigation }) {

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const checkSignup = () => {

    if (fullName == "") {
      setErrorMessage("Please enter full name");
    } else if (email == "") {
      setErrorMessage("Please enter email");
    } else if (phoneNumber == "") {
      setErrorMessage("Please enter phone number");
    } else if (password == "") {
      setErrorMessage("Please enter phone password");
    } else {
      setIsLoading(true)
      const formData = new FormData();

      formData.append('fullname', fullName);
      formData.append('phone', phoneNumber);
      formData.append('email', email);
      formData.append('password', password);

      fetch(POST_SIGNUP, {
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
            console.log(status,response);
            if(response.status==false){
              setErrorMessage(response.message);
            }else{
              navigation.navigate('OtpScreen',{response:response});
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
      {isLoading?<ActivityIndicator size="large" color="#AB0000" />:<></>}   
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground source={require('../../assets/Image/loginBackground.png')} style={styles.pagenameBackGround} >
            <Text style={styles.loginText}>Create Account</Text>
          </ImageBackground>
          <View style={{ flex: 1, padding: 10, marginTop: 20 }}>
            <Text style={styles.errorMessage}>{errorMsg}</Text>

            <View style={styles.textInputOuter}>
              <AntDesign name="user" style={styles.inputicon} />
              <TextInput
                placeholder={'Full Name'}
                style={[styles.textInput]}
                onChangeText={(fullName) => setFullName(fullName)}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>

            <View style={styles.textInputOuter}>
              <AntDesign name="mail" style={styles.inputicon} />
              <TextInput
                placeholder={'Enter Email ID'}
                style={[styles.textInput]}
                keyboardType={'email-address'}
                onChangeText={(email) => setEmail(email)}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>

            <View style={styles.textInputOuter}>

              <FontAwesome name="phone" style={styles.inputicon} />
              <TextInput
                placeholder={'Phone Number'}
                style={[styles.textInput]}
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                keyboardType={'phone-pad'}
                maxLength={10}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>

            <View style={styles.textInputOuter}>
              <AntDesign name="lock" style={styles.inputicon} />
              <TextInput
                placeholder={'Password'}
                style={[styles.textInput]}
                onChangeText={(password) => setPassword(password)}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>

            <TouchableOpacity style={styles.btnOuter} onPress={() => {
              
              checkSignup()
            }}>
              <AntDesign name="arrowright" style={styles.btnIcon} />
              <Text style={styles.btnMessage}>Create Account</Text>
            </TouchableOpacity>

          </View>

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


export default Signup;