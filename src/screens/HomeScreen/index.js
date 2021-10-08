import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator, Dimensions } from 'react-native';
import Header from "../../components/Header";
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
      <Header navigation={navigation} />

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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ProductBox navigation={navigation}/>
          <ProductBox navigation={navigation}/>
          <ProductBox navigation={navigation}/>
        </ScrollView>

        <SectionTitle Title1="POPULAR" title2="CATEGORIES" />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginLeft: 10 }}>
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
        </ScrollView>


        <SectionTitle Title1="BEST SELLER" title2="IN LAST MONTH" />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ProductBox navigation={navigation}/>
          <ProductBox navigation={navigation}/>
          <ProductBox navigation={navigation}/>
        </ScrollView>


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
      <AntDesign name="rightcircleo" style={styles.titleIcon} />

    </View>
  )
}

function ProductBox({navigation }) {
  return (
    <TouchableOpacity onPress={()=>{
      navigation.navigate('ProductDetails');
    }} style={styles.productBox}>
      <Image style={styles.productImage} source={require('../../assets/Image/ProductImg.png')} />
      <Text style={styles.productTitle}>Husskinzl: Men’s socks</Text>
      <Rating
        startingValue={2}
        ratingCount={5}
        showRating={false}
        imageSize={20}
        style={{ alignSelf: 'flex-start', marginLeft: 5 }}
      />
      <View style={styles.priceBox}>
        <Text style={styles.sellingPrice}>₹26.50 </Text>
        <Text style={styles.mrpPrice}>₹45.85</Text>
      </View>
    </TouchableOpacity>
  )
}


function CategoryItem({ }) {
  return (
    <View style={styles.categoryOuter}>

      <Image style={styles.categoryImage} source={require('../../assets/Image/ProductImg.png')} borderRadius={50} />

      <Text style={styles.categoryName}>Shocks</Text>
    </View>
  )
}
export default HomeScreen;