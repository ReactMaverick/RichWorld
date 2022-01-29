import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, } from 'react-native';
import styles from "./styles";
import HomeIcon from "../../assets/Image/HomeIcon";
import Settings from '../../assets/Image/Settings';
import WishIcon from '../../assets/Image/WishIcon'
import Account from '../../assets/Image/Account'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";

function Footer({ navigation }) {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const userData = useSelector((state) => {

        return state.authReducer;
    });
    // console.log('Footer-userData',userData);

    useEffect(() => {
        // console.log('Footer');
        if (isFocused) {
            AsyncStorage.getItem('userData').then((userData) => {
                if (userData != null) {
                    setUserData(JSON.parse(userData))
                }
            })
        }
    }, [navigation, isFocused]);

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
                <HomeIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                if (userData == null) {
                    navigation.navigate('Login');
                } else {
                    navigation.navigate('Settings');
                }


            }}>
                <Settings />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                if (userData == null) {
                    navigation.navigate('Login');
                } else {
                    navigation.navigate('Wishlist');
                }

            }}>
                <WishIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                if (userData == null) {
                    navigation.navigate('Login');
                } else {
                    navigation.navigate('Myaccount');
                }

            }}>
                <Account />
            </TouchableOpacity>



        </View>
    )

}


export default Footer;