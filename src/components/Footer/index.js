import React, { useState, useEffect } from "react";
import { View,  Image, Text, TouchableOpacity, } from 'react-native';
import styles from "./styles";
import Notification from "../../assets/Image/Notification";
import Settings from '../../assets/Image/Settings'; 
import WishIcon from '../../assets/Image/WishIcon'
import Account from '../../assets/Image/Account'
function Footer({ navigation }) {



    useEffect(() => {
    }, [navigation]);

    return (
        <View style={styles.footerbox}>

            <TouchableOpacity onPress={() => {
              navigation.navigate('Notifications');
            }}>
               <Notification />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Settings');
            }}>
                <Settings />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.navigate('Wishlist');
            }}>
                <WishIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.navigate('Myaccount');
            }}>
                <Account />
            </TouchableOpacity>



        </View>
    )

}


export default Footer;