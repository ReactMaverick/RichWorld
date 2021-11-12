import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



function SlideMenu({ navigation }) {



    useEffect(() => {
    }, [navigation]);

    return (
        <ScrollView style={styles.outerMenu}>

            <TouchableOpacity onPress={()=>{
                  navigation.navigate('HomeScreen');
            }} style={styles.menuItem}>
                <AntDesign name="home" style={styles.menuIcon} />
                <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>

            {/* <View style={styles.menuItem}>
                
                <Text style={[styles.menuText,{fontWeight:'bold',marginLeft:15}]}>All Categories</Text>
            </View>
            <TouchableOpacity onPress={()=>{
                  navigation.navigate('ProductList');
            }} style={styles.menuItem}>
                <AntDesign name="home" style={styles.menuIcon} />
                <Text style={styles.menuText}>Men</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                  navigation.navigate('ProductList');
            }} style={styles.menuItem}>
                <AntDesign name="home" style={styles.menuIcon} />
                <Text style={styles.menuText}>Women</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={()=>{
                  navigation.navigate('MyCart');
            }} style={styles.menuItem}>
                <Entypo name="shopping-cart" style={styles.menuIcon} />
                <Text style={styles.menuText}>MyCart</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                  navigation.navigate('Introduction');
            }} style={styles.menuItem}>
                <FontAwesome5 name="clipboard-list" style={styles.menuIcon} />
                <Text style={styles.menuText}>Introduction</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                  navigation.navigate('Blog');
            }} style={styles.menuItem}>
                <FontAwesome5 name="blog" style={styles.menuIcon} />
                <Text style={styles.menuText}>Blog</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                  navigation.navigate('ContactInfo');
            }} style={styles.menuItem}>
                <FontAwesome name="phone" style={styles.menuIcon} />
                <Text style={styles.menuText}>Contact Info</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>{
                  navigation.navigate('Testimonials');
            }} style={styles.menuItem}>
                <FontAwesome name="users" style={styles.menuIcon} />
                <Text style={styles.menuText}>Testimonials</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>{
                  navigation.navigate('TermsCondition');
            }} style={styles.menuItem}>
                <FontAwesome name="shield" style={styles.menuIcon} />
                <Text style={styles.menuText}>Terms & Condition</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>{
                  navigation.navigate('PrivecyPolicy');
            }} style={styles.menuItem}>
                <FontAwesome5 name="lock" style={styles.menuIcon} />
                <Text style={styles.menuText}>Privecy & Policy</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>{
                  navigation.navigate('Faq');
            }} style={styles.menuItem}>
                <Entypo name="chat" style={styles.menuIcon} />
                <Text style={styles.menuText}>Faq</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                  navigation.navigate('Login');
            }} style={styles.menuItem}>
                
                <MaterialCommunityIcons name="logout" style={styles.menuIcon} />
                <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity>
            
        </ScrollView>
    )

}



export default SlideMenu;