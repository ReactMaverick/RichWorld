import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, } from 'react-native';
import styles from "./styles";
import HomeIcon from "react-native-vector-icons/AntDesign";
import Settings from '../../assets/Image/Settings';
import WishIcon from '../../assets/Image/WishIcon'
import Account from '../../assets/Image/Account'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch } from "react-redux";

function Footer({ navigation }) {
    const dispatch = useDispatch();
    
    const userData = useSelector((state) => {
        
      return state.authReducer;
    });
    //console.log(userData);
  
    useEffect(() => {
        
    AsyncStorage.getItem('userData').then((userData) => {
        if (userData != null) {
            setUserData(JSON.parse(userData))
        } 
      })
    }, [navigation]);

    const setUserData = (item) =>
    dispatch({
      type: "LOGINUSER",
      payload: {
        item
      },
    });
  
  
    return (
        <View style={styles.footerbox}>

            <TouchableOpacity onPress={() => {
                navigation.navigate('HomeScreen');
               
            }}>
                <HomeIcon name="home" color={'#818181'} style={{fontSize:26}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                 if(userData==null){
                    navigation.navigate('Login');
                }else{
                    navigation.navigate('Settings');
                }
               
                
            }}>
                <Settings />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                  if(userData==null){
                    navigation.navigate('Login');
                }else{
                    navigation.navigate('Wishlist');
                }
                
            }}>
                <WishIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                  if(userData==null){
                    navigation.navigate('Login');
                }else{
                    navigation.navigate('Myaccount'); 
                }
                
            }}>
                <Account />
            </TouchableOpacity>



        </View>
    )

}


export default Footer;