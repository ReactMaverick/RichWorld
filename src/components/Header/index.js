import React, { useState, useEffect } from "react";
import { View,  Image, Text, TouchableOpacity, } from 'react-native';
import styles from "./styles";
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'

function Header({ navigation }) {



  useEffect(() => {
  }, [navigation]);
  
  return (
    <View style={styles.headerBox}>
        <TouchableOpacity style={styles.box1} onPress={()=>{
            navigation.openDrawer();
        }}>
       <Entypo name="menu" style={styles.menuIcon} />
        </TouchableOpacity>
        <View  style={styles.box2} >
        <Image source={require('../../assets/Image/richworldlogo.png')} style={styles.logo} />

        </View>
       <View  style={styles.box3} >
       <Feather name="search" style={styles.menuIcon}  />
      <AntDesign name="shoppingcart" style={styles.menuIcon}  />
      
      <Image source={require('../../assets/Image/userImage.png')} style={styles.userLogo} />
      
       </View>
      
    </View>
  )

}


export default Header;