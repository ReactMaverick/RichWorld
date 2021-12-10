import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput,ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import styles from "./styles";
import HTMLView from 'react-native-htmlview';
import { Rating } from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';
import { GET_PRODUCT_DETAILS, ADD_TO_CART } from '../../config/ApiConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProductDetails({ navigation, route }) {
  const { products_id, products_attributes_prices_id } = route.params;
  const [tab, setTab] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [productImage, setProductImage] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);
  const [highListedImage, setHighListedImage] = useState();
  const [basePath, setBasePath] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [androidId, setAndroidId] = useState("");
  const [activeAttributeIds, setActiveAttributeIds] = useState("");


  const _productDetails = async (customers_id, deviceId, products_id, products_attributes_prices_id) => {
    setIsLoading(true)
    fetch(GET_PRODUCT_DETAILS + 'products_id=' + products_id + '&products_attributes_prices_id=' + products_attributes_prices_id + '&customers_id=' + customers_id + '&session_id=' + deviceId, {
      method: "GET",
    })
      .then((response) => {

        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {

        if (status == 200) {
          // console.log(status, response.detail.product_data[0]['images']);
          setProductImage(response.detail.product_data[0]['images']);
          setProductDetails(response.detail.product_data[0]);
          setActiveAttributeIds(response.detail.product_data[0].attributes_ids);
          console.log(response.detail.product_data[0].attributes_ids)
          setProductAttributes(response.detail.product_data[0].attributes);
          if(response.detail.product_data[0]['images'].length>0){
            setHighListedImage(response.detail.product_data[0]['images'][0].image_path)
          }else{
            setHighListedImage(response.detail.product_data[0].image_path)
          }
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
  const _addToCart = (quantity) => {
     setIsLoading(true)
    const formData = new FormData();
    var customers_id = "";
    var session_id = "";
    if( isLogin ){
      customers_id = userData.id;
    }else{
      session_id = androidId;
    }
    formData.append('customers_id', customers_id);
    formData.append('session_id', session_id);
    formData.append('products_id', products_id);
    formData.append('prod_attributeids', productDetails.prod_attributeids);
    formData.append('quantity', quantity);

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

  const _changeActiveAttributeIds= (old_products_attributes_id,new_products_attributes_id) => {
    var attributes_ids = activeAttributeIds.replace(old_products_attributes_id, new_products_attributes_id);
    console.log(attributes_ids)
    setActiveAttributeIds(attributes_ids);
  }

  useEffect(() => {
   AsyncStorage.getItem('userData').then((userData) => {
        if (userData != null) {
          setIsLogin(true)
          setUserData(JSON.parse(userData))
          var userDetails = JSON.parse(userData)
          _productDetails(userDetails.id,"", products_id, products_attributes_prices_id)
        } else {
          setIsLogin(false)
          DeviceInfo.getAndroidId().then((androidId) => {
            setAndroidId(androidId)
            _productDetails("",androidId, products_id, products_attributes_prices_id)
          });
        }
      })
    
  }, [navigation,route]);
if(isLoading){
  return(
    <>
    <ActivityIndicator size="large" color="#AB0000" />
    </>
  )
}else{
  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <View style={styles.filterTextBox}>
          <Text style={styles.CategoryText1}>{productDetails.brands_name} </Text>
          {/* <Text style={styles.CategoryText2}>Socks</Text> */}
        </View>

      </View>
      <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
        <View style={styles.productImageSection}>
          <Image source={{uri:highListedImage}} style={styles.productZoomImage} />
          <View style={styles.imageThumbSection}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
              {productImage.length > 0 ?
                <>
                  {productImage.map((item,key) => (
                    <TouchableOpacity key={key} onPress={()=>{
                      setHighListedImage(item.image_path)
                    }}>
                      <Image source={{ uri: item.image_path }} style={styles.productThumb} />
                    </TouchableOpacity>

                  ))}
                </>
                :
                <>
                  <TouchableOpacity >
                    <Image source={{ uri: productDetails.image_path }} style={styles.productThumb} />
                  </TouchableOpacity>
                </>}


            </ScrollView>
          </View>
        </View>
        <Text style={styles.productTitle}>{productDetails.products_model}</Text>
        <View style={styles.productDetails}>
          <View style={styles.ratingSection}>
            <View style={styles.ratingText}>
              <Text style={styles.sellingPrice}>₹{productDetails.discounted_price}  </Text>
              <Text style={styles.mrpPrice}>₹{productDetails.products_price} </Text>
            </View>
            <View style={styles.ratingStar}>
              <Rating
                startingValue={productDetails.avg_review==null?0:productDetails.avg_review}
                ratingCount={5}
                showRating={false}
                imageSize={20}
                readonly={true}
                style={{ alignSelf: 'flex-end', marginLeft: 5 }}
              />
              <Text style={styles.reviewText}>(62 Reviews)</Text>
            </View>


          </View>
          <Text style={styles.descriptionText}>{productDetails.products_name} </Text>
          {productAttributes.map((item,key) => (
            <View style={styles.attribute} key={key}>
              <Text style={styles.attributeLeft}>{item.option.name} :</Text>
              <View style={styles.attributeRight}>
                {item.values.map((item2,key2) => (
                  <TouchableOpacity onPress={() => {
                    _changeActiveAttributeIds(item.values1[0].products_attributes_id, item2.products_attributes_id)
                }} style={{ flexDirection:'row', flexWrap:'wrap'}} key={key2}>
                  {item.option.show_image == 1?
                  <Image source={{ uri: basePath + "/" + item2.option_image }} style={ activeAttributeIds.includes(item2.products_attributes_id)? styles.attrimgActive : styles.attrimg } />
                  :
                  <View style={ activeAttributeIds.includes(item2.products_attributes_id)? styles.attrboxActive : styles.attrbox }><Text style={ activeAttributeIds.includes(item2.products_attributes_id)? styles.attrboxTxtActive : styles.attrboxTxt }>{item2.value}</Text></View>
                  }
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
          
          
          {/* <View style={styles.attribute}>
            <Text style={styles.attributeLeft}>Color :</Text>
            <View style={styles.attributeRight}>
              <Image source={require('../../assets/Image/Product1.png')} style={styles.attrimg} />
              <Image source={require('../../assets/Image/Product1.png')} style={styles.attrimg} />
              <Image source={require('../../assets/Image/Product1.png')} style={styles.attrimg} />
            </View>

          </View>

          <View style={styles.attribute}>
            <Text style={styles.attributeLeft}>Sizes :</Text>
            <View style={styles.attributeRight}>
              <View style={styles.attrbox}><Text style={styles.attrboxTxt}>XS</Text></View>
              <View style={styles.attrbox}><Text style={styles.attrboxTxt}>S</Text></View>
              <View style={styles.attrbox}><Text style={styles.attrboxTxt}>L</Text></View>
              <View style={styles.attrbox}><Text style={styles.attrboxTxt}>M</Text></View>
            </View>

          </View>


          <View style={styles.attribute}>
            <Text style={styles.attributeLeft}>Quantity :</Text>
            <View style={styles.attributeRight}>
              <View style={styles.quantityPlusBox}><Text style={styles.attrboxTxt}>-</Text></View>
              <View style={styles.quantityTextBox}><Text style={styles.attrboxTxt}>1</Text></View>
              <View style={styles.quantityMinusBox}><Text style={styles.attrboxTxt}>+</Text></View>

            </View>

          </View> */}
        </View>
        <Text style={styles.pincodeCheckTitle}>Delivery Pincode Availability :</Text>
        <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
          <View style={styles.picodeCheckoutBox}>
            <TextInput
              placeholder={''}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>
          <TouchableOpacity style={styles.pincodeCheckoutBtn}>
            <Text style={styles.pincodeCheckoutText}>Check</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.loyaltyPointBox}>
          <Text style={styles.loyaltyPointText}>For Every  100 Spent, you earn 2 Loyalty Points
            (Max 50 Points per order)</Text>
        </View>

        <View style={{ margin: 10 }}>
          <HTMLView
            value={productDetails.products_special_instructions}
            stylesheet={styles}
          />
        </View>

        <Text style={styles.pincodeCheckTitle}>Bulk Quantity Discounts!! :</Text>
        <View style={{ margin: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.bulkTitle}>Select</Text>
            <Text style={styles.bulkTitle}>Quantity</Text>
            <Text style={styles.bulkTitle}>Discount</Text>
            <Text style={styles.bulkTitle}>Price per prices</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
            <View style={styles.bulkText}>
              <MaterialIcons style={{ fontSize: 16 }} name="radio-button-checked" />
            </View>
            <Text style={styles.bulkText}>5-10</Text>
            <Text style={styles.bulkText}>10.00%</Text>
            <Text style={styles.bulkText}>₹ 8.55</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
            <View style={styles.bulkText}>
              <MaterialIcons style={{ fontSize: 16 }} name="radio-button-off" />
            </View>
            <Text style={styles.bulkText}>5-10</Text>
            <Text style={styles.bulkText}>10.00%</Text>
            <Text style={styles.bulkText}>₹ 8.55</Text>
          </View>


        </View>

        <View style={styles.tabheader}>
          <TouchableOpacity onPress={() => {
            setTab(1)
          }} style={tab == 1 ? styles.tabActive : styles.tab}><Text style={styles.tabText}>Description</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setTab(2)
          }} style={tab == 2 ? styles.tabActive : styles.tab}><Text style={styles.tabText}>Review & Rating</Text></TouchableOpacity>
        </View>

        {tab == 1 ?
          <View style={styles.tabContent1}>

            <HTMLView
              value={productDetails.products_description}
              stylesheet={styles}
            />
          </View>
          :
          <View style={styles.tabContent2}>

            <View style={styles.reviewBox}>
              <View style={styles.reviewTopSection}>
                <Image source={require('../../assets/Image/userImage.png')} style={styles.reviewUserImage} />
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.reviewUserName}>John Snow </Text><Text style={[styles.reviewUserName, { color: '#818181' }]}>- jan 14,2021</Text>
                  </View>


                  <Rating
                    startingValue={5}
                    ratingCount={5}
                    showRating={false}
                    imageSize={20}
                    style={{ alignItems: 'flex-start' }}
                  />
                </View>

              </View>
              <Text style={styles.reviewDescription}>Donec accumsan auctor iaculis. Sed suscipit arcu ligula, at egestas magna molestie a. Proin ac ex maximus, ultrices justo eget, sodales orci. Aliquam egestas libero ac turpis pharetra, in vehicula lacus scelerisque</Text>
            </View>


            <Text style={styles.pincodeCheckTitle}>Add a Review</Text>
            <View style={styles.addReviewBox}>



              <Rating
                startingValue={5}
                ratingCount={5}
                showRating={false}
                imageSize={20}
                style={{ alignSelf: 'flex-start', marginLeft: 10 }}
              />


              <View style={styles.reviewAddTextBox}>
                <TextInput
                  placeholder={''}
                  style={[styles.textInput]}
                  multiline={true}
                  numberOfLines={4}
                // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
                />
              </View>



              <TouchableOpacity style={styles.btnOuter}>
                <Text style={styles.btnTxt}>Submit</Text>
              </TouchableOpacity>

            </View>

          </View>
        }
      </ScrollView>
      <View style={styles.attToCartBtn}>
        <View style={[styles.footerBtn, { backgroundColor: '#A20101' }]}><Text style={styles.btnTxt}>Buy Now</Text></View>
        <TouchableOpacity onPress={() => {
            _addToCart(1)
          }}style={[styles.footerBtn, { backgroundColor: '#620000' }]}><Text style={styles.btnTxt}>Add to cart</Text></TouchableOpacity>
      </View>
    </>
  )
}
 

}


export default ProductDetails;