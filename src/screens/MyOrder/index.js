import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
function MyOrder({ navigation }) {

  const [tab, setTab] = useState(1);


  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>My Orders</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>

        <TouchableOpacity onPress={() => {
          setTab(1)
        }} style={styles.card}>
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>Delivery Timing 10 May, 3.00PM - 6.00PM</Text>
            <AntDesign name="down" style={styles.downIcon} />
          </View>
          {tab == 1 ?
            <View >
              <View style={styles.productDetails}>
                <Image style={styles.productImage} source={require('../../assets/Image/ProductImg.png')} />
                <View style={{ paddingLeft: 10 }}>
                  <Text style={styles.title1}>Indian Makerel / Ayila</Text>
                  <Text style={styles.title2}>On the way</Text>
                  <Text style={styles.title2}>2 Items?</Text>
                </View>
              </View>

              <View style={styles.priceOuter}>
                <Text style={styles.priceText}>Sub Total</Text>
                <Text style={styles.priceText}>₹26.50</Text>
              </View>
              <View style={styles.priceOuter}>
                <Text style={styles.priceText}>Delivery Charges</Text>
                <Text style={styles.priceText}>₹00.00</Text>
              </View>

              <View style={styles.priceOuter}>
                <Text style={styles.priceText1}>Total</Text>
                <Text style={styles.priceText1}>₹26.50</Text>
              </View>
              <View style={styles.trackOrderOuter}>
                <Text style={[styles.priceText1, { marginLeft: 10, fontSize: 15 }]}>Track Order</Text>
                <View style={styles.priceOuter}>
                  <Text style={styles.priceText}>Dispatch</Text>
                  <Text style={styles.priceText}>12,Jan 2021, 11 AM</Text>
                </View>

                <View style={styles.priceOuter}>
                  <Text style={styles.priceText}>Completed</Text>
                  <Text style={styles.priceText}>13,Jan 2021, 11 AM</Text>
                </View>
              </View>



            </View>
            : <></>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setTab(2)
        }} style={styles.card}>
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>Delivery Timing 10 May, 3.00PM - 6.00PM</Text>
            <AntDesign name="down" style={styles.downIcon} />
          </View>
          {tab == 2 ?
            <View >
              <View style={styles.productDetails}>
                <Image style={styles.productImage} source={require('../../assets/Image/ProductImg.png')} />
                <View style={{ paddingLeft: 10 }}>
                  <Text style={styles.title1}>Indian Makerel / Ayila</Text>
                  <Text style={styles.title2}>On the way</Text>
                  <Text style={styles.title2}>2 Items?</Text>
                </View>
              </View>

              <View style={styles.priceOuter}>
                <Text style={styles.priceText}>Sub Total</Text>
                <Text style={styles.priceText}>₹26.50</Text>
              </View>
              <View style={styles.priceOuter}>
                <Text style={styles.priceText}>Delivery Charges</Text>
                <Text style={styles.priceText}>₹00.00</Text>
              </View>

              <View style={styles.priceOuter}>
                <Text style={styles.priceText1}>Total</Text>
                <Text style={styles.priceText1}>₹26.50</Text>
              </View>
              <View style={styles.trackOrderOuter}>
                <Text style={[styles.priceText1, { marginLeft: 10, fontSize: 15 }]}>Track Order</Text>
                <View style={styles.priceOuter}>
                  <Text style={styles.priceText}>Dispatch</Text>
                  <Text style={styles.priceText}>12,Jan 2021, 11 AM</Text>
                </View>

                <View style={styles.priceOuter}>
                  <Text style={styles.priceText}>Completed</Text>
                  <Text style={styles.priceText}>13,Jan 2021, 11 AM</Text>
                </View>
              </View>



            </View>
            : <></>}
        </TouchableOpacity>



      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}


export default MyOrder;