import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { DrawerActions } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';


import { useSelector, useDispatch } from "react-redux";

import AsyncStorage from '@react-native-async-storage/async-storage';
function SlideMenu({ navigation }) {


    const dispatch = useDispatch();

    const userData = useSelector(
        (state) => state.authReducer
    );



    const setUserData = () =>
        dispatch({
            type: "LOGOUT",

        });

    const isDrawerOpen = useDrawerStatus()
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        AsyncStorage.getItem('userData').then((userData) => {
            if (userData != null) {
                setIsLogin(false)
            } else {
                setIsLogin(true)
            }
        })
    }, [navigation, isDrawerOpen]);

    return (
        <ScrollView style={styles.outerMenu}>

            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('HomeScreen');
            }} style={styles.menuItem}>
                <AntDesign name="home" style={styles.menuIcon} />
                <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>



            <TouchableOpacity onPress={() => {
              
                    navigation.dispatch(DrawerActions.toggleDrawer())
                    navigation.navigate('MyCart', { shopNow: 0 });
             

            }} style={styles.menuItem}>
                <View style={{ width: 30 }}><Entypo name="shopping-cart" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>MyCart</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {

                if (userData == null) {
                    navigation.navigate('Login');
                } else {
                    navigation.dispatch(DrawerActions.toggleDrawer())
                    navigation.navigate('Rewards');
                }


            }} style={styles.menuItem}>
                <View style={{ width: 30 }}><Feather name="gift" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Rewards</Text>
            </TouchableOpacity>


            {/* <TouchableOpacity onPress={()=>{
                  navigation.navigate('Introduction');
            }} style={styles.menuItem}>
                <View style={{width:30}}><FontAwesome5 name="clipboard-list" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Introduction</Text>
            </TouchableOpacity> */}
            {/* 
            <TouchableOpacity onPress={()=>{
                  navigation.navigate('Blog');
            }} style={styles.menuItem}>
                <View style={{width:30}}><FontAwesome5 name="blog" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Blog</Text>
            </TouchableOpacity>*/}

            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('ContactInfo');
            }} style={styles.menuItem}>
                <View style={{ width: 30 }}><FontAwesome name="phone" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Contact Info</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('Testimonials');
            }} style={styles.menuItem}>
                <View style={{ width: 30 }}><FontAwesome name="users" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Testimonials</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('TermsCondition');
            }} style={styles.menuItem}>
                <View style={{ width: 30 }}><FontAwesome name="shield" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Terms & Condition</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('PrivecyPolicy');
            }} style={styles.menuItem}>
                <View style={{ width: 30 }}><FontAwesome5 name="lock" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Privecy & Policy</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('Faq');
            }} style={styles.menuItem}>
                <View style={{ width: 30 }}><Entypo name="chat" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Faq</Text>
            </TouchableOpacity>

            {isLogin ? <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('Login');
            }} style={styles.menuItem}>

                <View style={{ width: 30 }}><MaterialCommunityIcons name="logout" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity> :
                <TouchableOpacity onPress={() => {
                    AsyncStorage.clear().then(() => {
                        setUserData();
                        setIsLogin(true)
                        navigation.navigate('HomeScreen');
                    })
                }} style={styles.menuItem}>

                    <View style={{ width: 30 }}><MaterialCommunityIcons name="logout" style={styles.menuIcon} /></View>
                    <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>
            }
        </ScrollView>
    )

}



export default SlideMenu;