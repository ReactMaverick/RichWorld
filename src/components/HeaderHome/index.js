import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, } from 'react-native';
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

function HeaderHome({ navigation }) {
  

  const isFocused = useIsFocused();
  const userData = useSelector(
    (state) => state.authReducer
  );

  const cartData = useSelector(
    (state) => state.cartReducer
  );
  

  useEffect(() => {
  }, [navigation]);

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
          } }>
          <Image source={require('../../assets/Image/richworldlogo.png')} style={styles.logo} />
          </TouchableOpacity>
        </View>
        <View style={styles.subheader2}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Notifications');

          }}>
            <FontAwesome5 name="bell" style={styles.menuIcon2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('MyCart',{shopNow: 0});

          }}>
            <View style={{ flexDirection: 'row' }}>

              <AntDesign name="shoppingcart" style={styles.menuIcon} />
              {cartData.length > 0?<View style={styles.countOuter}><Text style={styles.countText}>{cartData.length}</Text></View>:<></>}
              
            </View>

          </TouchableOpacity>


        </View>

      </View>

      <TouchableOpacity style={styles.searchBoxOuter} onPress={() => {
        navigation.navigate('Search');

      }}>
        <View style={styles.searchBoxIcon}>
          <AntDesign name="search1" style={styles.menuIconSearch} />
          <Text>Search for Products...</Text>
          {/* <TextInput placeholder="Search for Products..."></TextInput> */}
        </View>
        <View style={styles.searchBoxAudio}>
          <Feather name="mic" style={styles.menuIconMic} />
        </View>
      </TouchableOpacity>
    </View>
  )

}


export default HeaderHome;