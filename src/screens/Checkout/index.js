import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator, Platform } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import Fontisto from 'react-native-vector-icons/Fontisto'
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_PAYMENT_METHODS, ADD_ORDER } from '../../config/ApiConfig';
import { useSelector, useDispatch } from "react-redux";
function Checkout({ navigation, route }) {

    const { orderBillingAddressBookId, address_id_hidden, same_as_billing, is_shop_now, orderNote, shipping_rate, totalPrice } = route.params;
    console.log("Checkout", route.params);
    const dispatch = useDispatch();
    const [check, setCheck] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [cod, setCod] = useState({});
    const [razorpay, setRazorpay] = useState({});
    const [bankdetail, setBankdetail] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const couponData = useSelector((state) => state.couponReducer
    );
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
                    if (response.cod != undefined) {
                        setCod(response.cod)
                    } else {
                        setCod({})
                    }
                    if (response.razorpay != undefined) {
                        setRazorpay(response.razorpay)
                    } else {
                        setRazorpay({})
                    }
                    if (response.bankdetail != undefined) {
                        setBankdetail(response.bankdetail)
                    } else {
                        setBankdetail({})
                    }
                    // console.log(JSON.stringify(response, null, " "));
                    // navigation.navigate('Thankyou');
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
        setIsLoading(true)
        const formData = new FormData();
        formData.append('customers_id', userData.id);
        formData.append('customers_email', userData.email);
        formData.append('orderBillingAddressBookId', orderBillingAddressBookId);
        formData.append('address_id_hidden', address_id_hidden);
        formData.append('same_as_billing', same_as_billing);
        formData.append('payment_method', payment_method);
        if (payment_method == "razor_pay") {
            formData.append('razorpay_payment_id', razorpay_payment_id);
        } else {
            formData.append('razorpay_payment_id', "");
        }

        formData.append('is_shop_now', is_shop_now);
        formData.append('orderNote', orderNote);
        formData.append('shipping_rate', shipping_rate);
        if (couponData != null) {
            formData.append('coupon_code', JSON.stringify(couponData.item.coupon));
            formData.append('coupon_discount_percent', couponData.item.coupon_discount_percent);
        }
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
                    dispatch({
                        type: "DELETE_COUPON"
                    });
                    if (is_shop_now == 0) {
                        dispatch({
                            type: "DELETE_CART_ITEM"
                        });
                    }
                    setCheck(0);
                    console.log('place order', response.result.orders_data[0]);
                    navigation.navigate('Thankyou', {orders_data: response.result.orders_data[0]});
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
                _getPaymentMethods()
            } else {
                navigation.navigate('Login');
            }
        })
    }, [navigation]);
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
                <ScrollView style={{ flex: 1 }}>

                    <View style={styles.outerSection}>
                        <View><Text style={styles.checkoutTextHead}>Choose Payment Method</Text></View>
                        {Object.keys(cod).length != 0 &&
                            <TouchableOpacity onPress={() => {
                                setCheck(1);
                                _placeOrder("cash_on_delivery", "");
                            }} style={styles.checkoutInner}>
                                <Fontisto name={check == 1 ? "checkbox-active" : "checkbox-passive"} style={styles.paymentIcon} />
                                <Text style={styles.checkoutTextInner}>Cash on delivery</Text>
                            </TouchableOpacity>
                        }

                        {Object.keys(bankdetail).length != 0 &&
                            <>
                                <TouchableOpacity onPress={() => {
                                    setCheck(2);
                                    // navigation.navigate('Thankyou');
                                }} style={styles.checkoutInner}>
                                    <Fontisto name={check == 2 ? "checkbox-active" : "checkbox-passive"} style={styles.paymentIcon} />
                                    <Text style={styles.checkoutTextInner}>Direct Bank Transfer</Text>
                                </TouchableOpacity>
                                {check == 2 &&
                                    <View style={styles.bankdetailsOuter}>
                                        <Text style={styles.checkoutTextInner}>Account Name : {bankdetail.account_name}</Text>
                                        <Text style={styles.checkoutTextInner}>Bank Name: {bankdetail.bank_name}</Text>
                                        <Text style={styles.checkoutTextInner}>Account Number : {bankdetail.account_number}</Text>
                                        <Text style={styles.checkoutTextInner}>IFSC : {bankdetail.IFSC}</Text>
                                        <Text style={styles.checkoutTextInner}>Comment : {bankdetail.comment}</Text>
                                        <TouchableOpacity style={styles.viewAllBtn} onPress={() => {
                                            _placeOrder("banktransfer", "");
                                        }}>
                                            <Text style={styles.viewAllBtnText}>Place Order</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </>

                        }

                        {Object.keys(razorpay).length != 0 &&
                            <TouchableOpacity onPress={() => {
                                setCheck(3);
                                var options = {
                                    description: 'Payment to RichWorld Expert',
                                    image: 'https://richworld.online/frontEnd/images/richworldlogo.png',
                                    currency: 'INR',
                                    key: razorpay.RAZORPAY_KEY,
                                    amount: totalPrice * 100,
                                    name: 'Richworld',
                                    // order_id: response.order_id,//Replace this with an order_id created using Orders API.
                                    //order_id: 5, 
                                    prefill: {
                                        email: userData.email,
                                        contact: userData.phone,
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
                        }
                    </View>



                </ScrollView>
                <Footer navigation={navigation} />
            </>
        )
    }

}


export default Checkout;