import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import { UPDATE_ACCOUNT } from '../../config/ApiConfig';
import { useIsFocused } from "@react-navigation/native";
function Settings({ navigation }) {


  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [socialId, setSocialId] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const _uploadAccount = async () => {
    // setisLoading(true);
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

  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('userData').then((userData) => {
        if (userData != null) {
          setIsLogin(true)
          setUserData(JSON.parse(userData))
          var userDetails = JSON.parse(userData)
          setFirstName(userDetails.first_name);
          setSocialId(userDetails.social_id);
          console.log(userDetails.social_id)
        } else {
          setIsLogin(false)
        }
      })
    }
  }, [navigation, isFocused]);

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

          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Email'}
              style={[styles.textInput]}
              editable={false}
              value={userData.email}
            />
          </View>
          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Phone Number'}
              value={userData.phone}
              editable={false}
              style={[styles.textInput]}
            />
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
            <Text style={styles.btnMessage}>Save Chnages</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}


export default Settings;