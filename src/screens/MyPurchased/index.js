import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import Modal from "react-native-modal";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


function MyPurchased({ navigation }) {

  const [cancelModal, setCancelModal] = useState(false);

  const toggleCancelModal = () => {
    setCancelModal(!cancelModal);
  };

  useEffect(() => {
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>My Purchased</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>

        <View style={styles.outerBox}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Image source={require('../../assets/Image/cartUse.png')} style={styles.userImage} />
            <View style={styles.leftBox}>
              <Text style={styles.leftText1}>Simple Black T-Shirt	</Text>
              <Text style={styles.leftText2}>₹260.00</Text>
              <Text style={styles.leftText2}>Quantity : 2</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.leftText2}>Subtotal:</Text>
                <Text style={styles.leftText1}>₹260	</Text>
              </View>

            </View>
          </View>

          <View style={styles.outerBtn}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#A20101', flex: 1 }]} onPress={toggleCancelModal} >
              <Text style={styles.btnTxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#620000', flex: 1 }]}>
              <Text style={styles.btnTxt}>Rating</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, { backgroundColor: '#000000', flex: 1.5 }]}>
              <Text style={styles.btnTxt}>Upload images</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.outerBox}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Image source={require('../../assets/Image/cartUse.png')} style={styles.userImage} />
            <View style={styles.leftBox}>
              <Text style={styles.leftText1}>Simple Black T-Shirt	</Text>
              <Text style={styles.leftText2}>₹260.00</Text>
              <Text style={styles.leftText2}>Quantity : 2</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.leftText2}>Subtotal:</Text>
                <Text style={styles.leftText1}>₹260	</Text>
              </View>

            </View>
          </View>

          <View style={styles.outerBtn}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#A20101', flex: 1 }]} onPress={toggleCancelModal}>
              <Text style={styles.btnTxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#620000', flex: 1 }]}>
              <Text style={styles.btnTxt}>Rating</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, { backgroundColor: '#000000', flex: 1.5 }]}>
              <Text style={styles.btnTxt}>Upload images</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.outerBox}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Image source={require('../../assets/Image/cartUse.png')} style={styles.userImage} />
            <View style={styles.leftBox}>
              <Text style={styles.leftText1}>Simple Black T-Shirt	</Text>
              <Text style={styles.leftText2}>₹260.00</Text>
              <Text style={styles.leftText2}>Quantity : 2</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.leftText2}>Subtotal:</Text>
                <Text style={styles.leftText1}>₹260	</Text>
              </View>

            </View>
          </View>

          <View style={styles.outerBtn}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#A20101', flex: 1 }]} onPress={toggleCancelModal}>
              <Text style={styles.btnTxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#620000', flex: 1 }]}>
              <Text style={styles.btnTxt}>Rating</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, { backgroundColor: '#000000', flex: 1.5 }]}>
              <Text style={styles.btnTxt}>Upload images</Text>
            </TouchableOpacity>
          </View>
        </View>


      </ScrollView>
      <Footer navigation={navigation} />


      <Modal isVisible={cancelModal} onBackdropPress={toggleCancelModal}  >
        <View style={styles.cancelPopup}>
         <View style={styles.headerPopup}>
         <Text style={styles.CategoryText2}>Write Your Reason</Text>
         <TouchableOpacity onPress={toggleCancelModal}>
         <AntDesign name="close" style={styles.closeBtn} />
         </TouchableOpacity>
       
         
         </View>
         <View style={styles.itemOuter}>
         <MaterialIcons style={{ fontSize: 20 }} name="radio-button-checked" />
         <Text style={styles.radioText}> Defected product</Text>
         </View>

         <View style={styles.itemOuter}>
         <MaterialIcons style={{ fontSize: 20 }} name="radio-button-off" />
         <Text  style={styles.radioText}>Product quality not good</Text>
         </View>

         <View style={styles.itemOuter}>
         <MaterialIcons style={{ fontSize: 20 }} name="radio-button-off" />
         <Text  style={styles.radioText}>Product quality not good</Text>
         </View>
         
          <Text style={[styles.leftText2,{color:'#000'}]}>Your Comment</Text>
         
          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Your Comment'}
              style={[styles.textInput, { height: 100 }]}
              multiline={true}
              numberOfLines={4}
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


export default MyPurchased;