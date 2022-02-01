import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import { BLOGS } from '../../config/ApiConfig';
import dateFormat, { masks } from "dateformat";
import { useIsFocused } from "@react-navigation/native";


function Blog({ navigation }) {

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [basePath, setBasePath] = useState("");

  const _getBlogs = async () => {
    setIsLoading(true)
    fetch(BLOGS, {
      method: "get",
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          setBlogs(response.blogs.news_data);
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

  useEffect(() => {
    if (isFocused) {
      _getBlogs()
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
        </View>
        <ScrollView >
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

            {
              blogs.length > 0 ?
                blogs.map((item, key) => (
                  <ProductBox
                  key={key}
                    navigation={navigation}
                    id={item.news_id}
                    name={item.news_name}
                    description={item.news_description}
                    date={item.created_at}
                    image={basePath + "/" + item.image_path} />
                ))
                :
                <></>}

            {/* <View style={styles.loadMorebtn}><Text style={styles.loadMoreTxt}>Load More</Text></View> */}


          </View>
          {/* <Text style={[styles.CategoryText2,{marginLeft:10}]}>Recent Posts</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginLeft: 10}}>
      <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
          <ProductBox navigation={navigation} />
      </ScrollView> */}
        </ScrollView>

        <Footer navigation={navigation} />
      </>
    )
  }

}

const stringFormat = (str) => {
  var cleanText = str.replace(/<\/?[^>]+(>|$)/g, "");
  if (cleanText.length > 40) {
    return cleanText.substring(0, 40) + '...';
  } else {
    return cleanText;
  }
}


const _getParsedDate = (date) => {
  // console.log(date)
  date = String(date).split(' ');
  var days = String(date[0]).split('-');
  var hours = String(date[1]).split(':');
  return [parseInt(days[0]), parseInt(days[1]) - 1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
}


function ProductBox({ navigation, id, name, description, date, image }) {
  return (
    <TouchableOpacity  onPress={() => {
      navigation.navigate('BlogDetails', { id: id });
    }} style={styles.productBox}  >
      <Image style={styles.productImage} source={{ uri: image }} />
      {/* <View style={{ flexDirection: 'row' }}>
        <Text style={styles.productTitle}>{name} |</Text>
        <Text style={[styles.productTitle, { color: '#818181' }]}>{date}</Text>
      </View> */}
      <Text style={styles.productTitle}>{name}</Text>
      <Text style={[styles.productTitle, { color: '#818181' }]}>{
        // date
        dateFormat(new Date(..._getParsedDate(date)).toString(), "mmm dS, yyyy, h:MM:ss TT")
      }</Text>

      <Text style={styles.productTitle}>{stringFormat(description)}</Text>

    </TouchableOpacity>
  )
}

export default Blog;