import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput,ScrollView,Image } from 'react-native';
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


          <TouchableOpacity style={styles.btnOuter} onPress={()=>{            
            navigation.navigate('OtpScreen');
          }}>
        <AntDesign name="arrowright" style={styles.btnIcon} />
          <Text style={styles.btnMessage}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.socialLoginOuter}>
          <Text style={styles.socialLoginText}>Login with</Text> 
          <TouchableOpacity onPress={()=>{            
            navigation.navigate('HomeScreen');
          }}>
          <Image source={require('../../assets/Image/fb.png')} style={{width:47, height:47,marginLeft:10}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{            
            navigation.navigate('HomeScreen');
          }}>
          <Image source={require('../../assets/Image/google+.png')} style={{width:50, height:50,marginLeft:10}}/>
          </TouchableOpacity>
        </View>

        </ScrollView>

        
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