import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import HeaderHome from "../../components/HeaderHome";
import Footer from "../../components/Footer";
import Swiper from 'react-native-swiper'
import styles from "./styles";
import { BKColor } from "../../common/BKColor";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { GET_HOME, VIEW_CART } from '../../config/ApiConfig'
import SplashScreen from 'react-native-splash-screen'
import DeviceInfo from 'react-native-device-info';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [sliders, setSlide] = useState([])
  const [feature_product, setFeature_product] = useState([])
  const [topSeller, setTopseller] = useState([])
  const [brands, setBrands] = useState([])
  const [category, setCategory] = useState([])

  const userData = useSelector(
    (state) => state.authReducer
  );

  const initialize_cart = (item) =>
    dispatch({
      type: "INTIALIZE_CART",
      payload: item,
    });

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
          // console.log(status, response.sliders);
          setFeature_product(response.feature_product.product_data);
          setTopseller(response.top_seller.product_data);
          setSlide(response.sliders)
          setBrands(response.brands)
          setCategory(response.popularCategory)
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {

      });
  }


  const _getCartList = async (customers_id, session_id) => {
    fetch(VIEW_CART + 'customers_id=' + customers_id + '&session_id=' + session_id + '&shopNow=', {
      method: "get",
    })
      .then((response) => {

        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {

          initialize_cart(response.cart)

        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {

      });
  }



  useEffect(() => {
    SplashScreen.hide();
    _getHomeData();

    AsyncStorage.getItem('userData').then((userData) => {
      if (userData != null) {
        var userDetails = JSON.parse(userData)
        _getCartList(userDetails.id, "")
      } else {
        DeviceInfo.getAndroidId().then((androidId) => {
          _getCartList("", androidId)
        });
      }
    })

  }, [navigation]);

  return (
    <>
      <HeaderHome navigation={navigation} />

      <ScrollView style={{ flex: 1 }}>
        {sliders.length > 0 ?
          <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} autoplayTimeout={5} activeDotColor={BKColor.btnBackgroundColor1}>
            {sliders.map((item) => (
              <TouchableOpacity onPress={() => {
                if (item.type == "product" && item.product_exist == "Yes") {

                  navigation.navigate('ProductDetails', { products_id: item.url, products_attributes_prices_id: item.products_attributes_prices_id });
                }
                if (item.type == "category") {
                  navigation.navigate('ProductList', { title1: item.slider_content_desc, title2: "", filterParam: { 'categories_id': item.url } })
                }
              }} key={item.id} style={styles.slide}>
                <Image source={{ uri: item.path }} style={styles.productSlideImage} />
              </TouchableOpacity>

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


        {feature_product.length >= 3 &&
          <>
            <SectionTitle Title1="FEATURE" title2="PRODUCTS" navigation={navigation} navigationType={'featureProduct'} filterParam={{ 'type': 'is_feature' }} />
            <ProductBox navigation={navigation} products={feature_product} />
          </>
        }

        {brands.length >= 3 &&
          <>
            <SectionTitle Title1="BRAND" title2="PRODUCTS" navigation={navigation} navigationType={'brand'} filterParam={{}} />
            <Brands navigation={navigation} products={brands} />
          </>
        }

        {category.length >= 3 &&
          <>
            <SectionTitle Title1="POPULAR" title2="CATEGORIES" navigation={navigation} navigationType={'category'} filterParam={{}} />
            <CategoryItem navigation={navigation} category={category} />
          </>
        }

        {topSeller.length >= 3 &&
          <>
            <SectionTitle Title1="BEST SELLER" title2="IN LAST MONTH" navigation={navigation} navigationType={'bestSeller'} filterParam={{ 'type': 'topseller' }} />
            <ProductBox navigation={navigation} products={topSeller} />
          </>
        }

      </ScrollView>
      <Footer navigation={navigation} activeTab="Home" />
    </>
  )

}




function SectionTitle({ Title1, title2, navigation, navigationType, filterParam }) {
  return (
    <View style={styles.titleBox}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.titleStyle1}>{Title1} </Text>
        <Text style={styles.titleStyle2}>{title2}</Text>
      </View>
      <TouchableOpacity style={styles.viewAllBtn} onPress={() => {
        if (navigationType == "category") {
          navigation.navigate('Category', { title1: Title1, title2: title2 })
        } else if (navigationType == "featureProduct") {
          navigation.navigate('ProductList', { title1: Title1, title2: title2, filterParam: filterParam })
        } else if (navigationType == "brand") {
          navigation.navigate('Brands', { title1: Title1, title2: title2 })
        } else if (navigationType == "bestSeller") {
          navigation.navigate('ProductList', { title1: Title1, title2: title2, filterParam: filterParam })
        }


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
          navigation.navigate('ProductDetails', { products_id: products[0].products_id, products_attributes_prices_id: products[0].products_attributes_prices_id })
        }} style={styles.productLeft}>
          <Image style={styles.leftImage} source={{ uri: products[0].image_path }} />
          <Text style={styles.productTitle}>{products[0].products_name}</Text>
          <View style={styles.priceBox}>
            <FontAwesome name="inr" style={styles.sellingPrice} /><Text style={styles.sellingPrice}>{products[0].discounted_price}</Text>
            <FontAwesome name="inr" style={styles.mrpPrice} /><Text style={styles.mrpPrice}>{products[0].products_price}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.productRight}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductDetails', { products_id: products[1].products_id, products_attributes_prices_id: products[1].products_attributes_prices_id })
          }} style={[styles.productInner, { marginBottom: 10 }]}>
            <ImageBackground style={styles.rightImage} source={{ uri: products[1].image_path }} resizeMode="cover" />
            {/* <Image style={styles.rightImage} source={{ uri: products[1].image_path }} /> */}
            <Text style={styles.productTitle}>{products[1].products_name}</Text>
            <View style={styles.priceBox}>
              <FontAwesome name="inr" style={styles.sellingPrice} /><Text style={styles.sellingPrice}>{products[1].discounted_price}</Text>
              <FontAwesome name="inr" style={styles.mrpPrice} /><Text style={styles.mrpPrice}>{products[1].products_price}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductDetails', { products_id: products[2].products_id, products_attributes_prices_id: products[2].products_attributes_prices_id })
          }} style={styles.productInner}>
            <ImageBackground style={styles.rightImage} source={{ uri: products[2].image_path }} resizeMode="cover" />
            <Text style={styles.productTitle}>{products[2].products_name}</Text>
            <View style={styles.priceBox}>
              <FontAwesome name="inr" style={styles.sellingPrice} /><Text style={styles.sellingPrice}>{products[2].discounted_price}</Text>
              <FontAwesome name="inr" style={styles.mrpPrice} /><Text style={styles.mrpPrice}>{products[2].products_price}</Text>
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
          navigation.navigate('ProductList', { title1: products[0].brands_name, title2: "", filterParam: { 'brands_id': products[0].brands_id } })
        }} style={styles.productLeft}>
          <Image style={styles.brandLeftImage} source={{ uri: products[0].brands_image_path }} />
          <Text style={styles.productTitle}>{products[0].brands_name}</Text>

        </TouchableOpacity>

        <View style={styles.productRight}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductList', { title1: products[1].brands_name, title2: "", filterParam: { 'brands_id': products[1].brands_id } })
          }} style={[styles.productInner, { marginBottom: 10 }]}>
            <ImageBackground style={styles.brandRightImage} source={{ uri: products[1].brands_image_path }} resizeMode="contain" />
            <Text style={styles.productTitle}>{products[1].brands_name}</Text>

          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductList', { title1: products[2].brands_name, title2: "", filterParam: { 'brands_id': products[2].brands_id } })
          }} style={styles.productInner}>
            <ImageBackground style={styles.brandRightImage} source={{ uri: products[2].brands_image_path }} resizeMode="contain" />
            <Text style={styles.productTitle}>{products[2].brands_name}</Text>

          </TouchableOpacity>
        </View>
      </View>
    )
  }

}


function CategoryItem({ navigation, category }) {
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
          navigation.navigate('ProductList', { title1: category[0].name, title2: "", filterParam: { 'categories_id': category[0].id } })
        }} style={styles.productLeft}>
          <Image style={styles.leftImageCategory} source={{ uri: category[0].imgpath }} />
          <Text style={styles.productTitle}>{category[0].name}</Text>

        </TouchableOpacity>
        <View style={styles.productRight}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductList', { title1: category[1].name, title2: "", filterParam: { 'categories_id': category[1].id } })
          }} style={[styles.productInner, { marginBottom: 10 }]}>
            <Image style={styles.rightImageCategory} source={{ uri: category[1].imgpath }} />
            <Text style={styles.productTitle}> {category[1].name}</Text>

          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductList', { title1: category[2].name, title2: "", filterParam: { 'categories_id': category[2].id } })
          }} style={styles.productInner}>
            <Image style={styles.rightImageCategory} source={{ uri: category[2].imgpath }} />
            <Text style={styles.productTitle}> {category[2].name}</Text>

          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
export default HomeScreen;