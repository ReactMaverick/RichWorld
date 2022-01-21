import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import HTMLView from 'react-native-htmlview';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { BLOG_DETAILS } from '../../config/ApiConfig';
import dateFormat, { masks } from "dateformat";
import { useIsFocused } from "@react-navigation/native";

function BlogDetails({ navigation, route }) {
  const { id } = route.params;
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [blogDetails, setBlogDetails] = useState({});
  const [basePath, setBasePath] = useState("");

  const _getBlogDetails = async () => {
    setIsLoading(true)
    fetch(BLOG_DETAILS + id, {
      method: "get",
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          // console.log("blogDetails",response.blogDetails);
          setBlogDetails(response.blogDetails[0]);
          setBasePath(response.base_path)
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }

  const _getParsedDate = (date) => {
    // console.log(date)
    date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    return [parseInt(days[0]), parseInt(days[1]) - 1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
  }

  useEffect(() => {
    if (isFocused) {
      _getBlogDetails()
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
        <Text style={styles.CategoryText2}>Blog</Text>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
            <AntDesign name="leftcircleo" style={styles.titleIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>

            <Image style={styles.productImage} source={{ uri: basePath + "/" + blogDetails.image }} />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={styles.productTitle}>{blogDetails.news_name} |</Text>
              <Text style={[styles.productTitle, { color: '#818181' }]}>{
                // blogDetails.created_at
                dateFormat(new Date(..._getParsedDate(blogDetails.created_at)).toString(), "mmm dS, yyyy, h:MM:ss TT")
              }</Text>
            </View>
            <Text style={[styles.productTitle, { fontSize: 14 }]}>{blogDetails.news_name}</Text>

            <HTMLView
              value={blogDetails.news_description}
              stylesheet={styles}
            />
            <Text style={[styles.productTitle, { fontSize: 15 }]}>{blogDetails.categories_name}</Text>
            <View style={styles.nextPrevOuter}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name="left" style={styles.nexticon} />
              <Text style={styles.nextText}>Prev Post</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.nextText}>Next Post</Text>
              <AntDesign name="right" style={styles.nexticon} />
            </View> */}

            </View>
          </View>

          {/* <Text style={[styles.CategoryText2, { marginLeft: 10 }]}>COMMENTS : 02</Text>

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
        </View> */}
        </ScrollView>
        <Footer navigation={navigation} />
      </>
    )
  }

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