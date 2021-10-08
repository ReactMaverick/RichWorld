import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator, Dimensions } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Rating } from 'react-native-ratings';

function ProductList({ navigation }) {

    useEffect(() => {
    }, [navigation]);

    return (
        <>
            <Header navigation={navigation} />

            <View style={styles.filterBar}>
                <View style={styles.filterTextBox}>
                    <Text style={styles.CategoryText1}>Sport </Text>
                    <Text  style={styles.CategoryText2}>Socks</Text>
                </View>
            <Image source={require('../../assets/Image/filter.png')} style={styles.filterIcon}/>
            </View>

            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                    <ProductBox navigation={navigation}/>
                    <ProductBox navigation={navigation}/>
                    <ProductBox navigation={navigation}/>
                    <ProductBox navigation={navigation}/>
                    <ProductBox navigation={navigation}/>
                    <ProductBox navigation={navigation}/>
                    <ProductBox navigation={navigation}/>
                    <ProductBox navigation={navigation}/>
                </View>
            </ScrollView>

            <Footer navigation={navigation} />
        </>
    )

}



function ProductBox({navigation}) {
    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate('ProductDetails');
          }} style={styles.productBox}>
            <Image style={styles.productImage} source={require('../../assets/Image/ProductImg.png')} />
            <Text style={styles.productTitle}>Husskinzl: Men’s socks</Text>
            <Rating
                startingValue={2}
                ratingCount={5}
                showRating={false}
                imageSize={20}
                style={{ alignSelf: 'flex-start', marginLeft: 5 }}
            />
            <View style={styles.priceBox}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.sellingPrice}>₹26.50 </Text>
                    <Text style={styles.mrpPrice}>₹45.85</Text>
                </View>
                <View style={styles.cartIconBox}>
                    <AntDesign name="shoppingcart" style={styles.cartIcon} />
                </View>

            </View>

        </TouchableOpacity>
    )
}


export default ProductList;