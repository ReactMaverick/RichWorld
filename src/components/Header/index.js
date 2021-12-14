import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, } from 'react-native';
import styles from "./styles";
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { DrawerActions } from '@react-navigation/native';


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
  const _getCartList = async (customers_id, session_id) => {
    fetch(VIEW_CART + 'customers_id=' + customers_id + '&session_id=' + session_id + '&shopNow=', {
      method: "get",
    })
      .then((response) => {

        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          setCartCount(response.cart.length)
          

        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {

      });
  }


  useEffect(() => {
    if (isFocused) {
    if (userData == null) {
      DeviceInfo.getAndroidId().then((androidId) => {
        _getCartList("", androidId)
      });
    } else {
      _getCartList(userData.item.id, "")
    }
  }
  }, [navigation,isFocused]);

  return (
    <View style={styles.headerBox}>
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
          navigation.navigate('MyCart');

        }}>
          <View style={{ flexDirection: 'row' }}>

            <AntDesign name="shoppingcart" style={styles.menuIcon} />
            {cartCount !=0?<View style={styles.countOuter}><Text style={styles.countText}>{cartCount}</Text></View>:<></>}
          </View>
        </TouchableOpacity>


        {/* <Image source={require('../../assets/Image/userImage.png')} style={styles.userLogo} /> */}

      </View>

    </View>

  )

}


export default Header;