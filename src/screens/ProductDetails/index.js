import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import Header from "../../components/Header";
import styles from "./styles";
import HTMLView from 'react-native-htmlview';
import { Rating } from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
function ProductDetails({ navigation }) {

  const [tab, setTab] = useState(1);

  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <View style={styles.filterTextBox}>
          <Text style={styles.CategoryText1}>Sport </Text>
          <Text style={styles.CategoryText2}>Socks</Text>
        </View>

      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.productImageSection}>
          <Image source={require('../../assets/Image/Product1.png')} style={styles.productZoomImage} />
          <View style={styles.imageThumbSection}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity>
                <Image source={require('../../assets/Image/Product1.png')} style={styles.productThumb} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../../assets/Image/Product1.png')} style={styles.productThumb} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../../assets/Image/Product1.png')} style={styles.productThumb} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../../assets/Image/Product1.png')} style={styles.productThumb} />
              </TouchableOpacity>


            </ScrollView>
          </View>
        </View>
        <Text style={styles.productTitle}>Husskinzl: Men’s socks</Text>
        <View style={styles.productDetails}>
          <View style={styles.ratingSection}>
            <View style={styles.ratingText}>
              <Text style={styles.sellingPrice}>₹26.50 </Text>
              <Text style={styles.mrpPrice}>₹45.85</Text>
            </View>
            <View style={styles.ratingStar}>
              <Rating
                startingValue={5}
                ratingCount={5}
                showRating={false}
                imageSize={20}
                style={{ alignSelf: 'flex-end', marginLeft: 5 }}
              />
              <Text style={styles.reviewText}>(62 Reviews)</Text>
            </View>


          </View>
          <Text style={styles.descriptionText}>Nulla eleifend pulvinar purus, molestie euismod odio imperdiet ac. Ut sit amet erat nec nibh </Text>
          <View style={styles.attribute}>
            <Text style={styles.attributeLeft}>Product images :</Text>
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
              <View style={styles.quantityPlusBox}><Text style={styles.attrboxTxt}>+</Text></View>
              <View style={styles.quantityTextBox}><Text style={styles.attrboxTxt}>1</Text></View>
              <View style={styles.quantityMinusBox}><Text style={styles.attrboxTxt}>-</Text></View>

            </View>

          </View>
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
            value={'<ul><li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li><br/><li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li><br/><li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li></ul>'}
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
              value={'Crafted in premium watch quality, fenix Chronos is the first Garmin timepiece to combine a durable metal case with integrated performance GPS to support navigation and sport. In the tradition of classic tool watches it features a tough design and a set of modern meaningful tools.advanced performance metrics for endurance sports, Garmin quality navigation features and smart notifications. In fenix Chronos top-tier performance meets sophisticated design in a highly evolved timepiece that fits your style anywhere, anytime. Solid brushed 316L stainless steel case with brushed stainless steel bezel and integrated EXOTM antenna for GPS + GLONASS support. High-strength scratch resistant sapphire crystal. Brown vintage leather strap with hand-sewn contrast stitching and nubuck inner lining and quick release mechanism.'}
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
        <View style={[styles.footerBtn, { backgroundColor: '#620000' }]}><Text style={styles.btnTxt}>Add to cart</Text></View>
      </View>
    </>
  )

}


export default ProductDetails;