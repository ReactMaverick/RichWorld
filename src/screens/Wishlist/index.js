import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
function Wishlist({ navigation }) {



  useEffect(() => {
  }, [navigation]);
  
  return (
    <>
    <Header navigation={navigation} />
    <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>My Wishlist</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        
       <View style={styles.outerBox}>
         <View style={{flexDirection:'row',flex:1}}>
         <Image source ={require('../../assets/Image/cartUse.png')} style={styles.userImage} />
         <View style={styles.leftBox}>
           <Text style={styles.leftText1}>Simple Black T-Shirt	</Text>
           <Text style={styles.leftText2}>$260.00</Text>
         </View>
         </View>
        
         <View style={styles.outerBtn}>
           <TouchableOpacity style={[styles.btn,{backgroundColor:'#A20101'}]}>
             <Text  style={styles.btnTxt}>Remove</Text>
           </TouchableOpacity>

           <TouchableOpacity style={[styles.btn,{backgroundColor:'#000000'}]}>
             <Text style={styles.btnTxt}>Add to cart</Text>
           </TouchableOpacity>
         </View>
       </View>



       <View style={styles.outerBox}>
         <View style={{flexDirection:'row',flex:1}}>
         <Image source ={require('../../assets/Image/cartUse.png')} style={styles.userImage} />
         <View style={styles.leftBox}>
           <Text style={styles.leftText1}>Simple Black T-Shirt	</Text>
           <Text style={styles.leftText2}>$260.00</Text>
         </View>
         </View>
        
         <View style={styles.outerBtn}>
           <TouchableOpacity style={[styles.btn,{backgroundColor:'#A20101'}]}>
             <Text  style={styles.btnTxt}>Remove</Text>
           </TouchableOpacity>

           <TouchableOpacity style={[styles.btn,{backgroundColor:'#000000'}]}>
             <Text style={styles.btnTxt}>Add to cart</Text>
           </TouchableOpacity>
         </View>
       </View>



       <View style={styles.outerBox}>
         <View style={{flexDirection:'row',flex:1}}>
         <Image source ={require('../../assets/Image/cartUse.png')} style={styles.userImage} />
         <View style={styles.leftBox}>
           <Text style={styles.leftText1}>Simple Black T-Shirt	</Text>
           <Text style={styles.leftText2}>$260.00</Text>
         </View>
         </View>
        
         <View style={styles.outerBtn}>
           <TouchableOpacity style={[styles.btn,{backgroundColor:'#A20101'}]}>
             <Text  style={styles.btnTxt}>Remove</Text>
           </TouchableOpacity>

           <TouchableOpacity style={[styles.btn,{backgroundColor:'#000000'}]}>
             <Text style={styles.btnTxt}>Add to cart</Text>
           </TouchableOpacity>
         </View>
       </View>

      </ScrollView>
    <Footer navigation={navigation} />
    </>
  )

}


export default Wishlist;