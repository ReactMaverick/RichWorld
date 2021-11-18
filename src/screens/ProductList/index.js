import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Rating } from 'react-native-ratings';
import Slider from '@react-native-community/slider';


function ProductList({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setSliderData] = useState(10);

  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />

      <View style={styles.filterBar}>
        <View style={styles.filterTextBox}>
          <Text style={styles.CategoryText1}>Sport </Text>
          <Text style={styles.CategoryText2}>Socks</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={require('../../assets/Image/filter.png')} style={styles.filterIcon} />
        </TouchableOpacity>

      </View>

      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
        </View>
      </ScrollView>

      <Footer navigation={navigation} />



      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={styles.filterAreaMain}>

            <View style={styles.filterArea}>
              <Text style={styles.filterAreaText}>FILTER</Text>
              <TouchableOpacity onPress={() => {
                setModalVisible(!modalVisible)
              }}>
                <Text style={styles.filterClearText}>Clear All</Text>
              </TouchableOpacity>

            </View>
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.filterOptionsMain}>
                <View style={styles.filterOptions}>
                  <Text style={styles.filterOptionsText}>Categories</Text>
                  <Feather name="chevron-down" style={styles.dropdownIcon} />

                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={styles.filterOptionsSection1}>
                    <Text style={styles.filterOptionsTextOptions}>Men</Text>
                    <Ionicons name="checkmark-done-outline" style={styles.dropdownIcon} />
                  </View>
                  <View style={styles.filterOptionsSection1}>
                    <Text style={styles.filterOptionsTextOptions}>Men</Text>
                    <Ionicons name="checkmark-done-outline" style={styles.dropdownIcon} />
                  </View>
                  <View style={styles.filterOptionsSection1}>
                    <Text style={styles.filterOptionsTextOptions}>Women</Text>
                    <Ionicons name="checkmark-done-outline" style={styles.dropdownIcon} />
                  </View>
                  <View style={styles.filterOptionsSection1}>
                    <Text style={styles.filterOptionsTextOptions}>Kids</Text>
                    <Ionicons name="checkmark-done-outline" style={styles.dropdownIcon} />
                  </View>
                </View>

              </View>

              <View style={styles.filterOptionsMain}>
                <View style={styles.filterOptions}>
                  <Text style={styles.filterOptionsText}>Price Filter</Text>
                  <Feather name="chevron-down" style={styles.dropdownIcon} />

                </View>
                <Text style={[styles.rangeText,{textAlign: 'center'}]  }>₹{data}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                  <Text style={styles.rangeText}>₹0</Text>

                  <Slider
                    maximumValue={100}
                    minimumValue={0}
                    minimumTrackTintColor="#A20101"
                    maximumTrackTintColor="#A20101"
                    step={1}
                    value={data}
                    onValueChange={
                      (sliderValue) => setSliderData(sliderValue)
                    }
                    thumbTintColor="#1B5E20"
                    style={{ width: Dimensions.get('window').width - 100, height: 40 }}
                  />
                  <Text style={styles.rangeText}>₹100</Text>
                </View>

              </View>

              <View style={styles.filterOptionsMain}>
                <View style={styles.filterOptions}>
                  <Text style={styles.filterOptionsText}>Brands</Text>
                  <Feather name="chevron-down" style={styles.dropdownIcon} />

                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={styles.filterOptionsSection1}>
                    <Text style={styles.filterOptionsTextOptions}>Hussking</Text>
                    <Ionicons name="checkmark-done-outline" style={styles.dropdownIcon} />
                  </View>
                  <View style={styles.filterOptionsSection1}>
                    <Text style={styles.filterOptionsTextOptions}>Genteel</Text>
                    <Ionicons name="checkmark-done-outline" style={styles.dropdownIcon} />
                  </View>
                </View>

              </View>
            </ScrollView>
            <View style={styles.outerBtn}>
              <TouchableOpacity onPress={() => {
                setModalVisible(!modalVisible)
              }} style={[styles.btn, { backgroundColor: '#A20101' }]}>
                <Text style={styles.btnTxt}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.btn, { backgroundColor: '#000000' }]}>
                <Text style={styles.btnTxt}>Search</Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </Modal>
    </>
  )

}



function ProductBox({ navigation }) {
  return (
    <TouchableOpacity onPress={() => {
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
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.sellingPrice}>₹26.50 </Text>
          <Text style={styles.mrpPrice}>₹45.85</Text>
        </View>
        <View style={styles.cartIconBox}>
          <AntDesign name="shoppingcart" style={styles.cartIcon} />
        </View>

      </View>

    </TouchableOpacity>
  )
}


export default ProductList;