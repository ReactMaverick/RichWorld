import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator, Dimensions } from 'react-native';
import HeaderHome from "../../components/HeaderHome";
import Footer from "../../components/Footer";
import Swiper from 'react-native-swiper'
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Rating } from 'react-native-ratings';
function HomeScreen({ navigation }) {

  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <HeaderHome navigation={navigation} />

      <ScrollView style={{ flex: 1 }}>
        <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}>
          <View style={styles.slide}>
            <Image source={require('../../assets/Image/ProductImg.png')} style={styles.productSlideImage} />
          </View>

          <View style={styles.slide}>
            <Image source={require('../../assets/Image/ProductImg.png')} style={styles.productSlideImage} />
          </View>

          <View style={styles.slide}>
            <Image source={require('../../assets/Image/ProductImg.png')} style={styles.productSlideImage} />
          </View>


        </Swiper>

        <SectionTitle Title1="FEATURE" title2="PRODUCTS" />
        <ProductBox navigation={navigation} />

        <SectionTitle Title1="BRAND" title2="PRODUCTS" />
        <ProductBox navigation={navigation} />




        <SectionTitle Title1="POPULAR" title2="CATEGORIES" />
        <CategoryItem navigation={navigation} />
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginLeft: 10 }}>
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
        </ScrollView> */}


        <SectionTitle Title1="BEST SELLER" title2="IN LAST MONTH" />
        <ProductBox navigation={navigation} />

      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}

function SectionTitle({ Title1, title2 }) {
  return (
    <View style={styles.titleBox}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.titleStyle1}>{Title1} </Text>
        <Text style={styles.titleStyle2}>{title2}</Text>
      </View>
      {/* <AntDesign name="rightcircleo" style={styles.titleIcon} /> */}
      <TouchableOpacity style={styles.viewAllBtn}>
        <Text style={styles.viewAllBtnText}>View All</Text>
        <AntDesign name="rightcircleo" style={styles.titleIcon} />
      </TouchableOpacity>

    </View>
  )
}

function ProductBox({ navigation }) {
  return (
    <View style={styles.outerProductBox}>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('ProductDetails')
      }} style={styles.productLeft}>
        <Image style={styles.leftImage} source={require('../../assets/Image/uploadImage.png')} />
        <Text style={styles.productTitle}>Husskinzl: Men’s socks</Text>
        <View style={styles.priceBox}>
          <Text style={styles.sellingPrice}>₹26.50 </Text>
          <Text style={styles.mrpPrice}>₹45.85</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.productRight}>
        <TouchableOpacity onPress={()=>{
        navigation.navigate('ProductDetails')
      }} style={[styles.productInner, { marginBottom: 10 }]}>
          <Image style={styles.rightImage} source={require('../../assets/Image/ProductImg.png')} />
          <Text style={styles.productTitle}>Husskinzl: Men’s socks</Text>
          <View style={styles.priceBox}>
            <Text style={styles.sellingPrice}>₹26.50 </Text>
            <Text style={styles.mrpPrice}>₹45.85</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
        navigation.navigate('ProductDetails')
      }} style={styles.productInner}>
          <Image style={styles.rightImage} source={require('../../assets/Image/ProductImg.png')} />
          <Text style={styles.productTitle}>Husskinzl: Men’s socks</Text>
          <View style={styles.priceBox}>
            <Text style={styles.sellingPrice}>₹26.50 </Text>
            <Text style={styles.mrpPrice}>₹45.85</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}


function CategoryItem({ navigation }) {
  return (
    <View style={styles.outerProductBox}>
    <TouchableOpacity  onPress={()=>{
        navigation.navigate('ProductList')
      }} style={styles.productLeft}>
      <Image style={styles.leftImageCategory} source={require('../../assets/Image/uploadImage.png')} />
      <Text style={styles.productTitle}> Men’s socks</Text>
     
    </TouchableOpacity>
    <View style={styles.productRight}>
      <TouchableOpacity  onPress={()=>{
        navigation.navigate('ProductList')
      }} style={[styles.productInner, { marginBottom: 10 }]}>
        <Image style={styles.rightImageCategory} source={require('../../assets/Image/ProductImg.png')} />
        <Text style={styles.productTitle}> Men’s socks</Text>
      
      </TouchableOpacity>

      <TouchableOpacity  onPress={()=>{
        navigation.navigate('ProductList')
      }} style={styles.productInner}>
        <Image style={styles.rightImageCategory} source={require('../../assets/Image/ProductImg.png')} />
        <Text style={styles.productTitle}> Men’s socks</Text>
       
      </TouchableOpacity>
    </View>
  </View>
  )
}
export default HomeScreen;