import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import HeaderHome from "../../components/HeaderHome";
import Footer from "../../components/Footer";
import Swiper from 'react-native-swiper'
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { GET_HOME } from '../../config/ApiConfig'
import SplashScreen from 'react-native-splash-screen'
function HomeScreen({ navigation }) {

  const [sliders, setSlide] = useState([])
  const [feature_product, setFeature_product] = useState([])
  const [topSeller, setTopseller] = useState([])
  const [brands, setBrands] = useState([])
  const [category, setCategory] = useState([])


  const _getHomeData = async () => {
    fetch(GET_HOME, {
      method: "GET",
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          //console.log(status, response.feature_product.product_data);
          setFeature_product(response.feature_product.product_data);
          setTopseller(response.top_seller.product_data);
          setSlide(response.sliders)
          setBrands(response.brands)
          setCategory(response.popularCategory)
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => { });
  }



  useEffect(() => {
    SplashScreen.hide();
    _getHomeData();

  }, [navigation]);

  return (
    <>
      <HeaderHome navigation={navigation} />

      <ScrollView style={{ flex: 1 }}>
        {sliders.length > 0 ?
          <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} autoplayTimeout={5} activeDotColor={'#AB0000'}>
            {sliders.map((item) => (
              <View key={item.id} style={styles.slide}>
                <Image source={{ uri: item.path }} style={styles.productSlideImage} />
              </View>

            ))}

          </Swiper>
          :

          <SkeletonPlaceholder>
            <View style={styles.wrapper}>
              <View style={styles.slide}>
              </View>
            </View>

          </SkeletonPlaceholder>

        }



        <SectionTitle Title1="FEATURE" title2="PRODUCTS" navigation={navigation} products={feature_product} />
        <ProductBox navigation={navigation} products={feature_product} />

        <SectionTitle Title1="BRAND" title2="PRODUCTS" navigation={navigation} />
        <Brands navigation={navigation} products={brands} />




        <CategorySectionTitle Title1="POPULAR" title2="CATEGORIES" navigation={navigation}  />
        <CategoryItem navigation={navigation} category={category}  />
        


        <SectionTitle Title1="BEST SELLER" title2="IN LAST MONTH" navigation={navigation} />
        <ProductBox navigation={navigation} products={topSeller} />

      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}



function CategorySectionTitle({ Title1, title2, navigation }) {
  return (
    <View style={styles.titleBox}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.titleStyle1}>{Title1} </Text>
        <Text style={styles.titleStyle2}>{title2}</Text>
      </View>
      <TouchableOpacity style={styles.viewAllBtn} onPress={() => {
        navigation.navigate('Category',{title1:Title1,title2:title2})
      }}>
        <Text style={styles.viewAllBtnText}>View All</Text>
        <AntDesign name="rightcircleo" style={styles.titleIcon} />
      </TouchableOpacity>
    </View>
  )
}

function SectionTitle({ Title1, title2, navigation,products }) {
  return (
    <View style={styles.titleBox}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.titleStyle1}>{Title1} </Text>
        <Text style={styles.titleStyle2}>{title2}</Text>
      </View>
      <TouchableOpacity style={styles.viewAllBtn} onPress={() => {
        navigation.navigate('ProductList',{title1:Title1,title2:title2,products:products})
      }}>
        <Text style={styles.viewAllBtnText}>View All</Text>
        <AntDesign name="rightcircleo" style={styles.titleIcon} />
      </TouchableOpacity>
    </View>
  )
}

function ProductBox({ navigation, products }) {
  if (products.length < 3) {
    return (
      <SkeletonPlaceholder>
      <View style={styles.wrapper}>
        <View style={styles.slide}>
        </View>
      </View>

    </SkeletonPlaceholder>


    )
  } else {
    return (
      <View style={styles.outerProductBox}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('ProductDetails')
        }} style={styles.productLeft}>
          <Image style={styles.leftImage} source={{ uri: products[0].image_path }} />
          <Text style={styles.productTitle}>{products[0].products_model}</Text>
          <View style={styles.priceBox}>
            <Text style={styles.sellingPrice}>₹{products[0].discounted_price}</Text>
            <Text style={styles.mrpPrice}>₹{products[0].products_price}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.productRight}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductDetails')
          }} style={[styles.productInner, { marginBottom: 10 }]}>
            <Image style={styles.rightImage} source={{ uri: products[1].image_path }} />
            <Text style={styles.productTitle}>{products[1].products_model}</Text>
            <View style={styles.priceBox}>
              <Text style={styles.sellingPrice}>₹{products[1].discounted_price}</Text>
              <Text style={styles.mrpPrice}>₹{products[1].products_price}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductDetails')
          }} style={styles.productInner}>
            <Image style={styles.rightImage} source={{ uri: products[2].image_path }} />
            <Text style={styles.productTitle}>{products[2].products_model}</Text>
            <View style={styles.priceBox}>
              <Text style={styles.sellingPrice}>₹{products[2].discounted_price}</Text>
              <Text style={styles.mrpPrice}>₹{products[2].products_price}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}



function Brands({ navigation, products }) {
  if (products.length < 3) {
    return (
      <SkeletonPlaceholder>
      <View style={styles.wrapper}>
        <View style={styles.slide}>
        </View>
      </View>

    </SkeletonPlaceholder>
    )
  } else {
    return (
      <View style={styles.outerProductBox}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('ProductDetails')
        }} style={styles.productLeft}>
          <Image style={styles.leftImage} source={{ uri: products[0].brands_image_path }} />
          <Text style={styles.productTitle}>{products[0].brands_name}</Text>
          
        </TouchableOpacity>

        <View style={styles.productRight}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductDetails')
          }} style={[styles.productInner, { marginBottom: 10 }]}>
            <Image style={styles.rightImage} source={{ uri: products[1].brands_image_path }} />
            <Text style={styles.productTitle}>{products[1].brands_name}</Text>
            
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductDetails')
          }} style={styles.productInner}>
            <Image style={styles.rightImage} source={{ uri: products[2].brands_image_path }} />
            <Text style={styles.productTitle}>{products[2].brands_name}</Text>
           
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}


function CategoryItem({ navigation,category }) {
  if (category.length < 3) {
    return (
      <SkeletonPlaceholder>
      <View style={styles.wrapper}>
        <View style={styles.slide}>
        </View>
      </View>

    </SkeletonPlaceholder>
    )
  } else {
  return (
    <View style={styles.outerProductBox}>
      <TouchableOpacity onPress={() => {
        navigation.navigate('ProductList')
      }} style={styles.productLeft}>
        <Image style={styles.leftImageCategory} source={{uri:category[0].imgpath}} />
        <Text style={styles.productTitle}>{category[0].name}</Text>

      </TouchableOpacity>
      <View style={styles.productRight}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('ProductList')
        }} style={[styles.productInner, { marginBottom: 10 }]}>
          <Image style={styles.rightImageCategory} source={{uri:category[1].imgpath}} />
          <Text style={styles.productTitle}> {category[1].name}</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          navigation.navigate('ProductList')
        }} style={styles.productInner}>
          <Image style={styles.rightImageCategory} source={{uri:category[2].imgpath}}  />
          <Text style={styles.productTitle}> {category[2].name}</Text>

        </TouchableOpacity>
      </View>
    </View>
  )
      }
}
export default HomeScreen;