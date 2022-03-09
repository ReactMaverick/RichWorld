import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import { UPDATE_ACCOUNT, CHANGE_PHONE, CHANGE_EMAIL } from '../../config/ApiConfig';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { showMessage, hideMessage } from "react-native-flash-message";
function Settings({ navigation }) {


  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [socialId, setSocialId] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const _showMessage = (message) => {
    showMessage({
      message: message,
      type: "info",
      backgroundColor: "#808080",
    });
  }
  const _uploadAccount = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('user_id', userData.id);
    formData.append('first_name', firstName);
    formData.append('currentPassword', currentPassword);
    formData.append('newPassword', newPassword);
    formData.append('confirmPassword', confirmPassword);
    console.log(JSON.stringify(formData, null, " "));
    fetch(UPDATE_ACCOUNT, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    }).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    }).then(([status, response]) => {
      if (status == 200) {

        console.log(response)
        let tempUserData = userData;
        tempUserData.first_name = response.user_details.first_name;
        setUserData(tempUserData);
        AsyncStorage.setItem('userData', JSON.stringify(tempUserData))

      }
    })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      });
  }
  const _changeEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email == '') {
      _showMessage("Please enter Email");
    } else if ((reg.test(email) === false)) {
      _showMessage("Please enter valid Email");
    } else {
      setIsLoading(true)
      fetch(CHANGE_EMAIL + userData.id + "&email=" + email, {
        method: "GET"
      }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      }).then(([status, response]) => {
        // console.log(response);
        if (status == 200) {
          if (response.status) {
            navigation.navigate('OtpVerification', {
              id: userData.id,
              otp: response.otp,
              email: response.email,
              phone: ""
            });
          } else {
            setEmail(userData.email)
            _showMessage(response.message);
          }
        }
      })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setIsLoading(false)
        });
    }
  }
  const _changePhone = () => {
    if (phone == '') {
      _showMessage("Please enter Phone");
    } else if (phone.length != 10) {
      _showMessage("Please enter valid Phone");
    } else {
      setIsLoading(true)
      fetch(CHANGE_PHONE + userData.id + "&phone=" + phone, {
        method: "GET"
      }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      }).then(([status, response]) => {
        if (status == 200) {
          if (response.status) {
            navigation.navigate('OtpVerification', {
              id: userData.id,
              otp: response.otp,
              email: "",
              phone: response.phone
            });
          } else {
            setPhone(userData.phone)
            _showMessage(response.massage);
          }

        }
      })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setIsLoading(false)
        });
    }

  }
  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('userData').then((userData) => {
        if (userData != null) {
          setIsLogin(true)
          setUserData(JSON.parse(userData))
          var userDetails = JSON.parse(userData)
          setFirstName(userDetails.first_name);
          setSocialId(userDetails.social_id);
          setEmail(userDetails.email)
          setPhone(userDetails.phone)
        } else {
          setIsLogin(false)
        }
      }).then(setIsLoading(false))
    }
  }, [navigation, isFocused]);
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
        <Header navigation={navigation} />
        <View style={styles.filterBar}>
          <View style={styles.filterTextBox}>
            <Text style={styles.CategoryText1}>Account </Text>
            <Text style={styles.CategoryText2}>Setting</Text>
          </View>

        </View>
        <ScrollView style={{ flex: 1 }}>

          <View style={styles.card}>
            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Name'}
                style={[styles.textInput]}
                value={firstName}
                onChangeText={(firstName) => setFirstName(firstName)}
              />
            </View>

            <View style={[styles.textInputOuter, { flexDirection: 'row' }]}>
              <TextInput
                placeholder={'Email'}
                style={[styles.textInputEdit]}
                keyboardType={'email-address'}
                editable={socialId == null ? true : false}
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
              {socialId == null &&
                <TouchableOpacity onPress={() => {
                  _changeEmail()
                }}>
                  <FontAwesome name="edit" style={styles.inputIcon} />
                </TouchableOpacity>
              }
            </View>
            <View style={[styles.textInputOuter, { flexDirection: 'row' }]}>

              <TextInput
                placeholder={'Phone Number'}
                value={phone}
                onChangeText={(phone) => setPhone(phone)}
                keyboardType={'phone-pad'}
                editable={socialId == null ? true : false}
                style={styles.textInputEdit}
              />
              {socialId == null &&
                <TouchableOpacity onPress={() => {
                  _changePhone()
                }}>
                  <FontAwesome name="edit" style={styles.inputIcon} />
                </TouchableOpacity>
              }
            </View>
            {socialId == null ?
              <>
                <View style={styles.passChange}>
                  <Text style={styles.passChangeText}>Password change</Text>
                </View>


                <View style={styles.textInputOuter}>
                  <TextInput
                    placeholder={'Current Password'}
                    style={[styles.textInput]}
                    value={currentPassword}
                    onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
                  />
                </View>

                <View style={styles.textInputOuter}>
                  <TextInput
                    placeholder={'New Password'}
                    style={[styles.textInput]}
                    value={newPassword}
                    onChangeText={(newPassword) => setNewPassword(newPassword)}
                  />
                </View>


                <View style={styles.textInputOuter}>
                  <TextInput
                    placeholder={'Confirm Password'}
                    style={[styles.textInput]}
                    value={confirmPassword}
                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                  />
                </View>
              </>
              : <></>
            }


            <TouchableOpacity style={styles.btnOuter} onPress={() => {
              _uploadAccount();
            }}>
              <Text style={styles.btnMessage}>Save Changes</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        <Footer navigation={navigation} />
      </>
    )
  }

}


export default Settings;