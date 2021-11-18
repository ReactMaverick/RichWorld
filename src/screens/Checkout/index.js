import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import Fontisto from 'react-native-vector-icons/Fontisto'
import RazorpayCheckout from 'react-native-razorpay';
function Checkout({ navigation }) {

 const [check, setCheck] = useState(0);

    useEffect(() => {
    }, [navigation]);

    return (
        <>
            <Header navigation={navigation} />
            <ScrollView style={{ flex: 1 }}>

                <View style={styles.outerSection}>
                    <View><Text style={styles.checkoutTextHead}>Choose Payment Method</Text></View>

                    <TouchableOpacity onPress={()=>{
                        setCheck(1);
                       navigation.navigate('Thankyou');
                    }} style={styles.checkoutInner}>
                        <Fontisto name={check==1?"checkbox-active":"checkbox-passive"} style={styles.paymentIcon} />
                        <Text style={styles.checkoutTextInner}>Cash on delivery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        setCheck(2);
                        navigation.navigate('Thankyou');
                    }} style={styles.checkoutInner}>
                        <Fontisto name={check==2?"checkbox-active":"checkbox-passive"} style={styles.paymentIcon} />
                        <Text style={styles.checkoutTextInner}>Direct Bank Transfer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        setCheck(3);
                        var options = {
                            description: 'Payment to RichWorld Expert',
                            image: 'https://richworld.online/frontEnd/images/richworldlogo.png',
                            currency: 'INR',
                            key: 'rzp_test_CX62akPXgMwPrk',
                            amount: 2000,
                            name: 'Richworld',
                            // order_id: response.order_id,//Replace this with an order_id created using Orders API.
                            //order_id: 5, 
                            prefill: {
                                email: 'user123@gmail.com',
                                contact: '0123456789',
                                name: 'User Name'
                            },
                            theme: { color: '#AB0000' }
                        }
                        RazorpayCheckout.open(options).then((data) => {

                           
                            navigation.navigate('Thankyou');
                            // handle success
                            alert(`Success: ${data.razorpay_payment_id}`);
                        }).catch((error) => {
                           
                          //  navigation.navigate('Thankyou');
                            console.log(error.code, error.description);
                            // handle failure
                            // alert(`Error: ${error.code} | ${error.description}`);
                        });
                    }} style={styles.checkoutInner}>
                        <Fontisto name={check==3?"checkbox-active":"checkbox-passive"} style={styles.paymentIcon} />
                        <Text style={styles.checkoutTextInner}>Razorpay</Text>
                    </TouchableOpacity>

                </View>



            </ScrollView>
            <Footer navigation={navigation} />
        </>
    )

}


export default Checkout;