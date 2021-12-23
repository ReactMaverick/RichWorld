import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, } from 'react-native';
import styles from "./styles";
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { DrawerActions } from '@react-navigation/native';
import SafeAreaViewDecider from 'react-native-smart-statusbar'

import { useSelector, useDispatch } from "react-redux";

import { VIEW_CART, UPDATE_CART_QUANTITY } from '../../config/ApiConfig';

import DeviceInfo from 'react-native-device-info';
import { useIsFocused } from "@react-navigation/native";

function Header({ navigation }) { 
  const [cartCount,setCartCount] = useState(0);

  const isFocused = useIsFocused();
  const userData = useSelector(
    (state) => state.authReducer
  );
  
  const cartData = useSelector(
    (state) => state.cartReducer
  );

  useEffect(() => {
  //   if (isFocused) {
  //   if (userData == null) {
  //     DeviceInfo.getAndroidId().then((androidId) => {
  //       _getCartList("", androidId)
  //     });
  //   } else {
  //     _getCartList(userData.item.id, "")
  //   }
  // }
  }, [navigation]);

  return (
    <View style={styles.headerBox}>
      <SafeAreaViewDecider statusBarHiddenForNotch={false}  backgroundColor="#620000" />
      <TouchableOpacity style={styles.box1} onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer())
      }}>
        <Entypo name="menu" style={styles.menuIcon} />
      </TouchableOpacity>
      <View style={styles.box2} >
        <Image source={require('../../assets/Image/richworldlogo.png')} style={styles.logo} />

      </View>
      <View style={styles.box3} >

        <TouchableOpacity onPress={() => {
          navigation.navigate('Search');

        }}>
          <Feather name="search" style={styles.menuIcon2} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          navigation.navigate('MyCart',{shopNow: 0});

        }}>
          <View style={{ flexDirection: 'row' }}>

            <AntDesign name="shoppingcart" style={styles.menuIcon} />
            {cartData.length > 0?<View style={styles.countOuter}><Text style={styles.countText}>{cartData.length}</Text></View>:<></>}
          </View>
        </TouchableOpacity>


        {/* <Image source={require('../../assets/Image/userImage.png')} style={styles.userLogo} /> */}

      </View>

    </View>

  )

}


export default Header;