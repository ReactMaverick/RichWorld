import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MY_ORDERS } from '../../config/ApiConfig';
import { useIsFocused } from "@react-navigation/native";
import dateFormat, { masks } from "dateformat";
function MyOrder({ navigation }) {

  const isFocused = useIsFocused();
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [basePath, setBasePath] = useState("");

  const _getOrders = async (user_id) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('user_id', user_id);
    fetch(MY_ORDERS, {
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
          // console.log(response.orderList);
          setOrderList(response.orderList);
          setBasePath(response.base_path)
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
  const _getParsedDate = (date) => {
    // console.log(date)
    date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
  }
  const _calculateSubtotal = (totalUsedLp, pricePerLp, order_price, coupon_amount, shipping_cost, total_tax) => {
    var order_show_LP = parseFloat(totalUsedLp);
    var order_show_LP_value = parseFloat(order_show_LP * pricePerLp);
    var subtotal = parseFloat(order_price) + parseFloat(coupon_amount) - parseFloat(shipping_cost) - parseFloat(total_tax);
    subtotal = subtotal - order_show_LP_value;
    return subtotal.toFixed(2);
  }

  const _calculateOrderTotal = (totalUsedLp, pricePerLp, order_price) => {
    var order_show_LP = parseFloat(totalUsedLp);
    var order_show_LP_value = parseFloat(order_show_LP * pricePerLp);
    var order_total = parseFloat(order_price) - order_show_LP_value;
    return order_total.toFixed(2);
  }

  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('userData').then((userData) => {
        if (userData != null) {
          setIsLogin(true)
          setUserData(JSON.parse(userData))
          var userDetails = JSON.parse(userData)
          _getOrders(userDetails.id);
        } else {
          setIsLogin(false)
          navigation.navigate('Login');
        }
      })
    }
  }, [navigation,isFocused]);
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
        <Header navigation={navigation} />
        <View style={styles.filterBar}>
          <Text style={styles.CategoryText2}>My Orders</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {orderList.map((item, key) => (
            <TouchableOpacity onPress={() => {
              setTab(key)
            }} style={styles.card} key={key}>
              <View style={styles.headerBox}>
                <Text style={styles.headerText}>Purchase Date {
                dateFormat(new Date(..._getParsedDate(item.date_purchased)).toString(), "mmm dS, yyyy, h:MM:ss TT")
                }</Text>
                <AntDesign name="down" style={styles.downIcon} />
              </View>
              {tab == key ?
                <View >
                  {item.products.map((item2, key2) => (
                    <View style={styles.productDetails} key={key2}>
                      <Image style={styles.productImage} source={{ uri: basePath + "/" + item2.image }} />
                      <View style={{ flex: 1, paddingLeft: 10 }}>
                        <Text style={styles.title1}>{stringFormat(item2.products_name)}</Text>
                        <Text style={styles.title2}>{item.orders_status}</Text>
                        <Text style={styles.title2}>{item2.products_quantity}</Text>
                      </View>
                    </View>
                  ))}


                  <View style={styles.priceOuter}>
                    <Text style={styles.priceText}>Sub Total</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <FontAwesome name="inr" style={styles.priceText} />
                    <Text style={styles.priceText}>{_calculateSubtotal(item.totalUsedLp, item.pricePerLp, item.order_price, item.coupon_amount, item.shipping_cost, item.total_tax)}</Text>
                    </View>
                  </View>
                  <View style={styles.priceOuter}>
                    <Text style={styles.priceText}>Used Loyalty Point</Text>
                    <Text style={styles.priceText}>{item.totalUsedLp}</Text>
                  </View>
                  <View style={styles.priceOuter}>
                    <Text style={styles.priceText}>Total Tax</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <FontAwesome name="inr" style={styles.priceText} />
                    <Text style={styles.priceText}>{item.total_tax}</Text>
                    </View>
                  </View>
                  <View style={styles.priceOuter}>
                    <Text style={styles.priceText}>Discount(Coupon)</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <FontAwesome name="inr" style={styles.priceText} />
                    <Text style={styles.priceText}>{item.coupon_amount}</Text>
                    </View>
                  </View>
                  <View style={styles.priceOuter}>
                    <Text style={styles.priceText}>Delivery Charges</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <FontAwesome name="inr" style={styles.priceText} />
                    <Text style={styles.priceText}>{item.shipping_cost}</Text>
                    </View>
                  </View>

                  <View style={styles.priceOuter}>
                    <Text style={styles.priceText1}>Total</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <FontAwesome name="inr" style={styles.priceText1} />
                    <Text style={styles.priceText1}>{_calculateOrderTotal(item.totalUsedLp, item.pricePerLp, item.order_price)}</Text>
                    </View>
                  </View>
                  <View style={styles.trackOrderOuter}>
                    <Text style={[styles.priceText1, { marginLeft: 10, fontSize: 15 }]}>Track Order</Text>

                    {item.orders_status_history.map((item3, key3) => (
                      <View style={styles.priceOuter} key={key3}>
                        <Text style={styles.priceText}>{item3.orders_status_name}</Text>
                        <Text style={styles.priceText}>{
                        dateFormat(new Date(..._getParsedDate(item3.date_added)).toString(), "mmm dS, yyyy, h:MM:ss TT")
                        }</Text>
                      </View>
                    ))}

                  </View>



                </View>
                : <></>}
            </TouchableOpacity>
          ))}


        </ScrollView>
        <Footer navigation={navigation} />
      </>
    )
  }
}


export default MyOrder;