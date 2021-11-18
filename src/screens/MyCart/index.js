import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'

import ActionSheet from "react-native-actions-sheet";
const actionSheetRef = createRef();
function MyCart({ navigation }) {

  const [check, setCheck] = useState(1);

  useEffect(() => {
  }, [navigation]);

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

        <View style={styles.outerBox}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Image source={require('../../assets/Image/cartUse.png')} style={styles.userImage} />
            <View style={styles.leftBox}>
              <Text style={styles.leftText1}>Simple Black T-Shirt	</Text>
              <Text style={styles.leftText2}>₹260.00</Text>

              <View style={styles.quantityOuter}>
                <View style={styles.quantityInnerBtn}>
                  <AntDesign name="minus" style={{ color: '#A20101', fontSize: 20 }} />
                </View>
                <View style={styles.quantityInner}><Text>1</Text></View>
                <View style={styles.quantityInnerBtn}>
                  <AntDesign name="plus" style={{ color: '#A20101', fontSize: 20 }} />
                </View>
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



        <View style={styles.outerBox}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Image source={require('../../assets/Image/cartUse.png')} style={styles.userImage} />
            <View style={styles.leftBox}>
              <Text style={styles.leftText1}>Simple Black T-Shirt	</Text>
              <Text style={styles.leftText2}>₹260.00</Text>
              <View style={styles.quantityOuter}>
                <View style={styles.quantityInnerBtn}>
                  <AntDesign name="minus" style={{ color: '#A20101', fontSize: 20 }} />
                </View>
                <View style={styles.quantityInner}><Text>1</Text></View>
                <View style={styles.quantityInnerBtn}>
                  <AntDesign name="plus" style={{ color: '#A20101', fontSize: 20 }} />
                </View>
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



        <View style={styles.outerBox}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Image source={require('../../assets/Image/cartUse.png')} style={styles.userImage} />
            <View style={styles.leftBox}>
              <Text style={styles.leftText1}>Simple Black T-Shirt	</Text>
              <Text style={styles.leftText2}>₹260.00</Text>
              <View style={styles.quantityOuter}>
                <View style={styles.quantityInnerBtn}>
                  <AntDesign name="minus" style={{ color: '#A20101', fontSize: 20 }} />
                </View>
                <View style={styles.quantityInner}><Text>1</Text></View>
                <View style={styles.quantityInnerBtn}>
                  <AntDesign name="plus" style={{ color: '#A20101', fontSize: 20 }} />
                </View>
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
              <Text style={styles.priceItemText}>₹2600.00</Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceItemText}>Used Loyaltty Point</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.priceItemText}>4</Text>
              <Image source={require('../../assets/Image/loyalty.png')} style={{width:30,height:30,marginLeft:5}} />
              </View>
              
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceItemText}>Total Tax</Text>
              <Text style={styles.priceItemText}>₹20.00</Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceItemText}>Discount(Coupon)</Text>
              <Text style={[styles.priceItemText, { color: 'red' }]}>-₹700.00</Text>
            </View>

            <View style={styles.priceItem}>
              <Text style={styles.priceItemText}>Delivery Charges</Text>
              <Text style={[styles.priceItemText, { color: 'red' }]}>FREE</Text>
            </View>
            <View style={styles.priceLine}></View>

            <View style={styles.priceItem}>
              <Text style={[styles.priceItemText, { color: '#000', fontFamily: 'Poppins-Bold' }]}>Total</Text>
              <Text style={[styles.priceItemText, { color: '#000', fontFamily: 'Poppins-Bold' }]}>₹1900.00</Text>
            </View>
          </View>

        </View>
        <View style={styles.outerBoxCheckout}>
          <View>
            <Text style={styles.priceAmount}>₹1900.00</Text>
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