import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, Modal, Linking } from 'react-native';
import ThankyouIcon from '../../assets/Image/Thankyou'
import styles from "./styles";

import { CONTACT_US } from '../../config/ApiConfig'

function Thankyou({ navigation, route }) {
  const { orders_data } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [contactUs, setContactUs] = useState({});

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
  useEffect(() => {
    _getContactUs()
  }, [navigation]);

  return (
    <>
       <View style={{ flex: 1 }}>
            
            <View style={{ flex: 1, padding: 20 }}>

                

                <View style={{ flex: 1, marginTop: 30, justifyContent:'center',alignItems:'center' }}>

              <ThankyouIcon width={80} height={80} color="#AB0000" />
                   <Text style={styles.thankyouText}>Thank you</Text>
                   <Text style={styles.thankyouText1}>Your order number is - <Text style={styles.thankyouText2}>{ orders_data.orders_id }</Text></Text>

                   <Text style={styles.thankyouText1}>It will be delivered soon!</Text>

                   <Text style={styles.thankyouText1}>Email us at <Text style={styles.thankyouText2} onPress={()=>{
                  Linking.openURL(`mailto:${contactUs.contact_us_email}`);
                }}>{contactUs.contact_us_email}</Text></Text> 
                <Text style={styles.thankyouText1}>with any questions or suggession.</Text>
                </View>
            </View>

            <TouchableOpacity  onPress={() => navigation.navigate('HomeScreen')} style={styles.enterBtn}>
                <Text style={styles.btnTxt}>Continue Purchase</Text>
            </TouchableOpacity>


        </View>

    </>
  )

}



export default Thankyou;