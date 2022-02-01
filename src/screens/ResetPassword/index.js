import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UPDATE_NEW_PASSWORD } from '../../config/ApiConfig';
import { useSelector,useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';


function ResetPassword({ navigation, route }) {
  const dispatch = useDispatch();
  const { user_id } = route.params;
  // console.log(user_id)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const setUserData = (item) =>
  dispatch({  
    type: "LOGINUSER",
    payload: {
      item
    },
  });

  const _resetPassword = async () => {
    
    if (newPassword == "") {
      setErrorMessage("Please enter New Password");
    } else if (confirmPassword == "") {
      setErrorMessage("Please enter Confirm Password");
    } else {
    fetch(UPDATE_NEW_PASSWORD+"?user_id="+user_id+"&new_password="+newPassword+"&confirm_password="+confirmPassword, {
      method: "PUT"
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          if (response.status == false) {
            setErrorMessage(response.message);
          } else {
            console.log('UPDATE_NEW_PASSWORD',response.userDetails[0])
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


  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <View style={styles.backGround}>
        {isLoading ? <ActivityIndicator size="large" color="#AB0000" /> : <></>}
        <ScrollView showsVerticalScrollIndicator={false}>

          <ImageBackground source={require('../../assets/Image/loginBackground.png')} style={styles.pagenameBackGround} >
            <Text style={styles.loginText}>Reset Password</Text>
          </ImageBackground>
          <View style={{ flex: 1, padding: 10, marginTop: 20 }}>
            <Text style={styles.errorMessage}>{errorMsg}</Text>
            <View style={(Platform.OS=="android")?styles.textInputOuter:styles.textInputOuterIos}>
              <AntDesign name="lock" style={styles.inputicon} />
              <TextInput
                placeholder={'New Password'}
                style={[styles.textInput]}
                value = {newPassword}
                secureTextEntry={true}
                onChangeText={(newPassword) => setNewPassword(newPassword)}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>

            <View style={(Platform.OS=="android")?styles.textInputOuter:styles.textInputOuterIos}>
              <AntDesign name="lock" style={styles.inputicon} />
              <TextInput
                placeholder={'Confirm Password'}
                style={[styles.textInput]}
                value = {confirmPassword}
                secureTextEntry={true}
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>
          </View>


          <TouchableOpacity style={styles.btnOuter} onPress={() => {
            _resetPassword()
          }}>
            <Text style={styles.btnMessage}>Reset</Text>
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


export default ResetPassword;