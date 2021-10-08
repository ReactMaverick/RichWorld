import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import HTMLView from 'react-native-htmlview';
import AntDesign from 'react-native-vector-icons/AntDesign'

function BlogDetails({ navigation }) {



  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>Blog</Text>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>

          <Image style={styles.productImage} source={require('../../assets/Image/blog1.png')} />
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={styles.productTitle}>News |</Text>
            <Text style={[styles.productTitle, { color: '#818181' }]}>May 25, 2020</Text>
          </View>
          <Text style={[styles.productTitle, { fontSize: 14 }]}>Five things you only know if you’re at...</Text>

          <HTMLView
            value={'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprhendit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qei officia deser mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore<br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '}
            stylesheet={styles}
          />
          <Text style={[styles.productTitle, { fontSize: 15 }]}>Lifestyle , Interior , Outdoor</Text>
          <View style={styles.nextPrevOuter}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name="left" style={styles.nexticon} />
              <Text style={styles.nextText}>Prev Post</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.nextText}>Next Post</Text>
              <AntDesign name="right" style={styles.nexticon} />
            </View>

          </View>
        </View>

        <Text style={[styles.CategoryText2, { marginLeft: 10 }]}>COMMENTS : 02</Text>

        <CommentDetails />
        <CommentDetails />
        <CommentDetails />

        <View style={styles.card}>
          <Text style={[styles.CategoryText2, { alignSelf:'center',fontSize:16}]}>POST A COMMENT</Text>
        <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Name'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>

          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Email'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>
        

          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Your Message'}
              style={[styles.textInput, { height: 100 }]}
              multiline={true}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>

          <TouchableOpacity style={styles.btnOuter}>
            <Text style={styles.btnMessage}>POST COMMENT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}




function CommentDetails({ navigation }) {
  return (
    <View style={styles.outerBox}>
      <Text style={styles.text1}>Anthony Stephens</Text>
      <Text style={styles.text1}>October 14, 2020</Text>
      <Text style={styles.text2}>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolor
        magna aliqua. Ut enim ad minim veniam,</Text>
    </View>
  )
}


export default BlogDetails;