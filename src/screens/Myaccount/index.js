import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, Share, Image, Text, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import ActionSheet from "react-native-actions-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { UPDATE_ACCOUNT, PLAY_STORE } from '../../config/ApiConfig';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { BKColor } from "../../common/BKColor";

const actionSheetRef = createRef();


import { useSelector, useDispatch } from "react-redux";

function Myaccount({ navigation }) {

  const dispatch = useDispatch();

  const logoutData = () => {
    dispatch({
      type: "LOGOUT",

    });
    AsyncStorage.setItem('fcmToken', fcmToken);
  }
  const _getPlayStore = async () => {
    setIsLoading(true)
    fetch(PLAY_STORE, {
      method: "get",
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          setGooglePlaystore(response.google_playstore);
          setApplePlaystore(response.apple_playstore);
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }

  const loginData = useSelector(
    (state) => state.authReducer
  );


  const isFocused = useIsFocused();
  const [profileImage, setProfileImage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [fcmToken, setFcmToken] = useState("");
  const [googlePlaystore, setGooglePlaystore] = useState("");
  const [applePlaystore, setApplePlaystore] = useState("");

  let actionSheet;

  useEffect(() => {
    _getPlayStore();
    AsyncStorage.getItem('fcmToken').then((fcmToken) => {
      setFcmToken(fcmToken);
    })
    if (isFocused) {
      AsyncStorage.getItem('userData').then((userData) => {
        if (userData != null) {
          console.log(userData);
          setIsLogin(true)
          setUserData(JSON.parse(userData))
        } else {
          setIsLogin(false)
          navigation.navigate('Login');
        }
      })
    }
  }, [navigation, isFocused]);



  const _uploadProfileImage = async (image) => {
    // setisLoading(true);
    //console.log(image.path);
    const imagePath = image.path;
    const arr = imagePath.split("/")
    const formData = new FormData();
    formData.append('images', {
      uri: Platform.OS === 'ios' ? `file:///${image.path}` : image.path,
      type: image.mime,
      name: arr[arr.length - 2]
    });
    formData.append('user_id', userData.id);


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
        // console.log(response)

        let tempUserData = userData;
        tempUserData.customer_image = response.base_path + '/' + response.user_details.customer_image;
        setUserData(tempUserData);
        AsyncStorage.setItem('userData', JSON.stringify(tempUserData))

      }
    })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }

  const onShare = async () => {
    try {
      if (Platform.OS == "android") {
        const result = await Share.share({
          title: 'App link',
          message: 'Please install this app and stay safe , AppLink :' + googlePlaystore,
          url: googlePlaystore
        });
      } else {
        const result = await Share.share({
          title: 'App link',
          message: 'Please install this app and stay safe , AppLink :' + applePlaystore,
          url: applePlaystore
        });
      }

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const socialSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <>
      <Header navigation={navigation} />
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.headerSection, { backgroundColor: BKColor.btnBackgroundColor2 }]} >
          <Image source={require('../../assets/Image/accountBackGround.png')} style={styles.headerSection} />
        </View>
        {userData.customer_image != null ?
          <Image source={{ uri: userData.customer_image }} style={styles.userImage} />
          :
          <Image source={require('../../assets/Image/avtar.png')} style={styles.userImage} />
        }


        <Text style={styles.userName}>{userData.first_name}</Text>
        <TouchableOpacity onPress={() => {
          actionSheetRef.current?.setModalVisible();
        }}>
          <Entypo name="camera" style={styles.camera} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => {
          navigation.navigate('Account');
        }} style={styles.menuItem}>
          <FontAwesome name="user-circle" style={styles.menuIcon} />
          <Text style={styles.menuText}>My account</Text>
        </TouchableOpacity> */}

        <View style={{ paddingLeft: 15, paddingTop: 15 }}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('MyOrder');
          }} style={styles.menuItem}>
            <FontAwesome name="cube" style={styles.menuIcon} />
            <Text style={styles.menuText}>My Orders</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => {
            navigation.navigate('Wishlist');
          }} style={styles.menuItem}>
            <FontAwesome name="heart-o" style={styles.menuIcon} />
            <Text style={styles.menuText}>My Wishlist</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => {
            navigation.navigate('MyAddress');
          }} style={styles.menuItem}>
            <FontAwesome name="map-marker" style={styles.menuIcon} />
            <Text style={styles.menuText}>My Address</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => {
            navigation.navigate('MyPurchased');
          }} style={styles.menuItem}>
            <FontAwesome name="inr" style={styles.menuIcon} />
            <Text style={styles.menuText}>My purchased</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            onShare()
          }} style={styles.menuItem}>
            <FontAwesome name="user" style={styles.menuIcon} />
            <Text style={styles.menuText}>Refer Friends</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('Settings');
          }} style={styles.menuItem}>
            <FontAwesome name="gear" style={styles.menuIcon} />
            <Text style={styles.menuText}>Account Setting</Text>
          </TouchableOpacity>

          {isLogin ?
            <TouchableOpacity onPress={() => {

              AsyncStorage.clear().then(() => {
                logoutData()
                setIsLogin(true)
                try {
                  socialSignOut()
                } catch (e) {

                }
                dispatch({ type: "LOGOUT" });
                navigation.navigate('HomeScreen');
              })



            }} style={styles.menuItem}>

              <View style={{ width: 30 }}><MaterialCommunityIcons name="logout" style={styles.menuIcon} /></View>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => {
              navigation.navigate('Login');
            }} style={styles.menuItem}>
              <MaterialCommunityIcons name="logout" style={styles.menuIcon} />
              <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity>

          }

        </View>

      </ScrollView>
      <Footer navigation={navigation} activeTab="Myaccount" />

      <ActionSheet ref={actionSheetRef}>
        <TouchableOpacity onPress={() => {

          ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            _uploadProfileImage(image)
            setProfileImage(image.path);
            actionSheetRef.current?.hide();

          });
        }} style={[styles.outerBtn, { marginTop: 10 }]}>
          <Text style={styles.btnText}>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            _uploadProfileImage(image)
            //  console.log(image);
            setProfileImage(image.path);
            actionSheetRef.current?.hide();
          });
        }} style={styles.outerBtn}>
          <Text style={styles.btnText}>Select Image</Text>
        </TouchableOpacity>
      </ActionSheet>
    </>
  )

}


export default Myaccount;