import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput, Dimensions, ActivityIndicator, Linking } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';

import Entypo from 'react-native-vector-icons/Entypo'
import { CONTACT_US, CONTACT_US_REQUEST } from '../../config/ApiConfig'
import { showMessage, hideMessage } from "react-native-flash-message";
function ContactInfo({ navigation }) {

  const [isLoading, setIsLoading] = useState(true);
  const [contactUs, setContactUs] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const _getContactUs = async () => {
    setIsLoading(true)
    fetch(CONTACT_US, {
      method: "get",
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          // console.log(JSON.stringify(response.contactDetails, null, " "));
          setContactUs(response.contactDetails);
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }
  // _sendContactUsRequest
  const _sendContactUsRequest = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    console.log(JSON.stringify(formData, null, " "));
    fetch(CONTACT_US_REQUEST, {
      method: "POST",
      body: formData
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          // console.log(JSON.stringify(response, null, " "));
          showMessage({
            message: response.message,
            type: "info",
            backgroundColor: "#808080",
          })
          setName("")
          setPhone("")
          setEmail("")
          setSubject("")
          setMessage("")
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
    _getContactUs();
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
          <Text style={styles.CategoryText2}>Contact Info</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.card}>

            <View style={styles.itemOuter}>
              <View style={styles.itemLeft}>
                <Entypo name="location-pin" style={styles.itemIcon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.text1}>Our Address</Text>
                <Text style={styles.text3}>{contactUs.contact_us_title}</Text>
                <Text style={styles.text2}>{contactUs.contact_us_address}</Text>
              </View>
            </View>

            <View style={styles.itemOuter}>
              <View style={styles.itemLeft}>
                <Entypo name="old-phone" style={styles.itemIcon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.text2} onPress={()=>{
                  Linking.openURL(`tel:${contactUs.contact_us_phone}`);
                  // for ios - `telprompt:${number}`
                }}>{contactUs.contact_us_phone}</Text>
              </View>
            </View>

            <View style={styles.itemOuter}>
              <View style={styles.itemLeft}>
                <Entypo name="email" style={styles.itemIcon} />
              </View>
              <View style={styles.itemRight}>

                <Text style={styles.text2} onPress={()=>{
                  Linking.openURL(`mailto:${contactUs.contact_us_email}`);
                  // Example: Linking.openURL('mailto:example@gmail.com?subject=example&body=example')
                }}>{contactUs.contact_us_email}</Text>
              </View>
            </View>

            <WebView
              scalesPageToFit={true}
              bounces={false}
              javaScriptEnabled
              style={{ height: 200, width: Dimensions.get('window').width }}
              source={{
                html: contactUs.contact_us_location,
              }}
              automaticallyAdjustContentInsets={false}
            />
            <Text style={styles.formTitle}>Get In Touch</Text>
            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Name'}
                style={[styles.textInput]}
                value={name}
                onChangeText={(name) => setName(name)}
              />
            </View>

            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Email'}
                style={[styles.textInput]}
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
            </View>

            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Phone'}
                style={[styles.textInput]}
                value={phone}
                onChangeText={(phone) => setPhone(phone)}
              />
            </View>

            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Subject'}
                style={[styles.textInput]}
                value={subject}
                onChangeText={(subject) => setSubject(subject)}
              />
            </View>

            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Your Message'}
                style={[styles.textInput, { height: 100 }]}
                multiline={true}
                value={message}
                onChangeText={(message) => setMessage(message)}
              />
            </View>

            <TouchableOpacity onPress={() => {
              _sendContactUsRequest();
            }} style={styles.btnOuter}>
              <Text style={styles.btnMessage}>Send Message</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        <Footer navigation={navigation} />
      </>
    )
  }

}


export default ContactInfo;