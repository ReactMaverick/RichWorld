import React, { useState, useEffect,createRef } from "react";
import { View, ScrollView, Share, Image, Text, TouchableOpacity, ImageBackground} from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import ActionSheet from "react-native-actions-sheet";
import ImagePicker from 'react-native-image-crop-picker';
const actionSheetRef = createRef();
function Myaccount({ navigation }) {

  const [profileImage, setProfileImage] = useState();
  
  let actionSheet;

  useEffect(() => {
  }, [navigation]);

  
  
  
  const _uploadProfileImage = async (image) => {
  //   const imagePath = image.path;
  //  const arr= imagePath.split("/")
  //   setisLoading(true);
  //   const formData = new FormData();
  //   formData.append('profile_pic', {
  //     uri:Platform.OS === 'ios' ? `file:///${image.path}` : image.path,
  //     type: image.mime,
  //     name: arr[arr.length-2]
  //   });
  //   fetch(POST_UPLOAD_PROFILE_PIC , {
  //     method: "POST",
  //     headers: {
  //       'Authorization': 'Bearer ' + userDetails.token,
  //       'Content-Type':'multipart/form-data',          
  //     },
  //     body: formData
  //   })
  //     .then((response) => {
  //        // console.log(response);
  //       const statusCode = response.status;
  //       const data = response.json();
  //       return Promise.all([statusCode, data]);
  //     })
  //     .then(([status, response]) => {      
  //       if (status == 200) {
  //           //console.log(response);
  //           var newUrl = response.img_basepath+'/'+response.profile_pic_path;
  //           var user_data = userDetails;
  //           user_data.user.profile_pic = newUrl;
  //           AsyncStorage.setItem("userData",JSON.stringify(user_data));
  //       } else {
  //         console.log(status, response);
  //       }
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(() => setisLoading(false));


  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=com.xert.attukari',
        url: 'https://play.google.com/store/apps/details?id=com.xert.attukari'
      });
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
      alert(error.message);
    }
  };

  return (
    <>
      <Header navigation={navigation} />
      <ScrollView style={{ flex: 1}}>
      <View style={[styles.headerSection,{backgroundColor:'#AB0000'}]} >
      <Image source={require('../../assets/Image/accountBackGround.png')} style={styles.headerSection} />
      </View>
         
           
          <Image source={require('../../assets/Image/profile.jpg')} style={styles.userImage} />
         
            <Text style={styles.userName}>Jazy Dewo</Text>
            <TouchableOpacity onPress={() => {
            actionSheetRef.current?.setModalVisible();
          }}>
            <Entypo name="camera" style={styles.camera} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('Account');
          }} style={styles.menuItem}>
            <FontAwesome name="user-circle" style={styles.menuIcon} />
            <Text style={styles.menuText}>My account</Text>
          </TouchableOpacity>


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


          <TouchableOpacity onPress={() => {
            navigation.navigate('HomeScreen');
          }} style={styles.menuItem}>
            <MaterialCommunityIcons name="logout" style={styles.menuIcon} />
            <Text style={styles.menuText}>Log Out</Text>
          </TouchableOpacity>

    
      </ScrollView>
      <Footer navigation={navigation} />

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