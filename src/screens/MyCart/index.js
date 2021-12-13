import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import DeviceInfo from 'react-native-device-info';
import { VIEW_CART, UPDATE_CART_QUANTITY } from '../../config/ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ActionSheet from "react-native-actions-sheet";
import { useIsFocused } from "@react-navigation/native";
const actionSheetRef = createRef();
function MyCart({ navigation }) {

  const [check, setCheck] = useState(1);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [android_id, setAndroidId] = useState("");
  
  const [subTotal, setSubTotal] = useState(0);
  const [loyalttyPoint, setLoyalttyPoint] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  const _getCartList = async (customers_id,session_id) => {
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
          // console.log(JSON.stringify(response, null, " "));
          setCartList(response.cart)
          _calculateAmounts(response.cart,response.shipping_detail)

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
  const _calculateAmounts = (cart, shipping_detail) => {
    var finalCuponDiscount = 0;
    var totalTax = 0;
    var userLoyaltyPoint = 0;
    var total_used_lp = 0;
    var beforeDiscTaxableAmountTotal = 0;
    var afterDiscTaxableAmountTotal = 0;
    var allProductTotal = 0;
    var coupon_discount_percent = 0;

    cart.map((item, key) => {
      if (item.prodDiscountRate!='') {
        var tPrice = item.final_price * item.customers_basket_quantity;
        var disc = ((item.final_price*item.prodDiscountRate)/100)*item.customers_basket_quantity;
        var sellingPrice = tPrice-disc;
    }else{
      var tPrice = item.final_price * item.customers_basket_quantity;
      var disc = 0;
      var sellingPrice = tPrice-disc;
    }
    var initSellingPrice = sellingPrice;
    var beforeDiscTaxableAmount = sellingPrice;

    if (item.proTaxType!='' && item.taxRate!='') {
        if (item.proTaxType=='Inclusive') {
            beforeDiscTaxableAmount = (initSellingPrice/(1+(item.taxRate/100)));
        }
    }

    beforeDiscTaxableAmountTotal = beforeDiscTaxableAmountTotal+beforeDiscTaxableAmount;

    if (coupon_discount_percent>0) {
        var cuponDiscount = beforeDiscTaxableAmount*(coupon_discount_percent/100);
    }else{
        var cuponDiscount = 0;
    }
    var afterDiscTaxableAmount = beforeDiscTaxableAmount-cuponDiscount;

    finalCuponDiscount = finalCuponDiscount+cuponDiscount;
    afterDiscTaxableAmountTotal = afterDiscTaxableAmountTotal+afterDiscTaxableAmount;

    if (item.proTaxType!='' && item.taxRate!='') {
        var tax = afterDiscTaxableAmount*(item.taxRate/100);
    }else{
      var tax = 0;
    }
    
    totalTax = totalTax+tax;

    var productTotal = afterDiscTaxableAmount+tax;
    allProductTotal = allProductTotal+productTotal;
    })
    // console.log("allProductTotal: ",allProductTotal);
    discountedPrice.toFixed(2)
  }

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
              _getCartList(userData.id, "");
            } else {
              _getCartList("",android_id);
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

  const stringFormat = (str) =>{
    if(str.length > 50 ){
      return str.substring(0,50)+'...';
    }else{
      return str;
    }
  }
  // min_order : 1
  // max_order : 8
  const _minusQuantity = (key, customers_basket_id, products_id, AttributeIds) =>{
    var customers_basket_quantity = parseInt(cartList[key].customers_basket_quantity) - 1;
      if(customers_basket_quantity >= cartList[key].min_order){
        _updateCartQuantity(customers_basket_id, products_id, customers_basket_quantity, AttributeIds)
      }
  }
  const _plusQuantity = (key, customers_basket_id, products_id, AttributeIds) =>{
    var customers_basket_quantity = parseInt(cartList[key].customers_basket_quantity) + 1;
      if(customers_basket_quantity <= cartList[key].max_order){
        _updateCartQuantity(customers_basket_id, products_id, customers_basket_quantity, AttributeIds)
      }
  }
  const _discountCalculation = (final_price,prodDiscountRate) =>{
        final_price = parseInt(final_price);
        var discountedPrice = final_price - ((final_price*prodDiscountRate)/100);
        // console.log(discountedPrice);
        return discountedPrice.toFixed(2);
  }
  useEffect(() => {
  
    if (isFocused) {
    
    AsyncStorage.getItem('userData').then((userData) => {
      if (userData != null) {
        setIsLogin(true)
        setUserData(JSON.parse(userData))
        var userDetails = JSON.parse(userData)
        setLoyalttyPoint(parseInt(userDetails.userLoyaltyPoint));
        _getCartList(userDetails.id, "");
      } else {
        setIsLogin(false)
        DeviceInfo.getAndroidId().then((androidId) => {
          setAndroidId(androidId)
          _getCartList("",androidId)
        });
      }
    })}
  }, [navigation, isFocused]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>My Cart</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>

        <View style={styles.outerBoxAddress}>
          <View style={styles.outerBoxAddressInner}>
            <Text>
              Deliver to John Doe...700137 10/172 Basudevpur
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
        <View style={{ flexDirection:'row' }}>
          <Image source={{ uri: item.image_path }} style={styles.userImage } />
          <View style={styles.leftBox}>
            <Text style={styles.leftText1}>{stringFormat(item.products_name)}	</Text>
            <Text style={styles.leftText2}>₹{_discountCalculation(item.final_price,item.prodDiscountRate)}</Text>

            <View style={styles.quantityOuter}>
              <TouchableOpacity onPress={() => {
                _minusQuantity(key, item.customers_basket_id, item.products_id, item.attributesString);
              }} style={styles.quantityInnerBtn}>
                <AntDesign name="minus" style={{ color: '#A20101', fontSize: 20 }} />
              </TouchableOpacity>
              <View style={styles.quantityInner}><Text>{item.customers_basket_quantity}</Text></View>
              <TouchableOpacity onPress={() => {
                _plusQuantity(key, item.customers_basket_id, item.products_id, item.attributesString);
              }}  style={styles.quantityInnerBtn}>
                <AntDesign name="plus" style={{ color: '#A20101', fontSize: 20 }} />
              </TouchableOpacity>
            </View>
            <AntDesign name="delete"  style={styles.deleteIcon} />

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
          <View style={styles.priceLine}></View>
          <View style={{ flexDirection: 'row' ,marginTop:10,justifyContent:'space-between'}}>
            <View style={styles.textInput}>
            <TextInput
              placeholder={'Enter your coupon code'}
            />
            </View>
            
            <TouchableOpacity onPress={() => {

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
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.priceItemText}>{loyalttyPoint}</Text>
              <Image source={require('../../assets/Image/loyalty.png')} style={{width:30,height:30,marginLeft:5}} />
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
        <View style={styles.outerBoxCheckout}>
          <View>
            <Text style={styles.priceAmount}>₹{totalPrice}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Checkout');
          }} style={[styles.checkoutButton, { backgroundColor: '#A20101' }]}>
            <Text style={styles.checkoutbtnTxt}>
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer navigation={navigation} />




      {/* MODAL */}

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.changeAddressSection}>


          <View style={styles.filterBar}>
            <Text style={styles.CategoryText2}>Select Delivery Address</Text>
          </View>

          <View style={styles.changeAddressSectionInner}>
            <View><Text style={styles.nameTitle}>John Doe</Text>
              <Text style={styles.nameSubTitle}>simply dummy text of the printing </Text></View>
            <TouchableOpacity onPress={() => {
              setCheck(1)
            }}><Fontisto name={check == 1 ? "checkbox-active" : "checkbox-passive"} style={{ color: '#A20101', fontSize: 20 }} /></TouchableOpacity>
          </View>

          <View style={styles.changeAddressSectionInner}>
            <View><Text style={styles.nameTitle}>John Doe</Text>
              <Text style={styles.nameSubTitle}>simply dummy text of the printing </Text></View>
            <TouchableOpacity onPress={() => {
              setCheck(2)
            }}><Fontisto name={check == 2 ? "checkbox-active" : "checkbox-passive"} style={{ color: '#A20101', fontSize: 20 }} /></TouchableOpacity>
          </View>

          <View style={styles.changeAddressSectionInner}>
            <View><Text style={styles.nameTitle}>John Doe</Text>
              <Text style={styles.nameSubTitle}>simply dummy text of the printing </Text></View>
            <TouchableOpacity onPress={() => {
              setCheck(3)
            }}><Fontisto name={check == 3 ? "checkbox-active" : "checkbox-passive"} style={{ color: '#A20101', fontSize: 20 }} /></TouchableOpacity>
          </View>


        </View>
      </ActionSheet>
    </>
  )

}


export default MyCart;