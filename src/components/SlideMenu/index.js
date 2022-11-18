import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { DrawerActions } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useSelector, useDispatch } from "react-redux";
import { BKColor } from "../../common/BKColor";
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


    const socialSignOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await auth().signOut();
        } catch (error) {
            console.log(error.message);
        }


    }

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
        // <ScrollView style={styles.outerMenu}>
            <ImageBackground style={styles.outerMenu} source={require('../../assets/Image/sidebar-img.png')} resizeMode='cover' >
                <AntDesign name="close" style={{
                    fontSize:25,
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    color:BKColor.textColor1
                }}  onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
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
                <View style={{ width: 35 }}><Entypo name="shopping-cart" style={styles.menuIcon} /></View>
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
                <View style={{ width: 35 }}><Feather name="gift" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Rewards</Text>
            </TouchableOpacity>


            {/* <TouchableOpacity onPress={()=>{
                  navigation.navigate('Introduction');
            }} style={styles.menuItem}>
                <View style={{width:30}}><FontAwesome5 name="clipboard-list" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Introduction</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => {
                navigation.navigate('Blog');
            }} style={styles.menuItem}>
                <View style={{ width: 35 }}><FontAwesome5 name="blog" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Blog</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('ContactInfo');
            }} style={styles.menuItem}>
                <View style={{ width: 35 }}><FontAwesome name="phone" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Contact Info</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('Testimonials');
            }} style={styles.menuItem}>
                <View style={{ width: 35 }}><FontAwesome name="users" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Testimonials</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('TermsCondition');
            }} style={styles.menuItem}>
                <View style={{ width: 35 }}><FontAwesome name="shield" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Terms & Condition</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('PrivecyPolicy');
            }} style={styles.menuItem}>
                <View style={{ width: 35 }}><FontAwesome5 name="lock" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Privacy & Policy</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('Faq');
            }} style={styles.menuItem}>
                <View style={{ width: 35 }}><Entypo name="chat" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Faq</Text>
            </TouchableOpacity>

            {isLogin ? <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('Login');
            }} style={styles.menuItem}>

                <View style={{ width: 35 }}><MaterialCommunityIcons name="logout" style={styles.menuIcon} /></View>
                <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity> :
                <TouchableOpacity onPress={() => {


                    if (userData.item.social_id != null) {
                        AsyncStorage.clear().then(() => {
                            try {
                                socialSignOut()
                            } catch (e) {

                            }
                            dispatch({type: "LOGOUT"});
                            setUserData();
                            setIsLogin(true)
                            navigation.navigate('HomeScreen');
                        })
                    } else {
                        AsyncStorage.clear().then(() => {
                            setUserData();
                            setIsLogin(true)
                            navigation.navigate('HomeScreen');
                        })
                    }

                }} style={styles.menuItem}>

                    <View style={{ width: 35 }}><MaterialCommunityIcons name="logout" style={styles.menuIcon} /></View>
                    <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>
            }
        </ImageBackground>
    )

}



export default SlideMenu;