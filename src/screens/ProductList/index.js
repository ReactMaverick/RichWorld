import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, Modal, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Rating } from 'react-native-ratings';
import Slider from '@react-native-community/slider';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ActionSheet from "react-native-actions-sheet";
import { POST_PRODUCT, ADD_WISHLIST, GET_ALL_CATEGORY, IMAGE_BASE_URL } from '../../config/ApiConfig';
import DeviceInfo from 'react-native-device-info';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const actionSheetRef = createRef();
function ProductList({ navigation, route }) {
  const { title1, title2 } = route.params;

  const [filterParam, setFilterParam] = useState(route.params.filterParam)
  const [filterParamReset, setFilterParamReset] = useState(route.params.filterParam)
  const [modalVisible, setFilterModalVisible] = useState(false);
  const [data, setSliderData] = useState(50);
  const [androidId, setAndroidId] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [Products, setProducts] = useState([]);
  const [attrList, setAttrList] = useState([]);
  const [maxPrice, setMaxPrice] = useState(200);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(0);
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
  const [filterApplyed, setFilterApplyed] = useState(false);

  let actionSheet;
  const _loadMore = () => {
    setIsLoadingLoadMore(true)
    const formData = new FormData();
    for (let key in filterParam) {
      formData.append(key, filterParam[key]);
    }
    formData.append('session_id', androidId);
    formData.append('customers_id', userData != null ? userData.id : "");
    formData.append('page', parseInt(pageNo) + 1);
    formData.append('limit', 6);
    console.log(JSON.stringify(formData, null, " "));
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
        // console.log(status, response)
        if (status == 200) {
          if (response.products.product_data.length > 0) {
            setPageNo(parseInt(pageNo) + 1)
            var tempProducts = Products.concat(response.products.product_data);
            setProducts(tempProducts)
          }
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoadingLoadMore(false)
      });
  }
  const _getProductList = (filterParam, androidId, user_id, callFrom = "") => {
    setPageNo(0)
    if (callFrom != "clearAll") {
      setIsLoading(true)
    }
    setIsLoading(true)
    const formData = new FormData();
    if (callFrom != "clearAll") {
      for (let key in filterParam) {
        formData.append(key, filterParam[key]);
      }
    } else {
      for (let key in filterParamReset) {
        formData.append(key, filterParamReset[key]);
      }
    }

    formData.append('session_id', androidId);
    formData.append('customers_id', user_id);
    formData.append('page', 0);
    formData.append('limit', 6);
    // console.log(JSON.stringify(formData, null, " "));
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
          setMaxPrice(response.filters.maxPrice)
          setBrandList(response.brandList);
          setClassificationList(response.classificationList);
          if (response.max_price == "") {
            setMaxPriceFilter(response.filters.maxPrice)
          } else {
            setMaxPriceFilter(parseInt(response.max_price))
          }

          if (callFrom != "clearAll") {
            setFilterModalVisible(false)
          }
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }
  const _changeCategory = (id) => {
    if (catgorySelected != id) {
      setSelectedCategory(id);
      setSelectedBrands("");
      setSelectedClassification("");
      setSelectedOptions("");
      setMaxPriceFilter(maxPrice)
    } else {
      setSelectedCategory(id);
    }
  }
  const _applyFilters = async (type = null) => {
    setFilterApplyed(true)
    let tempFilterParam = {};
    if (type != null) {
      tempFilterParam.type = type;
    }
    tempFilterParam.categories_id = catgorySelected;
    tempFilterParam.brands_id = selectedBrands.substring(0, selectedBrands.length - 1);
    tempFilterParam.classification_values_ids = selectedClassification.substring(0, selectedClassification.length - 1);
    tempFilterParam.attr_value_ids = selectedOptions.substring(0, selectedOptions.length - 1);
    tempFilterParam.min_price = 0;
    tempFilterParam.max_price = maxPriceFilter;
    tempFilterParam.filters_applied = 1;
    setFilterParam(tempFilterParam)
    if (isLogin) {
      _getProductList(tempFilterParam, "", userData.id);
    } else {
      _getProductList(tempFilterParam, androidId, "");
    }

  }


  const _clearFilters = async () => {
    setSelectedCategory("");
    setSelectedBrands("");
    setSelectedClassification("");
    setSelectedOptions("");
    setFilterApplyed(false)
    let tempFilterParam = filterParam;
    if (isLogin) {
      _getProductList(tempFilterParam, "", userData.id, "clearAll");
    } else {
      _getProductList(tempFilterParam, androidId, "", "clearAll");
    }

  }

  const _getAllCategory = async () => {
    // setIsLoading(true)

    fetch(GET_ALL_CATEGORY + 0, {
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
        // setIsLoading(false)
      });
  }
  const stringFormat = (str) => {
    if (str.length > 40) {
      return str.substring(0, 40) + '...';
    } else {
      return str;
    }
  }
  // const discountPercentage = (products_price, pro_discount_rate) => {
  //   console.log(products_price, pro_discount_rate);
  //   var mProDiscount = ( products_price * pro_discount_rate )/100;
  //   return mProDiscount;
  // }

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

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 1;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  };

  useEffect(() => {
    setIsLoading(true)
    // console.log("useeffect");
    setSelectedCategory("");
    setSelectedBrands("");
    setSelectedClassification("");
    setSelectedOptions("");
    setFilterApplyed(false)
    let t = setTimeout(() => {
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
            setAndroidId(androidId);
            _getProductList(filterParam, androidId, "");
            _getAllCategory();
          });
        }
      })
    }, 2000)

    return () => clearTimeout(t);
  }, [navigation, route]);


  if (isLoading) {
    return (
      <>
        <Header navigation={navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#620000" />
        </View>
      </>
    )
  } else {
    return (
      <>
        <Header navigation={navigation} backArrow={true} />
        <View style={styles.filterBar}>
          <View style={styles.filterTextBox}>
            {filterApplyed ?
              <></>
              :
              <>
                <Text style={styles.CategoryText1}>{title1} </Text>
                <Text style={styles.CategoryText2}>{title2}</Text>
              </>
            }

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

        <ScrollView onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            // enableSomeButton();
            _loadMore()
            console.log("rich to bottom")
          }
        }}>
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
                {Products.length > 0 ?
                  Products.map((item, key) => (

                    <TouchableOpacity onPress={() => {
                      navigation.navigate('ProductDetails', { products_id: item.products_id, products_attributes_prices_id: item.products_attributes_prices_id });
                    }} style={styles.productBox} key={key}>
                      <View style={styles.productBoxInner}>
                        <ImageBackground imageStyle={{ borderRadius: 10 }} style={styles.productImage} source={{ uri: IMAGE_BASE_URL + item.default_thumb }} >
                          <View style={styles.cartIconOuter}>
                            <View style={styles.cartIconBoxSqure}>
                              {/* <AntDesign name="shoppingcart" style={styles.cartIcon} /> */}
                              {item.pro_discount_rate != 0 &&
                                <Text style={styles.discountText}>{Math.round(item.pro_discount_rate)} %</Text>
                              }

                            </View>
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
                          </View>
                        </ImageBackground>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text style={styles.productTitle2}>{stringFormat(item.brands_name)}</Text>
                          <Rating
                            startingValue={item.avg_review == null ? 0 : item.avg_review}
                            ratingCount={5}
                            showRating={false}
                            imageSize={12}
                            readonly={true}
                            style={{ marginRight: 5 }}
                          />
                        </View>
                        <Text style={styles.productTitle}>{stringFormat(item.products_name)}</Text>
                        <View style={styles.priceBox}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <FontAwesome name="inr" style={styles.sellingPrice} /><Text style={styles.sellingPrice}>{item.discounted_price} </Text>
                            <FontAwesome name="inr" style={styles.mrpPrice} /><Text style={styles.mrpPrice}>{item.products_price}</Text>
                          </View>

                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                  :
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.sellingPrice}>No Products Found! </Text>
                  </View>
                }
                {isLoadingLoadMore ?
                  <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 30 }}>
                    <ActivityIndicator size="large" color="#620000" />
                  </View>
                  :<></>
                }
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
          style={{ marginVertical: Platform.OS == "android" ? 0 : 45 }}
        >
          <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS == "android" ? 0 : 30 }}>
            <View style={styles.filterAreaMain}>

              <View style={styles.filterArea}>
                <Text style={styles.filterAreaText}>FILTER</Text>
                <TouchableOpacity onPress={() => {
                  _clearFilters();
                  // setFilterModalVisible(!modalVisible)
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
                        _changeCategory(item.id)
                      }}>
                        <Text style={styles.filterOptionsTextOptions}>{item.name}</Text>
                        {catgorySelected == item.id ?
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
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesome name="inr" style={styles.rangeText} /><Text style={styles.rangeText}>{maxPriceFilter}</Text>
                  </View>
                  {/* <FontAwesome name="inr" style={styles.rangeText} /><Text style={[styles.rangeText, { textAlign: 'center' }]}>${maxPriceFilter}</Text> */}
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                    <FontAwesome name="inr" style={styles.rangeText} /><Text style={styles.rangeText}>{minPrice}</Text>

                    <Slider
                      maximumValue={maxPrice}
                      minimumValue={minPrice}
                      minimumTrackTintColor="#A20101"
                      maximumTrackTintColor="#A20101"
                      step={1}
                      value={maxPriceFilter}
                      onValueChange={
                        (sliderValue) => setMaxPriceFilter(sliderValue)
                      }
                      thumbTintColor="#1B5E20"
                      style={{ width: Dimensions.get('window').width - 100, height: 40 }}
                    />

                    <FontAwesome name="inr" style={styles.rangeText} /><Text style={styles.rangeText}>{maxPrice}</Text>
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
                        if (selectedBrands.includes(item.brands_id)) {
                          tempBrands = tempBrands.replace(item.brands_id + ',', '');
                        } else {
                          tempBrands += item.brands_id + ',';
                        }
                        setSelectedBrands(tempBrands)
                        console.log(selectedBrands)
                      }}>
                        <Text style={styles.filterOptionsTextOptions}>{item.brands_name} </Text>
                        {(selectedBrands.includes(item.brands_id)) ?
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
                          if (tempClassification.includes(item2.classification_values_id)) {
                            tempClassification = tempClassification.replace(item2.classification_values_id + ',', '');
                          } else {
                            tempClassification += item2.classification_values_id + ',';
                          }
                          setSelectedClassification(tempClassification)
                          console.log(tempClassification)
                        }}>
                          <Text style={styles.filterOptionsTextOptions}>{item2.classification_value_name}</Text>
                          {(selectedClassification.includes(item2.classification_values_id)) ?
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
                          if (tempOptions.includes(item2.value_id)) {
                            tempOptions = tempOptions.replace(item2.value_id + ',', '');
                          } else {
                            tempOptions += item2.value_id + ',';
                          }
                          setSelectedOptions(tempOptions)
                          console.log(tempOptions)
                        }}>
                          <Text style={styles.filterOptionsTextOptions}>{item2.value}</Text>
                          {(selectedOptions.includes(item2.value_id)) ?
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

                <TouchableOpacity style={[styles.btn, { backgroundColor: '#000000' }]} onPress={() => {
                  _applyFilters(null)
                }}>
                  <Text style={styles.btnTxt}>Search</Text>
                </TouchableOpacity>
              </View>


            </View>
          </View>
        </Modal>




        <ActionSheet ref={actionSheetRef}>
          <View style={{ backgroundColor: '#fff', padding: 10 }}>

            <TouchableOpacity onPress={() => {
              if (filterApplyed) {
                _applyFilters(null);
              } else {
                if (isLogin) {
                  _getProductList(filterParam, "", userData.id);
                } else {
                  _getProductList(filterParam, androidId, "");
                }
              }

            }}>
              <Text style={styles.sortingText}>New Arrival</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              if (filterApplyed) {
                _applyFilters("lowtohigh");
              } else {
                var tempFilters = filterParam;
                tempFilters.type = "lowtohigh";
                if (isLogin) {
                  _getProductList(tempFilters, "", userData.id);
                } else {
                  _getProductList(tempFilters, androidId, "");
                }
              }

            }}>
              <Text style={styles.sortingText}>Price: Low to High </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              if (filterApplyed) {
                _applyFilters("hightolow");
              } else {
                var tempFilters = filterParam;
                tempFilters.type = "hightolow";
                if (isLogin) {
                  _getProductList(tempFilters, "", userData.id);
                } else {
                  _getProductList(tempFilters, androidId, "");
                }
              }

            }}>
              <Text style={styles.sortingText}>Price: High to Low</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              if (filterApplyed) {
                _applyFilters("discounthightolow");
              } else {
                var tempFilters = filterParam;
                tempFilters.type = "discounthightolow";
                if (isLogin) {
                  _getProductList(tempFilters, "", userData.id);
                } else {
                  _getProductList(tempFilters, androidId, "");
                }
              }

            }}>
              <Text style={styles.sortingText}>Discount: High to Low </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              if (filterApplyed) {
                _applyFilters("ratinghightolow");
              } else {
                var tempFilters = filterParam;
                tempFilters.type = "ratinghightolow";
                if (isLogin) {
                  _getProductList(tempFilters, "", userData.id);
                } else {
                  _getProductList(tempFilters, androidId, "");
                }
              }

            }}>
              <Text style={styles.sortingText}>Rating: High to Low </Text>
            </TouchableOpacity>

          </View>
        </ActionSheet>
      </>
    )
  }

}



export default ProductList;