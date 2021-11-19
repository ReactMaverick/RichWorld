import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from "react-native-modal";
function MyAddress({ navigation }) {


  const [addressModal, setAddressModal] = useState(false);

  const toggleAddressModal = () => {
    setAddressModal(!addressModal);
  };

  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>Privacy Policy</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>

        <View style={styles.card}>
          <View style={[styles.headerSection,{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
            <Text style={styles.headerTitle}>Billing Address</Text>
            <AntDesign name="enviromento" style={styles.downicon} />
          </View>
          <View style={styles.headerSection}>
          <Text style={styles.text1}>Bhavesh sharma</Text>
          <Text style={styles.text2}>987 test Address, 57 Road, TN, INDIA, 600033</Text>
          <Text style={styles.text2}>Mobile: (91) 9561459321</Text>
          </View>
          <TouchableOpacity onPress={toggleAddressModal} >
          <Text style={styles.editText} >Edit Address</Text>
          </TouchableOpacity>
          
        </View>


        <View style={styles.card}>
          <View style={[styles.headerSection,{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
            <Text style={styles.headerTitle}>Shipping Address</Text>
            <AntDesign name="enviromento" style={styles.downicon} />
          </View>
          <View style={styles.headerSection}>
          <Text style={styles.text1}>Bhavesh sharma</Text>
          <Text style={styles.text2}>987 test Address, 57 Road, TN, INDIA, 600033</Text>
          <Text style={styles.text2}>Mobile: (91) 9561459321</Text>
          </View>
          
          <TouchableOpacity onPress={toggleAddressModal} >
          <Text style={styles.editText} >Edit Address</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <Footer navigation={navigation} />



      <Modal isVisible={addressModal} onBackdropPress={toggleAddressModal}  >
        <View style={styles.cancelPopup}>
          <View style={styles.headerPopup}>
            <Text style={styles.CategoryText2}>Edit Address</Text>
            <TouchableOpacity onPress={toggleAddressModal}>
              <AntDesign name="close" style={styles.closeBtn} />
            </TouchableOpacity>


          </View>
         
          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Full Name'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>
          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Street Address'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>
          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Town / City'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>
          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'State'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>
          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Postcode / ZIP'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>
          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Phone'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>

          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Email Address'}
              style={[styles.textInput]}
            // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}           
            />
          </View>
         
          <TouchableOpacity style={styles.btnOuter}>
            <Text style={styles.btnMessage}>Send </Text>
          </TouchableOpacity>
        </View>
      </Modal>


    </>
  )

}


export default MyAddress;