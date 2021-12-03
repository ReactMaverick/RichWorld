import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, } from 'react-native';
import styles from "./styles";
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { DrawerActions } from '@react-navigation/native';
function Header({ navigation }) {



  useEffect(() => {
  
  }, [navigation]);

  return (
    <View style={styles.headerBox}>
        <TouchableOpacity style={styles.box1} onPress={()=>{
          navigation.dispatch(DrawerActions.openDrawer())
        }}>
       <Entypo name="menu" style={styles.menuIcon} />
        </TouchableOpacity>
        <View  style={styles.box2} >
        <Image source={require('../../assets/Image/richworldlogo.png')} style={styles.logo} />

        </View>
       <View  style={styles.box3} >
     
       <TouchableOpacity onPress={() => {
            navigation.navigate('Search');

          }}>
           <Feather name="search" style={styles.menuIcon2}  />
          </TouchableOpacity>
     
       <TouchableOpacity onPress={() => {
            navigation.navigate('MyCart');

          }}>
          <AntDesign name="shoppingcart" style={styles.menuIcon}  />
          </TouchableOpacity>
     

      {/* <Image source={require('../../assets/Image/userImage.png')} style={styles.userLogo} /> */}

       </View>

    </View>
   
  )

}


export default Header;