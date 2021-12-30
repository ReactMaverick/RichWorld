import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import { VIEW_WISHLIST, ADD_WISHLIST, ADD_TO_CART } from '../../config/ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
function Wishlist({ navigation }) {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [Products, setProducts] = useState([]);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [basePath, setBasePath] = useState("");

  const _getWishList = async (user_id) => {

    fetch(VIEW_WISHLIST + user_id, {
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
          console.log(response.base_path)
          setProducts(response.result);
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
  const _removeFromWishlist = (products_id, products_attributes_prices_id) => {
    setIsLoading(true)
    const formData = new FormData();
    var customers_id = userData.id;
    formData.append('customers_id', customers_id);
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
        // console.log("response", response)
        _getWishList(customers_id)
      }
    })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }
  const _addToCart = (products_id, attributes_ids, quantity) => {
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
    formData.append('prod_attributeids', attributes_ids);
    formData.append('quantity', quantity);
    console.log(JSON.stringify(formData, null, " "));
    fetch(ADD_TO_CART, {
      method: "POST",
      body: formData
    }).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    }).then(([status, response]) => {
      if (status == 200) {
        console.log("response", response)
      }
    })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }
  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('userData').then((userData) => {
        if (userData != null) {
          setIsLogin(true)
          setUserData(JSON.parse(userData))
          var userDetails = JSON.parse(userData)
          _getWishList(userDetails.id);
        } else {
          setIsLogin(false)
        }
      })
    }

  }, [navigation, isFocused]);
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
          <Text style={styles.CategoryText2}>My Wishlist</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {Products.map((item, key) => (
            <View style={styles.outerBox} key={key}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: basePath + "/" + item.image_path }} style={styles.userImage} />

                <View style={styles.leftBox}>
                  <Text style={styles.leftText1}>{item.products_name}	</Text>
                  <Text style={styles.leftText2}>₹{item.discounted_price}</Text>
                </View>
              </View>

              <View style={styles.outerBtn}>
                <TouchableOpacity onPress={() => {
                  _removeFromWishlist(item.products_id, item.products_attributes_prices_id)
                }} style={[styles.btn, { backgroundColor: '#A20101' }]}>
                  <Text style={styles.btnTxt}>Remove</Text>
                </TouchableOpacity>
                {item.defaultStock <= 0 ?
                  <View style={[styles.btn, { backgroundColor: '#000000' }]}>
                    <Text style={styles.btnTxt}>Out Of Stock</Text>
                  </View>
                  :
                  <TouchableOpacity onPress={() => {
                    _addToCart(item.products_id, item.attributes_ids, 1)
                  }} style={[styles.btn, { backgroundColor: '#000000' }]}>
                    <Text style={styles.btnTxt}>Add to cart</Text>
                  </TouchableOpacity>
                }

              </View>
            </View>
          ))}

        </ScrollView>
        <Footer navigation={navigation} />
      </>
    )
  }
}


export default Wishlist;