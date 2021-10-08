import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";


function Blog({ navigation }) {

  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>Blog</Text>
      </View>
      <ScrollView >
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />

          <View style={styles.loadMorebtn}><Text style={styles.loadMoreTxt}>Load More</Text></View>


        </View>
        <Text style={[styles.CategoryText2,{marginLeft:10}]}>Recent Posts</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginLeft: 10}}>
      <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
      </ScrollView>
      </ScrollView>
      
      <Footer navigation={navigation} />
    </>
  )

}



function ProductBox({ navigation }) {
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('BlogDetails');
    }} style={styles.productBox}>
      <Image style={styles.productImage} source={require('../../assets/Image/blog1.png')} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.productTitle}>News |</Text>
        <Text style={[styles.productTitle, { color: '#818181' }]}>May 25, 2020</Text>
      </View>


      <Text style={styles.productTitle}>Five things you only know if you’re at...</Text>

    </TouchableOpacity>
  )
}

export default Blog;