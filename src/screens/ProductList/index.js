import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, Modal, Dimensions, ImageBackground } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Rating } from 'react-native-ratings';
import Slider from '@react-native-community/slider';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ActionSheet from "react-native-actions-sheet";
import { POST_PRODUCT } from '../../config/ApiConfig';

const actionSheetRef = createRef();
function ProductList({ navigation, route }) {
  const { title1, title2, filterParam } = route.params;
  const [modalVisible, setFilterModalVisible] = useState(false);
  const [data, setSliderData] = useState(10);
 
  const [isLoading, setIsLoading] = useState(true);
  const [Products, setProducts] = useState([]);

  let actionSheet;


  const _getProductList = async (filterParam) => {

    const formData = new FormData();


    for (let key in filterParam) {
      formData.append(key, filterParam[key]);
    }
  
    fetch(POST_PRODUCT, {
      method: "POST",
     
      body: formData
    })

      .then((response) => {

        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {

        if (status == 200) {
         
          setProducts(response.products.product_data);

        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }



  useEffect(() => {
    _getProductList(filterParam);

  }, [navigation, route]);

  return (
    <>
      <Header navigation={navigation} />

      <View style={styles.filterBar}>
        <View style={styles.filterTextBox}>
          <Text style={styles.CategoryText1}>{title1} </Text>
          <Text style={styles.CategoryText2}>{title2}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {
            actionSheetRef.current?.setModalVisible();
          }}>
            <Ionicons name="swap-vertical" style={styles.sortIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setFilterModalVisible(true)}>
            <Image source={require('../../assets/Image/filter.png')} style={styles.filterIcon} />
          </TouchableOpacity>

        </View>

      </View>

      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>


          {isLoading ?
            <>
              <SkeletonPlaceholder>
                <View style={styles.productBox}>
                </View>
              </SkeletonPlaceholder>
              <SkeletonPlaceholder>
                <View style={styles.productBox}>
                </View>
              </SkeletonPlaceholder>
              <SkeletonPlaceholder>
                <View style={styles.productBox}>
                </View>
              </SkeletonPlaceholder>
              <SkeletonPlaceholder>
                <View style={styles.productBox}>
                </View>
              </SkeletonPlaceholder>
              <SkeletonPlaceholder>
                <View style={styles.productBox}>
                </View>
              </SkeletonPlaceholder>
            </>
            :
            <>
              {Products.map((item, key) => (

                <TouchableOpacity onPress={() => {
                  navigation.navigate('ProductDetails');
                }} style={styles.productBox} key={key}>
                 
                  <ImageBackground style={styles.productImage} source={{ uri: item.image_path }} >
                    <TouchableOpacity onLongPress={()=>{
                      console.log("long press");
                    }}>
                    <AntDesign name="hearto" style={styles.heartIcon} />
                    </TouchableOpacity>
                  
                    </ImageBackground>
                  <Text style={styles.productTitle}>{item.products_model}</Text>
                  <Rating
                    startingValue={item.avg_review == null ? 0 : item.avg_review}
                    ratingCount={5}
                    showRating={false}
                    imageSize={20}
                    readonly={true}
                    style={{ alignSelf: 'flex-start', marginLeft: 5 }}
                  />
                  <View style={styles.priceBox}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.sellingPrice}>₹{item.discounted_price}</Text>
                      <Text style={styles.mrpPrice}>₹{item.products_price}</Text>
                    </View>
                    <View style={styles.cartIconBox}>
                      <AntDesign name="shoppingcart" style={styles.cartIcon} />
                    </View>

                  </View>

                </TouchableOpacity>
              ))}
            </>

          } 




        </View>
      </ScrollView>

      <Footer navigation={navigation} />



      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

          setFilterModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={styles.filterAreaMain}>

            <View style={styles.filterArea}>
              <Text style={styles.filterAreaText}>FILTER</Text>
              <TouchableOpacity onPress={() => {
                setFilterModalVisible(!modalVisible)
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
                <Text style={[styles.rangeText, { textAlign: 'center' }]}>₹{data}</Text>
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
                setFilterModalVisible(!modalVisible)
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




      <ActionSheet ref={actionSheetRef}>
        <View style={{ backgroundColor: '#fff', padding: 10 }}>
          <Text style={styles.sortingText}>New Arrival</Text>
          <Text style={styles.sortingText}>Price: Low to High </Text>
          <Text style={styles.sortingText}>Price: High to Low</Text>
          <Text style={styles.sortingText}>Discount: High to Low </Text>
          <Text style={styles.sortingText}>Rating: High to Low </Text>
        </View>
      </ActionSheet>
    </>
  )

}



export default ProductList;