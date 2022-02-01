import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator, Modal, Platform } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import { POST_SIGNIN, POST_SOCIAL_LOGIN, POST_SOCIAL_OTP, POST_PROCESS_SOCIAL_LOGIN } from '../../config/ApiConfig'
import DeviceInfo from 'react-native-device-info';
import OTPTextInput from 'react-native-otp-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useSelector, useDispatch } from "react-redux";

import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';



GoogleSignin.configure({
  webClientId: '521633579635-41t9q2kkjoj0q0opptpve1b89gcp04bv.apps.googleusercontent.com',

});


function Login({ navigation }) {

  const dispatch = useDispatch();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordEye, setPasswordEye] = useState(true);
  const [errorMsg, setErrorMessage] = useState("")
  const [deviceToken, setDeviceToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otpModal, setOtpModal] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [socialId, setSocialId] = useState("");
  const [social, setSocial] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [socialOtp, setSocialOtp] = useState("");

  const [socialOtpCheck, setSocialOtpCheck] = useState(false);
  const [otpInput, setOtp] = useState("");
  const [fcmToken, setFcmToken] = useState("");


  const setUserData = (item) =>
    dispatch({
      type: "LOGINUSER",
      payload: {
        item
      },
    });


  const toggleOtpModal = () => {
    setOtpModal(!otpModal);
  };

  const _signIn = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (username == '') {
      setErrorMessage("Enter Email/Phone");
    } else if (password == '') {
      setErrorMessage("Enter Password");
    } else if ((reg.test(username) === false) && username.length != 10) {
      setErrorMessage("Please Enter Valid Email/Phone");
    } else {
      setIsLoading(true)
      const formData = new FormData();
      formData.append('user_name', username);
      formData.append('password', password);
      formData.append('session_id', deviceToken);
      formData.append('fcmToken', fcmToken);
      formData.append('device_os', Platform.OS);


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
              setUserData(response.userDetails[0])
              AsyncStorage.setItem('userData', JSON.stringify(response.userDetails[0])).then(() => {
                // navigation.navigate('HomeScreen');
                navigation.goBack()
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

  const _socialLogin = async (social_id, social, email, name) => {

    setIsLoading(true)
    const formData = new FormData();
    formData.append('social_id', social_id);
    formData.append('social', social);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('session_id', deviceToken);
    formData.append('fcmToken', fcmToken);
    formData.append('device_os', Platform.OS);



    fetch(POST_SOCIAL_LOGIN, {
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
        console.log(response);

        if (status == 200) {
          if (response.new_user == "Yes") {
            toggleOtpModal()
          } else {
            //add user details to localstorage
            setUserData(response.userDetails[0])
            AsyncStorage.setItem('userData', JSON.stringify(response.userDetails[0])).then(() => {
              // navigation.navigate('HomeScreen');
              navigation.goBack()
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

  const _socialOtpSend = async () => {

    setIsLoading(true)
    if (phoneNumber == '') {
      setErrorMessage("Enter Phone");
    } else {
      const formData = new FormData();
      formData.append('phone', phoneNumber);


      fetch(POST_SOCIAL_OTP, {
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
          console.log(response);

          if (status == 200) {
            if (response.status == true) {
              setSocialOtp(response.otp)
              toggleOtpModal()
              setSocialOtpCheck(true)
            } else {
              setErrorMessage(response.message);
            }

          } else {

            setErrorMessage(response.message);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false)
        });

    }
  }

  const checkOtp = () => {
    if (otpInput == "") {
      setErrorMessage("Please enter otp");
    } else if (otpInput != socialOtp) {
      setErrorMessage("Wrong otp");
    } else {
      setIsLoading(true)
      const formData = new FormData();

      formData.append('social_id', socialId);
      formData.append('social', social);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phoneNumber);
      formData.append('session_id', deviceToken);
      formData.append('fcmToken', fcmToken);
      formData.append('device_os', Platform.OS);



      fetch(POST_PROCESS_SOCIAL_LOGIN, {
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
            console.log(status, response);
            if (response.status == false) {
              setErrorMessage(response.message);
            } else {
              setUserData(response.userDetails[0])
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
      // console.log(userInfo);
      return userInfo;
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
    AsyncStorage.getItem('fcmToken').then((fcmToken) => {
      setFcmToken(fcmToken);
    })
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
            <View style={(Platform.OS == "android") ? styles.textInputOuter : styles.textInputOuterIos}>
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

            <View style={(Platform.OS == "android") ? styles.textInputOuter : styles.textInputOuterIos}>
              <AntDesign name="lock" style={styles.inputicon} />
              <TextInput
                placeholder={'Password'}
                style={styles.textInput}
                secureTextEntry={passwordEye}
                onChangeText={(password) => setPassword(password)}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
              <TouchableOpacity onPress={() => {
                setPasswordEye(!passwordEye); 
              }}>
                <Entypo name={passwordEye ? 'eye-with-line' : 'eye'} style={[styles.inputicon]} />
              </TouchableOpacity>
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
            <Text style={styles.btnMessage}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.socialLoginOuter}>
            <Text style={styles.socialLoginText}>Login with</Text>
            <TouchableOpacity onPress={() => {
              // navigation.navigate('HomeScreen');
              onFacebookButtonPress().then((result) => {
                // console.log('Signed in with Facebook!', result)
                _socialLogin(result.additionalUserInfo.profile.id, "facebook", result.additionalUserInfo.profile.email, result.user.displayName)
                setSocialId(result.additionalUserInfo.profile.id)
                setEmail(result.additionalUserInfo.profile.email)
                setName(result.user.displayName)
                setSocial("facebook")

              })
            }}>
              <Image source={require('../../assets/Image/fb.png')} style={{ width: 47, height: 47, marginLeft: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              onGoogleButtonPress().then((result) => {
                _socialLogin(result.user.id, "google", result.user.email, result.user.name)
                setSocialId(result.user.id)
                setEmail(result.user.email)
                setName(result.user.name)
                setSocial("google")
              })

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



      {/* social phone verification */}


      <Modal
        animationType="slide"
        transparent={true}
        visible={otpModal}
        onRequestClose={() => {
          setErrorMessage('')
          toggleOtpModal();
        }}
        style={{ marginVertical: Platform.OS == "android" ? 0 : 45, }}

      >
        <View style={styles.backGround}>

          <ScrollView showsVerticalScrollIndicator={false}>

            <ImageBackground source={require('../../assets/Image/loginBackground.png')} style={styles.pagenameBackGround} >
              <Text style={styles.loginText}>Verify</Text>
            </ImageBackground>

            <View style={{ flex: 1, padding: 10, marginTop: 20 }}>
              <Text style={styles.errorMessage}>{errorMsg}</Text>


              <View style={(Platform.OS == "android") ? styles.textInputOuter : styles.textInputOuterIos}>
                <FontAwesome name="phone" style={styles.inputicon} />
                <TextInput
                  placeholder={'Phone Number'}
                  style={[styles.textInput]}
                  value={phoneNumber}
                  keyboardType={'phone-pad'}
                  maxLength={10}
                  onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                  onFocus={() => {
                    setErrorMessage('')
                  }}
                />
              </View>

              <TouchableOpacity style={styles.btnOuter} onPress={() => {
                _socialOtpSend()
              }}>
                <Text style={styles.btnMessage}>Verify</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      </Modal>



      {/* Social otp check */}


      <Modal
        animationType="slide"
        transparent={true}
        visible={socialOtpCheck}
        onRequestClose={() => {
          setErrorMessage('')
          setSocialOtpCheck(!socialOtpCheck)
        }}
        style={{ marginVertical: Platform.OS == "android" ? 0 : 45, }}

      >
        <View style={styles.backGround}>

          <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground source={require('../../assets/Image/loginBackground.png')} style={styles.pagenameBackGround} >
              <Text style={styles.loginText}>OTP Verification</Text>
            </ImageBackground>
            <View style={{ flex: 1, padding: 10, marginTop: 20 }}>
              <Text style={styles.signupText1}>We have sent and OTP to your</Text>
              <Text style={styles.signupText2}>{phoneNumber}</Text>

              <Text style={styles.errorMessage}>{errorMsg}</Text>

              <View style={styles.otpBoxOuter}>
                <OTPTextInput textInputStyle={styles.otpBoxStyle} handleTextChange={(otpInput) => setOtp(otpInput)} />
              </View>





              <TouchableOpacity style={styles.btnOuter} onPress={() => {
                checkOtp()
              }}>
                <Text style={styles.btnMessage}>Submit</Text>
              </TouchableOpacity>
            </View>





          </ScrollView>

        </View>
      </Modal>



    </>
  )

}


export default Login;