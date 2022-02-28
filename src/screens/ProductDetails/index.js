import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput, ActivityIndicator, ImageBackground, Share } from 'react-native';
import Header from "../../components/Header";
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import HTMLView from 'react-native-htmlview';
import { Rating } from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DeviceInfo from 'react-native-device-info';
import { GET_PRODUCT_DETAILS, ADD_TO_CART, ADD_WISHLIST, GET_ATTRIBUTE_PRICE_ID, CHECK_PINCODE, NOTIFY_PRODUCT, VIEW_CART, PRODUCT_DES_URL, PRODUCTS_URL } from '../../config/ApiConfig'
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { WebView } from 'react-native-webview';

function ProductDetails({ navigation, route }) {
  const dispatch = useDispatch();
  const { products_id, products_attributes_prices_id } = route.params;
  const [productsAttributesPricesId, setProductsAttributesPricesId] = useState("");
  const [tab, setTab] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [productImage, setProductImage] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);
  const [bulkPriceList, setBulkPriceList] = useState([]);
  const [productReview, setProductReview] = useState([]);
  const [highListedImage, setHighListedImage] = useState();
  const [basePath, setBasePath] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [androidId, setAndroidId] = useState("");
  const [activeAttributeIds, setActiveAttributeIds] = useState("");
  const [pincode, setpincode] = useState("");
  const [pincodeMessage, setPincodeMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productPrice, setProductPrice] = useState("");
  const [productUrl, setProductUrl] = useState("");





  const _productDetails =  (customers_id, deviceId, products_id, products_attributes_prices_id) => {
    // console.log("products_id: ", products_id);
    // console.log("products_attributes_prices_id: ", products_attributes_prices_id);
    setIsLoading(true)
    fetch(GET_PRODUCT_DETAILS + 'products_id=' + products_id + '&products_attributes_prices_id=' + products_attributes_prices_id + '&customers_id=' + customers_id + '&session_id=' + deviceId, {
      method: "GET",
    })
      .then((response) => {

        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {

        if (status == 200) {
          // console.log('details', response.detail.product_data[0]);
          setProductImage(response.detail.product_data[0]['images']);
          setProductDetails(response.detail.product_data[0]);
          var productUrl = PRODUCTS_URL+productDetails.products_slug;
          var attributes = response.detail.product_data[0].attributes;
          if(attributes.length > 0){
            productUrl += '?';
            for (let i = 0; i < attributes.length; i++) {
              if( attributes.length != i+1 ){
                productUrl = productUrl + attributes[i].option.product_option_slug + "=" + attributes[i].values1[0].value + "&";
              }else{
                productUrl = productUrl + attributes[i].option.product_option_slug + "=" + attributes[i].values1[0].value;
              }
            }
          }
          setProductUrl(productUrl)
          // console.log('productUrl',productUrl);
          // console.log('prod_attributeids',response.detail.product_data[0].attributes[0]);
          setActiveAttributeIds(response.detail.product_data[0].prod_attributeids);
          // console.log(response.detail.product_data[0].prod_attributeids)
          setProductAttributes(attributes);
          setQuantity(response.detail.product_data[0].products_min_order);
          setProductPrice(response.detail.product_data[0].discounted_price);
         
          if (response.detail.product_data[0].BulkPriceList != undefined) {
            setBulkPriceList(response.detail.product_data[0].BulkPriceList);
          }
          if (response.product_review != undefined) {
            setProductReview(response.product_review);
          }
          if (response.detail.product_data[0]['images'].length > 0) {
            setHighListedImage(response.detail.product_data[0]['images'][0].image_path)
          } else {
            setHighListedImage(response.detail.product_data[0].image_path)
          }
          setBasePath(response.base_path);

        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }

  const _initialize_cart = async (customers_id, session_id) => {
    fetch(VIEW_CART + 'customers_id=' + customers_id + '&session_id=' + session_id + '&shopNow=', {
      method: "get",
    })
      .then((response) => {

        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          dispatch({
            type: "INTIALIZE_CART",
            payload: response.cart,
          });
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {

      });
  }
  const _addToCart = (quantity) => {
    setIsLoading(true)
    const formData = new FormData();
    var customers_id = "";
    var session_id = "";
    if (isLogin) {
      customers_id = userData.id;
    } else {
      session_id = androidId;
    }
    formData.append('customers_id', customers_id);
    formData.append('session_id', session_id);
    formData.append('products_id', products_id);
    formData.append('prod_attributeids', productDetails.prod_attributeids);
    formData.append('quantity', quantity);
    fetch(ADD_TO_CART, {
      method: "POST",
      body: formData
    }).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    }).then(([status, response]) => {
      if (status == 200) {
        showMessage({
          message: "Item added to yor Cart!",
          type: "info",
          backgroundColor: "#808080",
        });
        var customers_id = "";
        var session_id = "";
        if (isLogin) {
          customers_id = userData.id;
        } else {
          session_id = androidId;
        }
        _initialize_cart(customers_id, session_id)
        _productDetails(customers_id, session_id, products_id, productsAttributesPricesId)
      }
    })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }
  const _buyNow = (quantity) => {
    // setIsLoading(true)
    const formData = new FormData();
    var customers_id = "";
    var session_id = "";
    if (isLogin) {
      customers_id = userData.id;
    } else {
      session_id = androidId;
    }
    formData.append('customers_id', customers_id);
    formData.append('session_id', session_id);
    formData.append('products_id', products_id);
    formData.append('prod_attributeids', productDetails.prod_attributeids);
    formData.append('quantity', quantity);
    formData.append('shopNow', 1);
    // console.log(formData)
    fetch(ADD_TO_CART, {
      method: "POST",
      body: formData
    }).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    }).then(([status, response]) => {
      if (status == 200) {
        navigation.navigate('MyCart', { shopNow: 1 });
      }
    })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }

  const _changeActiveAttributeIds = (old_products_attributes_id, new_products_attributes_id) => {
    var attributes_ids = activeAttributeIds.replace(old_products_attributes_id, new_products_attributes_id);
    // console.log("old_products_attributes_id", old_products_attributes_id)
    // console.log("new_products_attributes_id", new_products_attributes_id)
    // console.log(activeAttributeIds)
    // console.log(attributes_ids)
    setActiveAttributeIds(attributes_ids);
    setIsLoading(true)
    const formData = new FormData();
    formData.append('products_id', products_id);
    formData.append('prod_attributeids', attributes_ids);

    fetch(GET_ATTRIBUTE_PRICE_ID, {
      method: "POST",
      body: formData
    }).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    }).then(([status, response]) => {
      if (status == 200) {
        setProductsAttributesPricesId(response.products_attributes_prices_id)
        if (isLogin) {
          _productDetails(userData.id, "", products_id, response.products_attributes_prices_id)
        } else {
          _productDetails("", androidId, products_id, response.products_attributes_prices_id)
        }

      }
    })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });

  }
  const _checkPincode = () => {
    // setIsLoading(true)
    fetch(CHECK_PINCODE + pincode, {
      method: "GET",
    })
      .then((response) => {

        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          console.log(JSON.stringify(response, null, " "));
          setPincodeMessage(response.massage);
        } else {
          console.log(status, response);

        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }
  const _notifyProduct = () => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('customers_id', userData.id);
    formData.append('products_id', products_id);
    formData.append('products_attributes_prices_id', products_attributes_prices_id);

    fetch(NOTIFY_PRODUCT, {
      method: "POST",
      body: formData
    }).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    }).then(([status, response]) => {
      if (status == 200) {
        showMessage({
          message: response.message,
          type: "info",
          backgroundColor: "#808080",
        });

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


        var productDetailsData = productDetails;
        if (response.result.success == 1) {
          productDetailsData.isLiked = 0;
        } else if (response.result.success == 2) {
          productDetailsData.isLiked = 1;
        }

        setProductDetails(productDetailsData);
      } else {
        console.log(status, response);
      }
    })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }
  const _minusQuantity = async (products_min_order) => {
    var newQuantity = quantity;
    if (quantity > products_min_order) {
      newQuantity = quantity - 1;
      setQuantity(newQuantity)
    }
    return newQuantity;
  }
  const _plusQuantity = async (products_max_stock, defaultStock) => {
    var newQuantity = quantity;
    if (quantity < products_max_stock) {
      if (quantity < defaultStock) {
        newQuantity = quantity + 1;
        setQuantity(newQuantity)
      }
    }
    return newQuantity;
  }
  const _priceUpdate = (newQuantity) => {
    var ch = 0;
    productDetails.BulkPriceList.map((item) => {
      if (newQuantity >= item.minimum_quantity && newQuantity <= item.maximum_quantity) {
        setProductPrice(item.bulk_selling_price)
        ch = 1
      }
    })
    if (ch == 0) {
      setProductPrice(productDetails.discounted_price)
    }
  }
  const _shareProduct = async () => {
    
    try {
        const result = await Share.share({
          title: 'https://www.richworld.online/',
          message: productUrl,
          url: productUrl
        });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    setProductsAttributesPricesId(products_attributes_prices_id)
    AsyncStorage.getItem('userData').then((userData) => {
      if (userData != null) {
        setIsLogin(true)
        setUserData(JSON.parse(userData))
        var userDetails = JSON.parse(userData)
        _productDetails(userDetails.id, "", products_id, products_attributes_prices_id)
      } else {
        setIsLogin(false)
        DeviceInfo.getAndroidId().then((androidId) => {
          setAndroidId(androidId)
          _productDetails("", androidId, products_id, products_attributes_prices_id)
        });
      }
    })

  }, [navigation, route]);
  if (isLoading) {
    return (
      <>
        <Header navigation={navigation} backArrow={true} />
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
            <Text style={styles.CategoryText1}>{productDetails.brands_name} </Text>
            {/* <Text style={styles.CategoryText2}>Socks</Text> */}
          </View>
          {isLogin ?
            <TouchableOpacity onPress={() => {
              _addToWishlist(products_id, products_attributes_prices_id)
            }}>
              {productDetails.isLiked != 0 ?
                <AntDesign name="heart" style={styles.heartIcon} />
                :
                <AntDesign name="hearto" style={styles.heartIcon} />
              }
            </TouchableOpacity>
            :
            <></>}

        </View>
        <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
          <View style={styles.productImageSection}>
            <Image source={{ uri: highListedImage }} style={styles.productZoomImage} />
            <View style={styles.imageThumbSection}>
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                {productImage.length > 0 ?
                  <>
                    {productImage.map((item, key) => (
                      <TouchableOpacity key={key} onPress={() => {
                        setHighListedImage(item.image_path)
                      }}>
                        <ImageBackground style={styles.productThumb} source={{ uri: item.image_path }} resizeMode="contain" />
                        {/* <Image source={{ uri: item.image_path }} style={styles.productThumb} /> */}
                      </TouchableOpacity>

                    ))}
                  </>
                  :
                  <>
                    <TouchableOpacity >
                      <Image source={{ uri: productDetails.image_path }} style={styles.productThumb} />
                    </TouchableOpacity>
                  </>}


              </ScrollView>
            </View>
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.productTitle}>{productDetails.products_model}</Text>
            <TouchableOpacity onPress={() => {
              _shareProduct()
            }}>
              <FontAwesome name="share-square-o" style={styles.shareIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.productDetails}>
            <View style={styles.ratingSection}>
              <View style={styles.ratingText}>
                <FontAwesome name="inr" style={styles.sellingPrice} /><Text style={styles.sellingPrice}>{productPrice}  </Text>
                <FontAwesome name="inr" style={styles.mrpPrice} /><Text style={styles.mrpPrice}>{productDetails.products_price} </Text>
              </View>
              <View style={styles.ratingStar}>
                <Rating
                  startingValue={productDetails.avg_review == null ? 0 : productDetails.avg_review}
                  ratingCount={5}
                  showRating={false}
                  imageSize={20}
                  readonly={true}
                  style={{ alignSelf: 'flex-end', marginLeft: 5 }}
                />
                <Text style={styles.reviewText}>({productReview.length} Reviews)</Text>
              </View>


            </View>
            <Text style={styles.descriptionText}>{productDetails.products_name} </Text>

            <View style={styles.attribute}>
              <Text style={styles.attributeLeft}>Quantity :</Text>
              <View style={styles.attributeRight}>
                <View style={styles.quantityOuter}>
                  <TouchableOpacity style={styles.quantityInnerBtn} onPress={() => {
                    _minusQuantity(productDetails.products_min_order).then((newQuantity) => {
                      // console.log('quantity',newQuantity);
                      _priceUpdate(newQuantity)
                    })

                  }} >
                    <AntDesign name="minus" style={{ color: '#A20101', fontSize: 20 }} />
                  </TouchableOpacity>
                  <View style={styles.quantityInner}><Text>{quantity}</Text></View>
                  <TouchableOpacity style={styles.quantityInnerBtn} onPress={() => {
                    _plusQuantity(productDetails.products_max_stock, productDetails.defaultStock).then((newQuantity) => {
                      // console.log('quantity',newQuantity);
                      _priceUpdate(newQuantity)
                    })

                  }} >
                    <AntDesign name="plus" style={{ color: '#A20101', fontSize: 20 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {productAttributes.map((item, key) => (
              <View style={styles.attribute} key={key}>
                <Text style={styles.attributeLeft}>{item.option.name} :</Text>
                <View style={styles.attributeRight}>
                  {item.values.map((item2, key2) => (
                    <TouchableOpacity onPress={() => {
                      _changeActiveAttributeIds(item.values1[0].products_attributes_id, item2.products_attributes_id)
                    }} style={{ flexDirection: 'row', flexWrap: 'wrap' }} key={key2}>
                      {item.option.show_image == 1 ?
                        <Image source={{ uri: basePath + "/" + item2.option_image }} style={activeAttributeIds.includes(item2.products_attributes_id) ? styles.attrimgActive : styles.attrimg} />
                        :
                        <View style={activeAttributeIds.includes(item2.products_attributes_id) ? styles.attrboxActive : styles.attrbox}><Text style={activeAttributeIds.includes(item2.products_attributes_id) ? styles.attrboxTxtActive : styles.attrboxTxt}>{item2.value}</Text></View>
                      }
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}

          </View>
          <Text style={styles.pincodeCheckTitle}>Delivery Pincode Availability :</Text>
          {pincodeMessage.length > 0 ?
            <View style={{ margin: 10 }}><Text style={styles.bulkText}>{pincodeMessage}</Text></View>
            :
            <></>
          }


          <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
            <View style={styles.picodeCheckoutBox}>
              <TextInput
                placeholder={''}
                style={[styles.textInput]}
                value={pincode}
                onChangeText={(pincode) => setpincode(pincode)}
              />
            </View>
            <TouchableOpacity style={styles.pincodeCheckoutBtn} onPress={(_checkPincode)}>
              <Text style={styles.pincodeCheckoutText}>Check</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.loyaltyPointBox}>
            <Text style={styles.loyaltyPointText}>For Every  100 Spent, you earn 2 Loyalty Points
              (Max 50 Points per order)</Text>
          </View>

          <View style={{ margin: 10 }}>
            <HTMLView
              value={productDetails.products_special_instructions}
              stylesheet={styles}
            />
          </View>

          <Text style={styles.pincodeCheckTitle}>Bulk Quantity Discounts!! :</Text>
          {
            bulkPriceList.length > 0 ?
              <View style={{ margin: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.bulkTitle}>Select</Text>
                  <Text style={styles.bulkTitle}>Quantity</Text>
                  <Text style={styles.bulkTitle}>Discount</Text>
                  <Text style={styles.bulkTitle}>Price per prices</Text>
                </View>
                {bulkPriceList.map((item, key) => (
                  <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }} key={key}>
                    <TouchableOpacity onPress={() => {
                      if (item.minimum_quantity <= productDetails.defaultStock) {
                        if (item.minimum_quantity <= productDetails.products_max_stock) {
                          if (item.minimum_quantity >= productDetails.products_min_order) {
                            setQuantity(item.minimum_quantity)
                            _priceUpdate(item.minimum_quantity)
                          }
                        } else {
                          showMessage({
                            message: "You can not order more than " + item.minimum_quantity + " items!",
                            type: "info",
                            backgroundColor: "#808080",
                          });
                        }
                      } else {
                        showMessage({
                          message: "This quantity is more than current stock!",
                          type: "info",
                          backgroundColor: "#808080",
                        });
                      }

                    }} style={styles.bulkText}>
                      <MaterialIcons style={{ fontSize: 16 }} name={
                        quantity >= item.minimum_quantity && quantity <= item.maximum_quantity ?
                          "radio-button-checked" : "radio-button-off"
                      } />
                    </TouchableOpacity>
                    <Text style={styles.bulkText}>{item.minimum_quantity}-{item.maximum_quantity}</Text>
                    <Text style={styles.bulkText}>{item.discount_rate.toFixed(2)}%</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <FontAwesome name="inr" style={styles.bulkText} />
                      <Text style={styles.bulkText}> {item.bulk_selling_price}</Text>
                    </View>
                  </View>
                ))}
              </View>
              :
              <View style={{ margin: 10 }}><Text style={styles.bulkText}>No Bulk Quantity Discounts Available</Text></View>
          }


          <View style={styles.tabheader}>
            <TouchableOpacity onPress={() => {
              setTab(1)
            }} style={tab == 1 ? styles.tabActive : styles.tab}><Text style={styles.tabText}>Description</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setTab(2)
            }} style={tab == 2 ? styles.tabActive : styles.tab}><Text style={styles.tabText}>Review & Rating</Text></TouchableOpacity>
          </View>

          {tab == 1 ?
            <View style={styles.tabContent1}>
              <WebView source={{ uri: PRODUCT_DES_URL + productDetails.products_id }} style={{ width: wp('100%'), height: hp('100%') }} />
              {/* <HTMLView value={htmlContent} renderNode={renderNode} /> */}

            </View>
            :
            <View style={styles.tabContent2}>
              {productReview.length > 0 ?
                productReview.map((item, key) => (
                  <View style={styles.reviewBox} key={key}>
                    <View style={styles.reviewTopSection}>
                      <Image source={{ uri: basePath + "/" + item.customer_image }} style={styles.reviewUserImage} />
                      <View>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.reviewUserName}>{item.customers_name} </Text><Text style={[styles.reviewUserName, { color: '#818181' }]}>- {item.created_at}</Text>
                        </View>


                        <Rating
                          startingValue={5}
                          ratingCount={5}
                          showRating={false}
                          imageSize={20}
                          style={{ alignItems: 'flex-start' }}
                        />
                        <Text style={styles.reviewDescription}>{item.reviews_text} </Text>
                      </View>

                    </View>

                  </View>
                ))
                :
                <View style={styles.reviewBox}><Text style={styles.reviewDescription}>No Reviews Available.</Text></View>
              }



            </View>
          }
        </ScrollView>
        <View style={styles.attToCartBtn}>
          {productDetails.defaultStock > 0 ?
            <TouchableOpacity onPress={() => {
              _buyNow(1)
            }} View style={[styles.footerBtn, { backgroundColor: '#A20101' }]}><Text style={styles.btnTxt}>Buy Now</Text></TouchableOpacity>
            :
            <TouchableOpacity onPress={_notifyProduct} style={[styles.footerBtn, { backgroundColor: '#A20101' }]}><Text style={styles.btnTxt}>Notify Me</Text></TouchableOpacity>
          }

          {productDetails.defaultStock > 0 ? (productDetails.isCartPresent) ?
            <View style={[styles.footerBtn, { backgroundColor: '#620000' }]}><Text style={styles.btnTxt}>Added</Text></View>
            :
            <TouchableOpacity onPress={() => {
              _addToCart(quantity)
            }} style={[styles.footerBtn, { backgroundColor: '#620000' }]}><Text style={styles.btnTxt}>Add to cart</Text></TouchableOpacity>
            :
            <View style={[styles.footerBtn, { backgroundColor: '#620000' }]}><Text style={styles.btnTxt}>Out Of Stock</Text></View>
          }

        </View>
      </>
    )
  }


}


export default ProductDetails;