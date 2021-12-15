import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, Modal, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
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
import { POST_PRODUCT, ADD_WISHLIST, GET_ALL_CATEGORY } from '../../config/ApiConfig';
import DeviceInfo from 'react-native-device-info';

import AsyncStorage from '@react-native-async-storage/async-storage';

const actionSheetRef = createRef();
function ProductList({ navigation, route }) {
  const { title1, title2, filterParam } = route.params;
  const [modalVisible, setFilterModalVisible] = useState(false);
  const [data, setSliderData] = useState(10);

  const [isLoading, setIsLoading] = useState(true);
  const [Products, setProducts] = useState([]);
  const [attrList, setAttrList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [allCategory, setaAllCategory] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({});
  // category selected value
  const [catgorySelected, setSelectedCategory] = useState("");
  const [selectedBrands, setSelectedBrands] = useState("");
  const [selectedClassification, setSelectedClassification] = useState("");
  const [selectedOptions, setSelectedOptions] = useState("");


  let actionSheet;

  const _getProductList = async (filterParam, androidId, user_id) => {
    setIsLoading(true)
    const formData = new FormData();


    for (let key in filterParam) {
      formData.append(key, filterParam[key]);
    }
    formData.append('session_id', androidId);
    formData.append('customers_id', user_id);
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
          //  console.log(JSON.stringify(response.brandList, null, " "));
          setProducts(response.products.product_data);

          setAttrList(response.filters.attr_data);
          setBrandList(response.brandList);
          setClassificationList(response.classificationList);

        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }

  const _getAllCategory = async () => {
    setIsLoading(true)

    fetch(GET_ALL_CATEGORY, {
      method: "GET",
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          // console.log(JSON.stringify(response, null, " "));
          setaAllCategory(response.allCategory)
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }

  const _addToWishlist = (products_id, products_attributes_prices_id, key) => {
    setIsLoading(true)
    const formData = new FormData();

    formData.append('customers_id', userData.id);
    formData.append('products_id', products_id);
    formData.append('products_attributes_prices_id', products_attributes_prices_id);

    fetch(ADD_WISHLIST, {
      method: "POST",
      body: formData
    }).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    }).then(([status, response]) => {
      if (status == 200) {

        var ProductsData = Products;
        if (response.result.success == 1) {
          ProductsData[key].isLiked = 0;
        } else if (response.result.success == 2) {
          ProductsData[key].isLiked = 1;
        }

        setProducts(ProductsData);
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
    AsyncStorage.getItem('userData').then((userData) => {
      if (userData != null) {
        setIsLogin(true)
        setUserData(JSON.parse(userData))
        var userDetails = JSON.parse(userData)
        _getProductList(filterParam, "", userDetails.id);
        _getAllCategory();
      } else {
        setIsLogin(false)
        DeviceInfo.getAndroidId().then((androidId) => {
          _getProductList(filterParam, androidId, "");
          _getAllCategory();
        });
      }
    })
  }, [navigation, route]);



  if (isLoading) {
    return (
      <>
        <ActivityIndicator size="large" color="#AB0000" />
      </>
    )
  } else {

    return (
      <>
        <Header navigation={navigation} />
        {isLoading ? <ActivityIndicator size="large" color="#AB0000" /> : <></>}
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
                    navigation.navigate('ProductDetails', { products_id: item.products_id, products_attributes_prices_id: item.products_attributes_prices_id });
                  }} style={styles.productBox} key={key}>

                    <ImageBackground style={styles.productImage} source={{ uri: item.image_path }} >

                      {isLogin ? <TouchableOpacity onPress={() => {
                        console.log("long press");
                        _addToWishlist(item.products_id, item.products_attributes_prices_id, key)
                      }}>
                        <>
                          {item.isLiked != 0 ?
                            <AntDesign name="heart" style={styles.heartIcon} />
                            :
                            <AntDesign name="hearto" style={styles.heartIcon} />
                          }
                        </>
                      </TouchableOpacity> : <></>}

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
                    {allCategory.map((item, key) => (
                      <TouchableOpacity style={styles.filterOptionsSection1} key={key} onPress={() => {
                        setSelectedCategory(item.slug)
                      }}>
                        <Text style={styles.filterOptionsTextOptions}>{item.name}</Text>
                        {catgorySelected == item.slug ?
                          <Ionicons name="checkmark-done-outline" style={styles.dropdownIcon} />
                          :
                          <></>
                        }
                      </TouchableOpacity>
                    ))}


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

                    {brandList.map((item, key) => (
                      <TouchableOpacity style={styles.filterOptionsSection1} key={key} onPress={() => {
                        var tempBrands = selectedBrands;
                        if (selectedBrands.includes(item.brands_name)) {
                          tempBrands = tempBrands.replace(item.brands_name + ',', '');
                        } else {
                          tempBrands += item.brands_name + ',';
                        }
                        setSelectedBrands(tempBrands)
                        console.log(selectedBrands)
                      }}>
                        <Text style={styles.filterOptionsTextOptions}>{item.brands_name} </Text>
                        {(selectedBrands.includes(item.brands_name)) ?
                          <Ionicons name="checkmark-done-outline" style={styles.dropdownIcon} />
                          :
                          <></>
                        }
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {classificationList.map((item, key) => (
                <View style={styles.filterOptionsMain} key={key}>
                  <View style={styles.filterOptions}>
                    <Text style={styles.filterOptionsText}>{item.classifications_name}</Text>
                    <Feather name="chevron-down" style={styles.dropdownIcon} />
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {item.classificationValue.map((item2, key2) => (
                      <TouchableOpacity style={styles.filterOptionsSection1} key={key2} onPress={() => {
                        var tempClassification = selectedClassification;
                        if (tempClassification.includes(item2.classification_value_name)) {
                          tempClassification = tempClassification.replace(item2.classification_value_name + ',', '');
                        } else {
                          tempClassification += item2.classification_value_name + ',';
                        }
                        setSelectedClassification(tempClassification)
                        console.log(tempClassification)
                      }}>
                        <Text style={styles.filterOptionsTextOptions}>{item2.classification_value_name}</Text>
                        {(selectedClassification.includes(item2.classification_value_name)) ?
                          <Ionicons name="checkmark-done-outline" style={styles.dropdownIcon} />
                          :
                          <></>
                        }
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                ))}
                
                {attrList.map((item, key) => (
                  <View style={styles.filterOptionsMain} key={key}>
                    <View style={styles.filterOptions}>
                      <Text style={styles.filterOptionsText}>{item.option.name}</Text>
                      <Feather name="chevron-down" style={styles.dropdownIcon} />
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {item.values.map((item2, key2) => (
                        <TouchableOpacity style={styles.filterOptionsSection1} key={key2} onPress={() => {
                          var tempOptions = selectedOptions;
                          if (tempOptions.includes(item.option.name+'-'+item2.value)) {
                            tempOptions = tempOptions.replace(item.option.name+'-'+item2.value + ',', '');
                          } else {
                            tempOptions += item.option.name+'-'+item2.value + ',';
                          }
                          setSelectedOptions(tempOptions)
                          console.log(tempOptions)
                        }}>
                          <Text style={styles.filterOptionsTextOptions}>{item2.value}</Text>
                          {(selectedOptions.includes(item.option.name+'-'+item2.value)) ?
                          <Ionicons name="checkmark-done-outline" style={styles.dropdownIcon} />
                          :
                          <></>
                        }
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
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

}



export default ProductList;