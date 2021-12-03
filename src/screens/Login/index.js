import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, Image,ActivityIndicator } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { POST_SIGNIN } from '../../config/ApiConfig'
import DeviceInfo from 'react-native-device-info';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMessage] = useState("")
  const [deviceToken, setDeviceToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  


  const _signIn = () => {
    
    if (username == '') {
      setErrorMessage("Enter Email/Phone");
    } else if (password == '') {
      setErrorMessage("Enter Password");
    } else {
      setIsLoading(true)
      const formData = new FormData();
      formData.append('user_name', username);
      formData.append('password', password);
      formData.append('session_id', deviceToken);



      fetch(POST_SIGNIN, {
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      })
        .then((response) => {

          const statusCode = response.status;
          const data = response.json();
          return Promise.all([statusCode, data]);
        })
        .then(([status, response]) => {
           // console.log(response);
          setUsername();
          setPassword();
          if (status == 200) {
            if(response.status==false){
              setErrorMessage(response.message);
            }else{
              AsyncStorage.setItem('userData', JSON.stringify(response.userDetails[0])).then(() => {
                navigation.navigate('HomeScreen');
              })
            }
            
          } else {
            if (response.error != undefined) {

              setErrorMessage(response.error);
            }

          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false)
        });

    }
  }
  useEffect(() => {
    DeviceInfo.getAndroidId().then((androidId) => {
      setDeviceToken(androidId);
    
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.backGround}>    
      {isLoading?<ActivityIndicator size="large" color="#AB0000" />:<></>}         
        <ScrollView showsVerticalScrollIndicator={false}>
      
          <ImageBackground source={require('../../assets/Image/loginBackground.png')} style={styles.pagenameBackGround} >
            <Text style={styles.loginText}>Sign In</Text>
          </ImageBackground>
          <View style={{ flex: 1, padding: 10, marginTop: 20 }}>
            <Text style={styles.errorMessage}>{errorMsg}</Text>
            <View style={styles.textInputOuter}>
              <AntDesign name="mail" style={styles.inputicon} />
              <TextInput
                placeholder={'Username'}
                style={[styles.textInput]}
                onChangeText={(username) => setUsername(username)}
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
            <Text style={[styles.footerText, { alignSelf: 'center' }]}>Forgot password?</Text>

          </View>


          <TouchableOpacity style={styles.btnOuter} onPress={() => {
            _signIn()
          }}>
            <AntDesign name="arrowright" style={styles.btnIcon} />
            <Text style={styles.btnMessage}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.socialLoginOuter}>
            <Text style={styles.socialLoginText}>Login with</Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('HomeScreen');
            }}>
              <Image source={require('../../assets/Image/fb.png')} style={{ width: 47, height: 47, marginLeft: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate('HomeScreen');
            }}>
              <Image source={require('../../assets/Image/google+.png')} style={{ width: 50, height: 50, marginLeft: 10 }} />
            </TouchableOpacity>
          </View>

        </ScrollView>


      </View>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Signup');
      }} style={styles.footerPart}>
        <Text style={styles.footerText}>Create Account</Text>
      </TouchableOpacity>
    </>
  )

}


export default Login;