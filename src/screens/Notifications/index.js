import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NOTIFICATION_LIST } from '../../config/ApiConfig';
import dateFormat, { masks } from "dateformat";

function Notifications({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsList, setNotificationsList] = useState([]);

  const _getNotificationsList = async (userData) => {
    setIsLoading(true)
    var customers_id = userData.id;
    fetch(NOTIFICATION_LIST + customers_id, {
      method: "get",
    })
      .then((response) => {

        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          // console.log(JSON.stringify(response.List, null, " "));
          setNotificationsList(response.List);
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }
  const _formateDate = (date) => {

   return date
   
  }
  useEffect(() => {
    AsyncStorage.getItem('userData').then((userData) => {
      if (userData != null) {
        _getNotificationsList(JSON.parse(userData));
      } else {


      }
    })
  }, [navigation]);
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
          <Text style={styles.CategoryText2}>Notifications</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {notificationsList.map((item, key) => (
            <View style={styles.notificationOuter} key={key} >
              <Text style={styles.orderTitle}>{item.redirect_type}</Text>
              <Text style={styles.orderDescription}>{item.notification_text}</Text>
              <Text style={styles.orderDate}>{_formateDate(item.created_at)}</Text>
            </View>
          ))}



        </ScrollView>
        <Footer navigation={navigation} />
      </>
    )
  }
}


export default Notifications;