import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import HTMLView from 'react-native-htmlview';
import { Rating } from 'react-native-ratings';
import { TESTIMOIALS } from '../../config/ApiConfig';
function Testimonials({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  const _getTestimonials = async () => {
    fetch(TESTIMOIALS, {
        method: "get",
    })
        .then((response) => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then(([status, response]) => {
            if (status == 200) {
                // console.log(JSON.stringify(response.testimonial_list, null, " "));
                setTestimonials(response.testimonial_list);
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
    _getTestimonials();
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>Testimonials</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {testimonials.map((item,key)=>(
          <View style={styles.card} key={key}>
          <View style={styles.imageouter}>
            <Image style={styles.userImage} source={{uri:item.profile_image}} />
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>{item.customers_name}</Text>
              <Text style={styles.date}>March 14,2021</Text>
              <Rating
                startingValue={item.reviews_rating}
                ratingCount={5}
                showRating={false}
                imageSize={20}
                readonly={true}
                style={{ alignSelf: 'flex-start' }}
              />
            </View>
          </View>
          <HTMLView
            value={item.reviews_text}
            stylesheet={styles}
          />
        </View>
        ))}
        


      </ScrollView>
      <Footer navigation={navigation} />
    </>
  )

}


export default Testimonials;