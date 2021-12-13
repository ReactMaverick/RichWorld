import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { POST_SIGNIN } from '../../config/ApiConfig'
import DeviceInfo from 'react-native-device-info';

import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: '521633579635-41t9q2kkjoj0q0opptpve1b89gcp04bv.apps.googleusercontent.com',

});


function Login({ navigation }) {


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMessage] = useState("")
  const [deviceToken, setDeviceToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)



  const _signIn = async () => {

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

          if (status == 200) {
            if (response.status == false) {
              setErrorMessage(response.message);
            } else {
              setUsername();
              setPassword();
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


  const onFacebookButtonPress = async () => {

    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);


    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      //this.setState({ userInfo });
    } catch (error) {
      console.log(error.code, error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
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
        {isLoading ? <ActivityIndicator size="large" color="#AB0000" /> : <></>}
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
            <TouchableOpacity onPress={() => {
              navigation.navigate('ForgetPassword');
            }}>
              <Text style={[styles.footerText, { alignSelf: 'center' }]}>Forgot password?</Text>
            </TouchableOpacity>

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
              // navigation.navigate('HomeScreen');
              onFacebookButtonPress().then((result) => {
                console.log('Signed in with Facebook!', result)
              })
            }}>
              <Image source={require('../../assets/Image/fb.png')} style={{ width: 47, height: 47, marginLeft: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              onGoogleButtonPress()

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