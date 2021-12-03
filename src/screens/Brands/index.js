import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "./styles";

import { GET_ALL_BRANDS } from '../../config/ApiConfig'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
function Brands({ navigation, route }) {
  const { title1, title2 } = route.params;
  const [allBrands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const _getCategory = async () => {
    fetch(GET_ALL_BRANDS, {
      method: "GET",
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          //  console.log(status, response);
         setBrands(response.brands);
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {

        setIsLoading(false)
      });
  }

  useEffect(() => {
    _getCategory();
  }, []);

  return (
    <>
      <Header navigation={navigation} />

      <View style={styles.filterBar}>
        <View style={styles.filterTextBox}>
          <Text style={styles.CategoryText1}>{title1} </Text>
          <Text style={styles.CategoryText2}>{title2}</Text>
        </View>

      </View>

      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>

          {isLoading ?
          <>          
            <SkeletonPlaceholder>
              <View style={styles.productBox}>
              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View style={styles.productBox}>
              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View style={styles.productBox}>
              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View style={styles.productBox}>
              </View>
            </SkeletonPlaceholder>
            </>
            :
            <>
              {allBrands.map((item) => (
                <TouchableOpacity key={item.brands_id} style={styles.productBox}>
                  <Image style={styles.productImage} source={{ uri: item.brands_image_path }} />
                  <Text style={styles.productTitle}>{item.brands_name}</Text>
                </TouchableOpacity>
              ))}
            </>
          }






        </View>
      </ScrollView>

      <Footer navigation={navigation} />

    </>
  )

}



export default Brands;