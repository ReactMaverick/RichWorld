import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Platform } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { POST_SIGNUP } from '../../config/ApiConfig'
import { useValidation } from 'react-native-form-validator';
function Signup({ navigation }) {

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { validate, isFieldInError, getErrorsInField, getErrorMessages, isFormValid } =
    useValidation({
      state: { fullName, email, phoneNumber, password },
    });

  const checkFields = () => {
    validate({
      fullName: { minlength: 3, maxlength: 7, required: true },
      email: { email: true, required: true },
      phoneNumber: { numbers: true, minlength: 10, maxlength: 10, required: true },
      password: { required: true },
    });
    if(isFormValid()){
      checkSignup()
    }
  }
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
      console.log(JSON.stringify(formData, null, " "));
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
        setIsLoading(false)
    }
  }


  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <View style={styles.backGround}>
        {isLoading ? <ActivityIndicator size="large" color="#AB0000" /> : <></>}
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground source={require('../../assets/Image/loginBackground.png')} style={styles.pagenameBackGround} >
            <Text style={styles.loginText}>Create Account</Text>
          </ImageBackground>
          <View style={{ flex: 1, marginHorizontal:10 }}>
            

            <Text style={styles.errorMessage}>{errorMsg}</Text>

            <View style={(Platform.OS == "android") ? styles.textInputOuter : styles.textInputOuterIos}>
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
            {isFieldInError('fullName') &&
              <Text style={styles.bottomErrorMessage}>{getErrorsInField('fullName')[0]}</Text>
              }

            <View style={(Platform.OS == "android") ? styles.textInputOuter : styles.textInputOuterIos}>
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
            {isFieldInError('email') &&
              <Text style={styles.bottomErrorMessage}>{getErrorsInField('email')[0]}</Text>}



            <View style={(Platform.OS == "android") ? styles.textInputOuter : styles.textInputOuterIos}>

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
            {isFieldInError('phoneNumber') &&
              <Text style={styles.bottomErrorMessage}>{getErrorsInField('phoneNumber')[0]}</Text>}

            <View style={(Platform.OS == "android") ? styles.textInputOuter : styles.textInputOuterIos}>
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
            {isFieldInError('password') &&
             <Text style={styles.bottomErrorMessage}>{getErrorsInField('password')[0]}</Text>}

            <TouchableOpacity style={styles.btnOuter} onPress={() => {

              checkFields()
            }}>
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