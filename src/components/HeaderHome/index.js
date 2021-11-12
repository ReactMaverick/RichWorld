import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, } from 'react-native';
import styles from "./styles";
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function HeaderHome({ navigation }) {



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
      <View style={styles.headerall}>
        <View style={styles.subheader}>
          <TouchableOpacity onPress={() => {
            navigation.openDrawer();
          }}>
            <Entypo name="menu" style={styles.menuIcon} />
          </TouchableOpacity>
          <Image source={require('../../assets/Image/richworldlogo.png')} style={styles.logo} />
        </View>
        <View style={styles.subheader2}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Notifications');

          }}>
            <FontAwesome5 name="bell" style={styles.menuIcon2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('MyCart');

          }}>
          <AntDesign name="shoppingcart" style={styles.menuIcon} />
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
        {/* <View style={styles.searchBoxAudio}>
          <Feather name="mic" style={styles.menuIconMic} />
        </View> */}
      </TouchableOpacity>
    </View>
  )

}


export default HeaderHome;