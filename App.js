import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StatusBar, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SlideMenu from "./src/components/SlideMenu/index";

import HomeScreen from './src/screens/HomeScreen'
import Notifications from './src/screens/Notifications'
import Settings from './src/screens/Settings'
import Wishlist from './src/screens/Wishlist'
import Myaccount from './src/screens/Myaccount'
import ProductList from './src/screens/ProductList'
import Introduction from './src/screens/Introduction'
import ContactInfo from './src/screens/ContactInfo'
import Testimonials from './src/screens/Testimonials'
import TermsCondition from './src/screens/TermsCondition'
import PrivecyPolicy from './src/screens/PrivecyPolicy'
import Faq from './src/screens/Faq'
import ProductDetails from './src/screens/ProductDetails'





const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: '80%',
        },
      }}
      drawerContent={(props) =>
        <SlideMenu {...props} />
      }>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <Drawer.Screen name="Wishlist" component={Wishlist} options={{ headerShown: false }} />
      <Drawer.Screen name="Myaccount" component={Myaccount} options={{ headerShown: false }} />
      <Drawer.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
      <Drawer.Screen name="Introduction" component={Introduction} options={{ headerShown: false }} />
      <Drawer.Screen name="ContactInfo" component={ContactInfo} options={{ headerShown: false }} />
      <Drawer.Screen name="Testimonials" component={Testimonials} options={{ headerShown: false }} />
      <Drawer.Screen name="TermsCondition" component={TermsCondition} options={{ headerShown: false }} />
      <Drawer.Screen name="PrivecyPolicy" component={PrivecyPolicy} options={{ headerShown: false }} />
      <Drawer.Screen name="Faq" component={Faq} options={{ headerShown: false }} />

    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function Stack1() {
  return (
    <Stack.Navigator  >
      <Stack.Screen name="Home" component={MyDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <Stack.Screen name="Wishlist" component={Wishlist} options={{ headerShown: false }} />
      <Stack.Screen name="Myaccount" component={Myaccount} options={{ headerShown: false }} />
      <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
      <Stack.Screen name="Introduction" component={Introduction} options={{ headerShown: false }} />
      <Stack.Screen name="ContactInfo" component={ContactInfo} options={{ headerShown: false }} />
      <Stack.Screen name="Testimonials" component={Testimonials} options={{ headerShown: false }} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} options={{ headerShown: false }} />
      <Stack.Screen name="PrivecyPolicy" component={PrivecyPolicy} options={{ headerShown: false }} />
      <Stack.Screen name="Faq" component={Faq} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
      
    </Stack.Navigator>
  )

}


export default function App() {

  useEffect(() => {

  }, []);

  return (
    <NavigationContainer>
      <Stack1 />
    </NavigationContainer>
  );


}