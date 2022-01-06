import React, { useState, useEffect, createRef } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, Dimensions, } from 'react-native';
import styles from "./styles";
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { DrawerActions } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import SafeAreaViewDecider from 'react-native-smart-statusbar'
import { VIEW_CART, UPDATE_CART_QUANTITY } from '../../config/ApiConfig';
import DeviceInfo from 'react-native-device-info';
import { useIsFocused } from "@react-navigation/native";
import Voice from '@react-native-community/voice';
import ActionSheet from "react-native-actions-sheet";
const actionSheetRef = createRef();

function HeaderHome({ navigation }) {


  const isFocused = useIsFocused();
  const userData = useSelector(
    (state) => state.authReducer
  );

  const cartData = useSelector(
    (state) => state.cartReducer
  );
  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e)
  }
  const onSpeechEndHandler = (e) => {
    console.log("stop handler", e)
    actionSheetRef.current?.setModalVisible();
  }

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0]
    console.log("speech result handler", text)
    actionSheetRef.current?.setModalVisible();
    navigation.navigate('Search', { text: text })
    // console.log("speech result handler", e)
  }
  const startRecording = async () => {
    try {
      actionSheetRef.current?.setModalVisible();
      await Voice.start('en-Us')
    } catch (error) {
      console.log("error raised", error)
    }
  }
  useEffect(() => {
    if (isFocused) {
      Voice.onSpeechStart = onSpeechStartHandler;
      Voice.onSpeechEnd = onSpeechEndHandler;
      Voice.onSpeechResults = onSpeechResultsHandler;

      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      }
    }
  }, [navigation, isFocused]);

  return (
    // <View style={styles.headerBox}>
    //     <TouchableOpacity style={styles.box1} onPress={()=>{
    //         navigation.openDrawer();
    //     }}>
    //    <Entypo name="menu" style={styles.menuIcon} />
    //     </TouchableOpacity>
    //     <View  style={styles.box2} >
    //     <Image source={require('../../assets/Image/richworldlogo.png')} style={styles.logo} />

    //     </View>
    //    <View  style={styles.box3} >
    //    <Feather name="search" style={styles.menuIcon}  />
    //   <AntDesign name="shoppingcart" style={styles.menuIcon}  />

    //   <Image source={require('../../assets/Image/userImage.png')} style={styles.userLogo} />

    //    </View>

    // </View>
    <View style={styles.headerMain}>
      {/* <SafeAreaViewDecider statusBarHiddenForNotch={false} backgroundColor="#620000"/> */}
      <View style={styles.headerall}>
        <View style={styles.subheader}>
          <TouchableOpacity onPress={() => {

            navigation.dispatch(DrawerActions.openDrawer())
          }}>
            <Entypo name="menu" style={styles.menuIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('HomeScreen')
          }}>
            <Image source={require('../../assets/Image/richworldlogo.png')} style={styles.logo} />
          </TouchableOpacity>
        </View>
        <View style={styles.subheader2}>
          <TouchableOpacity onPress={() => {
            if (userData == null) {
              navigation.navigate('Login');
            } else {
              navigation.navigate('Notifications');
            }

          }}>
            <FontAwesome5 name="bell" style={styles.menuIcon2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('MyCart', { shopNow: 0 });

          }}>
            <View style={{ flexDirection: 'row' }}>

              <AntDesign name="shoppingcart" style={styles.menuIcon} />
              {cartData.length > 0 ? <View style={styles.countOuter}><Text style={styles.countText}>{cartData.length}</Text></View> : <></>}

            </View>

          </TouchableOpacity>


        </View>

      </View>

      <View style={styles.searchBoxOuter} >
        <TouchableOpacity style={styles.searchBoxIcon} onPress={() => {
          navigation.navigate('Search', { text: "" })
        }}>
          <AntDesign name="search1" style={styles.menuIconSearch} />
          <Text>Search for Products...</Text>
          {/* <TextInput placeholder="Search for Products..."></TextInput> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchBoxAudio} onPress={() => {
          startRecording()
        }}>
          <Feather name="mic" style={styles.menuIconMic} />
        </TouchableOpacity>
      </View>

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.listening}>
          <Text style={{ fontSize: 20 }}>Listening...</Text>
        </View>
      </ActionSheet>



    </View>
  )

}


export default HeaderHome;