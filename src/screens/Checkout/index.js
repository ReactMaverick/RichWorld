import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator, Platform } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import Fontisto from 'react-native-vector-icons/Fontisto'
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_PAYMENT_METHODS, ADD_ORDER } from '../../config/ApiConfig';
function Checkout({ navigation, route }) {

    const { orderBillingAddressBookId, address_id_hidden, is_shop_now, orderNote, shipping_rate, coupon_code, coupon_discount_percent, totalPrice } = route.params;
    const [check, setCheck] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [isLogin, setIsLogin] = useState(false);

    const _getPaymentMethods = async () => {
        fetch(GET_PAYMENT_METHODS, {
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
                    navigation.navigate('Thankyou');
                } else {
                    // console.log(status, response);
                }
            })
            .catch((error) => console.log("error", error))
            .finally(() => {
                setIsLoading(false)
            });
    }

    const _placeOrder = async (payment_method, razorpay_payment_id) => {
        const formData = new FormData();
        formData.append('customers_id', userData.id);
        formData.append('customers_email', userData.email);
        formData.append('orderBillingAddressBookId', orderBillingAddressBookId);
        formData.append('address_id_hidden', address_id_hidden);
        formData.append('payment_method', payment_method);
        if (payment_method == "razor_pay") {
            formData.append('razorpay_payment_id', razorpay_payment_id);
        }
        formData.append('is_shop_now', is_shop_now);
        formData.append('orderNote', orderNote);
        formData.append('shipping_rate', shipping_rate);
        formData.append('coupon_code', coupon_code);
        formData.append('coupon_discount_percent', coupon_discount_percent);
        formData.append('os', Platform.OS);
        formData.append('user_server_details', "");
        console.log(JSON.stringify(formData, null, " "));
        fetch(ADD_ORDER, {
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
                    console.log(response);
                } else {
                    console.log(response);
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
                _getPaymentMethods()
            } else {
                navigation.navigate('Login');
            }
        })
    }, [navigation]);

    return (
        <>
            <Header navigation={navigation} />
            <ScrollView style={{ flex: 1 }}>

                <View style={styles.outerSection}>
                    <View><Text style={styles.checkoutTextHead}>Choose Payment Method</Text></View>

                    <TouchableOpacity onPress={() => {
                        setCheck(1);
                        _placeOrder("cash_on_delivery", "");
                    }} style={styles.checkoutInner}>
                        <Fontisto name={check == 1 ? "checkbox-active" : "checkbox-passive"} style={styles.paymentIcon} />
                        <Text style={styles.checkoutTextInner}>Cash on delivery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        setCheck(2);
                        navigation.navigate('Thankyou');
                    }} style={styles.checkoutInner}>
                        <Fontisto name={check == 2 ? "checkbox-active" : "checkbox-passive"} style={styles.paymentIcon} />
                        <Text style={styles.checkoutTextInner}>Direct Bank Transfer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        setCheck(3);
                        var options = {
                            description: 'Payment to RichWorld Expert',
                            image: 'https://richworld.online/frontEnd/images/richworldlogo.png',
                            currency: 'INR',
                            key: 'rzp_test_CX62akPXgMwPrk',
                            amount: totalPrice * 100,
                            name: 'Richworld',
                            // order_id: response.order_id,//Replace this with an order_id created using Orders API.
                            //order_id: 5, 
                            prefill: {
                                email: userData.email,
                                contact: "9832249852",
                                name: userData.first_name
                            },
                            theme: { color: '#AB0000' }
                        }
                        RazorpayCheckout.open(options).then((data) => {


                            // navigation.navigate('Thankyou');
                            // handle success
                            // alert(`Success: ${data.razorpay_payment_id}`);
                            _placeOrder("razor_pay", data.razorpay_payment_id);
                        }).catch((error) => {

                            //  navigation.navigate('Thankyou');
                            console.log(error.code, error.description);
                            // handle failure
                            // alert(`Error: ${error.code} | ${error.description}`);
                        });
                    }} style={styles.checkoutInner}>
                        <Fontisto name={check == 3 ? "checkbox-active" : "checkbox-passive"} style={styles.paymentIcon} />
                        <Text style={styles.checkoutTextInner}>Razorpay</Text>
                    </TouchableOpacity>

                </View>



            </ScrollView>
            <Footer navigation={navigation} />
        </>
    )

}


export default Checkout;