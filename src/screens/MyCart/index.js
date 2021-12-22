import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import DeviceInfo from 'react-native-device-info';
import { VIEW_CART, UPDATE_CART_QUANTITY, DELETE_CART_ITEM, CHECK_PINCODE, APPLY_COUPON } from '../../config/ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";

import { useSelector, useDispatch } from "react-redux";

import ActionSheet from "react-native-actions-sheet";
import { useIsFocused } from "@react-navigation/native";
const actionSheetRef = createRef();
function MyCart({ navigation, route }) {
  const { shopNow } = route.params;
  const dispatch = useDispatch();

  const [check, setCheck] = useState();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [loyaltyPointDetails, setLoyaltyPointDetails] = useState({});
  const [userShippingAddressList, setUserShippingAddressList] = useState([]);
  const [userBillingAddress, setUserBillingAddress] = useState([]);
  const [android_id, setAndroidId] = useState("");
  const [addressError, setAddressError] = useState(false);

  const [subTotal, setSubTotal] = useState(0);
  const [loyalttyPoint, setLoyalttyPoint] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pincodeError, setPincodeError] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const couponData = useSelector((state) => state.couponReducer
  );
  const setCoupon = (item) =>
    dispatch({
      type: "ADD_COUPON",
      payload: {
        item
      },
    });
    
    const initialize_cart = (item) =>
    dispatch({
      type: "INTIALIZE_CART",
      payload: item,
    });


  const _getCartList = async (customers_id, session_id, couponDiscountPercent = null) => {
    let VIEW_CART_URL = VIEW_CART + 'customers_id=' + customers_id + '&session_id=' + session_id + '&shopNow=';
    if( shopNow == 1 ){
      VIEW_CART_URL = VIEW_CART_URL+1;
    }
    // console.log("VIEW_CART_URL",VIEW_CART_URL)
    fetch(VIEW_CART_URL, {
      method: "get",
    })
      .then((response) => {

        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          // console.log(JSON.stringify(response, null, " "));
          initialize_cart(response.cart)
          setCartList(response.cart)
          setLoyaltyPointDetails(response.loyalty_point_details)
          setUserShippingAddressList(response.userShippingAddressList)
          setUserBillingAddress(response.userBillingAddress)
          _calculateAmounts(response.cart, response.shipping_detail, couponDiscountPercent)

        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }

  // _calculateAmounts
  const _calculateAmounts = async (cart, shipping_detail, couponDiscountPercent) => {
    var finalCuponDiscount = 0;
    var totalTax = 0;
    var userLoyaltyPoint = 0;
    var total_used_lp = 0;
    var beforeDiscTaxableAmountTotal = 0;
    var afterDiscTaxableAmountTotal = 0;
    var allProductTotal = 0;
    var coupon_discount_percent = 0;
    if (couponDiscountPercent != null) {
      coupon_discount_percent = couponDiscountPercent;
    }
    // console.log(coupon_discount_percent)
    if (isLogin) {
      if (userData.userLoyaltyPoint > loyaltyPointDetails.max_point_per_order) {
        userLoyaltyPoint = loyaltyPointDetails.max_point_per_order;
      } else {
        userLoyaltyPoint = userData.userLoyaltyPoint;
      }
    }

    cart.map((item, key) => {
      if (item.prodDiscountRate != '') {
        var tPrice = item.final_price * item.customers_basket_quantity;
        var disc = ((item.final_price * item.prodDiscountRate) / 100) * item.customers_basket_quantity;
        var sellingPrice = tPrice - disc;
      } else {
        var tPrice = item.final_price * item.customers_basket_quantity;
        var disc = 0;
        var sellingPrice = tPrice - disc;
      }
      var initSellingPrice = sellingPrice;
      var beforeDiscTaxableAmount = sellingPrice;

      if (item.proTaxType != '' && item.taxRate != '') {
        if (item.proTaxType == 'Inclusive') {
          beforeDiscTaxableAmount = (initSellingPrice / (1 + (item.taxRate / 100)));
        }
      }

      beforeDiscTaxableAmountTotal = beforeDiscTaxableAmountTotal + beforeDiscTaxableAmount;

      if (coupon_discount_percent > 0) {
        var cuponDiscount = beforeDiscTaxableAmount * (coupon_discount_percent / 100);
      } else {
        var cuponDiscount = 0;
      }
      var afterDiscTaxableAmount = beforeDiscTaxableAmount - cuponDiscount;

      finalCuponDiscount = finalCuponDiscount + cuponDiscount;
      afterDiscTaxableAmountTotal = afterDiscTaxableAmountTotal + afterDiscTaxableAmount;

      if (item.proTaxType != '' && item.taxRate != '') {
        var tax = afterDiscTaxableAmount * (item.taxRate / 100);
      } else {
        var tax = 0;
      }
      totalTax = totalTax + tax;

      var productTotal = afterDiscTaxableAmount + tax;
      allProductTotal = allProductTotal + productTotal;

      if (isLogin) {
        var show_LP = 0;
        var show_LP_value = 0;
        if (item.pro_loyalty_point > 0 && userLoyaltyPoint > 0) {

          var ttl_p_lp = item.pro_loyalty_point * item.customers_basket_quantity;
          if (userLoyaltyPoint > ttl_p_lp) {
            show_LP = ttl_p_lp;
          } else {
            show_LP = userLoyaltyPoint;
          }
        }
        userLoyaltyPoint = userLoyaltyPoint - show_LP;

        total_used_lp = total_used_lp + show_LP;
        show_LP_value = show_LP * loyaltyPointDetails.loyalty_point_discount;
        beforeDiscTaxableAmount = beforeDiscTaxableAmount - show_LP_value;
      }
    })

    var finalPrice = allProductTotal + shipping_detail.rate;
    // if(isLogin){
    //   var lp_value = userData.userLoyaltyPoint * userData.loyaltyPointPrice;
    //   finalPrice = finalPrice + lp_value;
    // }
    setDeliveryCharges(shipping_detail.rate.toFixed(2));
    setSubTotal(beforeDiscTaxableAmountTotal.toFixed(2));
    setCouponDiscount(finalCuponDiscount.toFixed(2))
    setTotalTax(totalTax.toFixed(2));
    setTotalPrice(Math.round(finalPrice));
  }
  // AsyncStorage.setItem('userData', JSON.stringify(response.userDetails[0])).then(() => {
  //   navigation.navigate('HomeScreen');
  // })
  const _updateCartQuantity = (customers_basket_id, products_id, customers_basket_quantity, AttributeIds) => {

    const formData = new FormData();
    formData.append('customers_basket_id', customers_basket_id);
    formData.append('products_id', products_id);
    formData.append('cart_quantity', customers_basket_quantity);
    formData.append('AttributeIds', AttributeIds);
    fetch(UPDATE_CART_QUANTITY, {
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
          // console.log(JSON.stringify(response, null, " "));
          if (response.status) {
            if (isLogin) {
              _getCartList(userData.id,
                "",
                couponData != null ? couponData.item.coupon_discount_percent : null);
            } else {
              _getCartList("", android_id, null);
            }
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

  const _deleteCartItem = (customers_basket_id) => {

    fetch(DELETE_CART_ITEM + customers_basket_id, {
      method: "DELETE",
    })
      .then((response) => {
        // console.log(JSON.stringify(response, null, " "));
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {

        if (status == 200) {
          //console.log(JSON.stringify(response, null, " "));
          if (response.status) {
            if (isLogin) {
              _getCartList(userData.id, "", couponData != null ? couponData.item.coupon_discount_percent : null);
            } else {
              _getCartList("", android_id, null);
            }
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

  const stringFormat = (str) => {
    if (str.length > 50) {
      return str.substring(0, 50) + '...';
    } else {
      return str;
    }
  }
  // min_order : 1
  // max_order : 8
  const _minusQuantity = (key, customers_basket_id, products_id, AttributeIds) => {
    var customers_basket_quantity = parseInt(cartList[key].customers_basket_quantity) - 1;
    if (customers_basket_quantity >= cartList[key].min_order) {
      _updateCartQuantity(customers_basket_id, products_id, customers_basket_quantity, AttributeIds)
    }
  }
  const _plusQuantity = (key, customers_basket_id, products_id, AttributeIds) => {
    var customers_basket_quantity = parseInt(cartList[key].customers_basket_quantity) + 1;
    if (customers_basket_quantity <= cartList[key].max_order) {
      _updateCartQuantity(customers_basket_id, products_id, customers_basket_quantity, AttributeIds)
    }
  }
  const _discountCalculation = (final_price, prodDiscountRate) => {
    final_price = parseInt(final_price);
    var discountedPrice = final_price - ((final_price * prodDiscountRate) / 100);
    // console.log(discountedPrice);
    return discountedPrice.toFixed(2);
  }

  const _checkAddress = (key) => {
    let pincode = userShippingAddressList[key].entry_postcode;
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
          // console.log(JSON.stringify(response, null, " "));
          if (response.status) {
            setCheck(key)
            setPincodeError("");
          } else {
            setCheck()
            setPincodeError(response.massage);
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
  const _applyCoupon = async () => {
    if (isLogin) {

      const formData = new FormData();
      formData.append('customers_id', userData.id);
      formData.append('shopNow', shopNow);
      formData.append('coupon_code', couponCode);
      formData.append('coupons', "");
      formData.append('coupon_discount_percent', "");
      formData.append('coupon_discount', "");
      // console.log(JSON.stringify(formData, null, " "));
      fetch(APPLY_COUPON, {
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
            if (response.success === "1") {
              setCoupon(response.couponDetails)
              _getCartList(userData.id, "", response.couponDetails.coupon_discount_percent);
            } else {
              showMessage({
                message: response.message,
                type: "info",
                backgroundColor: "#808080",
              });
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
  }
  const _deleteCoupon = async () => {
    dispatch({
      type: "DELETE_COUPON"
    });
  }


  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('userData').then((userData) => {
        if (userData != null) {
          setIsLogin(true)
          setUserData(JSON.parse(userData))
          var userDetails = JSON.parse(userData)
          setLoyalttyPoint(parseInt(userDetails.userLoyaltyPoint));
          _getCartList(userDetails.id, "", couponData != null ? couponData.item.coupon_discount_percent : null);
        } else {
          setIsLogin(false)
          DeviceInfo.getAndroidId().then((androidId) => {
            setAndroidId(androidId)
            _getCartList("", androidId, null)
          });
        }
      })
    }

  }, [navigation, isFocused]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>My Cart</Text>
      </View>
      {cartList.length > 0 ?
        <ScrollView style={{ flex: 1 }}>

          <View style={styles.outerBoxAddress}>
            <View style={styles.outerBoxAddressInner}>
              <Text>
                {check == undefined ? "No Address Selected!" : userShippingAddressList[check].entry_street_address}
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => {
                actionSheetRef.current?.setModalVisible();
              }} style={[styles.changeAddress, { backgroundColor: '#A20101' }]}>
                <Text style={styles.btnTxt}>
                  Change
                </Text>
              </TouchableOpacity></View>
          </View>

          {cartList.map((item, key) => (
            <View style={styles.outerBox} key={key}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: item.image_path }} style={styles.userImage} />
                <View style={styles.leftBox}>
                  <Text style={styles.leftText1}>{stringFormat(item.products_name)}	</Text>
                  <Text style={styles.leftText2}>₹{_discountCalculation(item.final_price, item.prodDiscountRate)}</Text>

                  <View style={styles.quantityOuter}>
                    <TouchableOpacity onPress={() => {
                      _minusQuantity(key, item.customers_basket_id, item.products_id, item.attributesString);
                    }} style={styles.quantityInnerBtn}>
                      <AntDesign name="minus" style={{ color: '#A20101', fontSize: 20 }} />
                    </TouchableOpacity>
                    <View style={styles.quantityInner}><Text>{item.customers_basket_quantity}</Text></View>
                    <TouchableOpacity onPress={() => {
                      _plusQuantity(key, item.customers_basket_id, item.products_id, item.attributesString);
                    }} style={styles.quantityInnerBtn}>
                      <AntDesign name="plus" style={{ color: '#A20101', fontSize: 20 }} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => {
                    _deleteCartItem(item.customers_basket_id);
                  }} >
                    <AntDesign name="delete" style={styles.deleteIcon} />
                  </TouchableOpacity>


                </View>
              </View>


              {/* <View style={styles.outerBtn}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#A20101' }]}>
          <Text style={styles.btnTxt}>Remove</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#000000' }]}>
          <Text style={styles.btnTxt}>Move to Wishlist</Text>
        </TouchableOpacity>
      </View> */}
            </View>
          ))}


          <View style={styles.outerBoxPrice}>
            <Text style={styles.priceTitle}>
              Use Coupon Code
            </Text>

            {couponData != null ?
              <View style={styles.couponBoxPrice}>
                <Text style={styles.priceTitle}>
                  Coupon Applied {couponData.item.coupon[0].code}. If you do not want to apply this coupon just click cross button .
                </Text>
                <TouchableOpacity onPress={() => {
                  _deleteCoupon()
                }}>
                  <AntDesign name="closecircleo" style={{ color: '#A20101', fontSize: 20 }} />
                </TouchableOpacity>
              </View>

              :
              <></>
            }



            <View style={styles.priceLine}></View>
            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
              <View style={styles.textInput}>
                <TextInput
                  placeholder={'Enter your coupon code'}
                  value={couponCode}
                  onChangeText={(couponCode) => setCouponCode(couponCode)}
                />
              </View>

              <TouchableOpacity onPress={() => {
                _applyCoupon()
              }} style={[styles.applyCoupon, { backgroundColor: '#A20101' }]}>
                <Text style={styles.checkoutbtnTxt}>
                  Apply Coupon
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.outerBoxPrice}>
            <View style={styles.priceList}>
              <Text style={styles.priceTitle}>
                PRICE DETAILS
              </Text>
              <View style={styles.priceLine}></View>
              <View style={styles.priceItem}>
                <Text style={styles.priceItemText}>Sub Total</Text>
                <Text style={styles.priceItemText}>₹{subTotal}</Text>
              </View>
              <View style={styles.priceItem}>
                <Text style={styles.priceItemText}>Used Loyaltty Point</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.priceItemText}>{loyalttyPoint}</Text>
                  <Image source={require('../../assets/Image/loyalty.png')} style={{ width: 30, height: 30, marginLeft: 5 }} />
                </View>

              </View>
              <View style={styles.priceItem}>
                <Text style={styles.priceItemText}>Total Tax</Text>
                <Text style={styles.priceItemText}>₹{totalTax}</Text>
              </View>
              <View style={styles.priceItem}>
                <Text style={styles.priceItemText}>Discount(Coupon)</Text>
                <Text style={[styles.priceItemText, { color: 'red' }]}>-₹{couponDiscount}</Text>
              </View>

              <View style={styles.priceItem}>
                <Text style={styles.priceItemText}>Delivery Charges</Text>
                <Text style={[styles.priceItemText, { color: 'red' }]}>{deliveryCharges}</Text>
              </View>
              <View style={styles.priceLine}></View>

              <View style={styles.priceItem}>
                <Text style={[styles.priceItemText, { color: '#000', fontFamily: 'Poppins-Bold' }]}>Total</Text>
                <Text style={[styles.priceItemText, { color: '#000', fontFamily: 'Poppins-Bold' }]}>₹{totalPrice}</Text>
              </View>
            </View>

          </View>
          {addressError ?
            <View style={styles.errorOuter}  >
              <Text style={styles.error}>No Address Selected!</Text>
            </View>
            :
            <></>
          }

          <View style={styles.outerBoxCheckout}>
            <View>
              <Text style={styles.priceAmount}>₹{totalPrice}</Text>
            </View>
            <TouchableOpacity onPress={() => {
              if (isLogin) {
                if (check != undefined) {
                  navigation.navigate('Checkout', {
                    orderBillingAddressBookId: userBillingAddress[0].address_book_id,
                    address_id_hidden: userShippingAddressList[check].address_book_id,
                    is_shop_now: shopNow,
                    orderNote: "",
                    shipping_rate: deliveryCharges,
                    totalPrice: totalPrice
                  });

                } else {
                  setAddressError(true);
                }
              } else {
                navigation.navigate('Login');
              }

            }} style={[styles.checkoutButton, { backgroundColor: '#A20101' }]}>
              <Text style={styles.checkoutbtnTxt}>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        :
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <MaterialCommunityIcons name="cart-off" style={{ color: '#A20101', fontSize: 100 }} />
          <Text style={styles.CategoryText2}>No Cart item Available</Text>
        </View>
      }


      <Footer navigation={navigation} />




      {/* MODAL */}

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.changeAddressSection}>

          {pincodeError.length > 0 ?
            <View style={{ margin: 10 }}><Text style={styles.nameSubTitle, { color: 'red' }}>{pincodeError}</Text></View>
            :
            <></>
          }
          <View style={styles.filterBar}>
            <Text style={styles.CategoryText2}>Select Delivery Address</Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('MyAddress');
            }} style={styles.addAddress}>
              <AntDesign name="plus" style={{ color: '#fff', fontSize: 14 }} />
              <Text style={styles.btnTxt}>Address</Text>
            </TouchableOpacity>

          </View>
          {userShippingAddressList.map((item, key) => (
            <View style={styles.changeAddressSectionInner} key={key}>
              <View>
                <Text style={styles.nameTitle}>{item.entry_firstname} {item.entry_lastname}</Text>
                <Text style={styles.nameSubTitle}>{item.entry_street_address} </Text>
                <Text style={styles.nameSubTitle}>{item.entry_city}, {item.entry_state}, {item.entry_postcode}</Text>
              </View>

              <TouchableOpacity onPress={() => {
                _checkAddress(key)
                // setCheck(key)
                setAddressError(false);
              }}><Fontisto name={check == key ? "checkbox-active" : "checkbox-passive"} style={{ color: '#A20101', fontSize: 20 }} /></TouchableOpacity>
            </View>
          ))}


        </View>
      </ActionSheet>
    </>
  )

}


export default MyCart;