import React, { useState, useEffect, createRef } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "./styles";

import { GET_ALL_CATEGORY } from '../../config/ApiConfig'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
function Category({ navigation, route }) {
  const { title1, title2 } = route.params;
  const [allCategory, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const _getCategory = async () => {
    fetch(GET_ALL_CATEGORY+1, {
      method: "GET",
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          // console.log(status, response);
          console.log(JSON.stringify(response.allCategory, null, " "));
          setCategory(response.allCategory);
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
      <Header navigation={navigation} backArrow={true} />

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
              {allCategory.map((item) => (
                <TouchableOpacity key={item.id} onPress={() => {
                  navigation.navigate('ProductList',{ title1: item.name, title2: "", filterParam: { 'categories_id': item.id }})
                }} style={styles.productBox}>
                  <Image style={styles.productImage} source={{ uri: item.imgpath }} />
                  <Text style={styles.productTitle}>{item.name}</Text>
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



export default Category;