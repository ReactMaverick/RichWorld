import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Platform, Image, Modal } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { POST_SIGNUP, POST_SOCIAL_LOGIN, POST_SOCIAL_OTP, POST_PROCESS_SOCIAL_LOGIN } from '../../config/ApiConfig'
// import { useValidation } from 'react-native-form-validator';
import DeviceInfo from 'react-native-device-info';
import OTPTextInput from 'react-native-otp-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch } from "react-redux";
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Signup({ navigation }) {
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [deviceToken, setDeviceToken] = useState("")
  const [socialPhoneNumber, setSocialPhoneNumber] = useState("");
  const [socialId, setSocialId] = useState("");
  const [social, setSocial] = useState("");
  const [socialEmail, setSocialEmail] = useState("");
  const [name, setName] = useState("");
  const [socialOtp, setSocialOtp] = useState("");

  const [otpModal, setOtpModal] = useState(false);
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
  // const { validate, isFieldInError, getErrorsInField, getErrorMessages, isFormValid } =
  //   useValidation({
  //     state: { fullName, email, phoneNumber, password },
  //   });

  // const checkFields = () => {
  //   validate({
  //     fullName: { minlength: 3, maxlength: 7, required: true },
  //     email: { email: true, required: true },
  //     phoneNumber: { numbers: true, minlength: 10, maxlength: 10, required: true },
  //     password: { required: true },
  //   });
  //   if(isFormValid()){
  //     checkSignup()
  //   }
  // }
  const checkSignup = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (fullName == "") {
      setErrorMessage("Please enter full name");
    } else if (email == "") {
      setErrorMessage("Please enter email");
    } else if ((reg.test(email) === false)) {
      setErrorMessage("Please enter valid email");
    } else if (phoneNumber == "") {
      setErrorMessage("Please enter phone number");
    } else if (phoneNumber.length != 10) {
      setErrorMessage("Please enter valid phone number");
    } else if (password == "") {
      setErrorMessage("Please enter phone password");
    } else if (password.length < 8) {
      setErrorMessage("Password must be 8 character long");
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
            console.log(status, response);
            if (response.status == false) {
              setErrorMessage(response.message);
            } else {
              navigation.navigate('OtpScreen', { response: response });
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

  const toggleOtpModal = () => {
    setOtpModal(!otpModal);
  };

  const _socialOtpSend = async () => {

    setIsLoading(true)
    if (socialPhoneNumber == '') {
      setErrorMessage("Enter Phone");
    } else {
      const formData = new FormData();
      formData.append('phone', socialPhoneNumber);


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
      formData.append('email', socialEmail);
      formData.append('phone', socialPhoneNumber);
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
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }} style={[styles.backIconOuter,{paddingTop: insets.top+10}]} >
            <AntDesign name="arrowleft" style={styles.backIcon} />
          </TouchableOpacity>
          <ImageBackground source={require('../../assets/Image/loginBackground.png')} style={styles.pagenameBackGround} >
            <Text style={styles.loginText}>Create Account</Text>
          </ImageBackground>
          <View style={{ flex: 1, marginHorizontal: 10 }}>


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
            {/* {isFieldInError('fullName') &&
              <Text style={styles.bottomErrorMessage}>{getErrorsInField('fullName')[0]}</Text>
              } */}

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
            {/* {isFieldInError('email') &&
              <Text style={styles.bottomErrorMessage}>{getErrorsInField('email')[0]}</Text>} */}



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
            {/* {isFieldInError('phoneNumber') &&
              <Text style={styles.bottomErrorMessage}>{getErrorsInField('phoneNumber')[0]}</Text>} */}

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
            {/* {isFieldInError('password') &&
             <Text style={styles.bottomErrorMessage}>{getErrorsInField('password')[0]}</Text>} */}

            <TouchableOpacity style={styles.btnOuter} onPress={() => {

              checkSignup()
            }}>
              <Text style={styles.btnMessage}>Create Account</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.socialLoginOuter}>
            <Text style={styles.socialLoginText}>Login with</Text>
            <TouchableOpacity onPress={() => {
              // navigation.navigate('HomeScreen');
              onFacebookButtonPress().then((result) => {
                // console.log('Signed in with Facebook!', result)
                _socialLogin(result.additionalUserInfo.profile.id, "facebook", result.additionalUserInfo.profile.email, result.user.displayName)
                setSocialId(result.additionalUserInfo.profile.id)
                setSocialEmail(result.additionalUserInfo.profile.email)
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
                setSocialEmail(result.user.email)
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
        navigation.navigate('Login');

      }} style={styles.footerPart}>
        <Text style={styles.footerText}>Sign In</Text>
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
                  value={socialPhoneNumber}
                  keyboardType={'phone-pad'}
                  maxLength={10}
                  onChangeText={(phoneNumber) => setSocialPhoneNumber(phoneNumber)}
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
              <Text style={styles.signupText2}>{socialPhoneNumber}</Text>

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


export default Signup;