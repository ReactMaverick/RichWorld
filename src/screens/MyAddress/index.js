import React, { useState, useEffect, createRef } from "react";
import { Platform } from 'react-native';
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MY_ADDRESS, ADD_MY_ADDRESS, UPDATE_SHIPPING_ADDRESS, DELETE_SHIPPING_ADDRESS } from '../../config/ApiConfig';

import { showMessage, hideMessage } from "react-native-flash-message";
import ActionSheet from "react-native-actions-sheet";
import { useIsFocused } from "@react-navigation/native";
const actionSheetRef = createRef();
function MyAddress({ navigation }) {


  const isFocused = useIsFocused();
  const [addressModal, setAddressModal] = useState(false);
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [billingAddressList, setBillingAddress] = useState({});
  const [shippingAddressList, setShippingAddressList] = useState([]);
  const [errorMsg, setErrorMessage] = useState("")
  const [addErrorMsg, setAddErrorMessage] = useState("")


  const [addressBookId, setAddressBookId] = useState('')
  const [addressType, setAddressType] = useState('')
  const [entryStreetAddress, setEntryStreetAddress] = useState('')
  const [entryCity, setEntryCity] = useState('')
  const [entryState, setEntryState] = useState('')
  const [entryPostcode, setEntryPostcode] = useState('')
  const [entryPhone, setEntryPhone] = useState('')
  const [entryEmail, setEntryEmail] = useState('')
  const [entryFirstname, setEntryFirstname] = useState('')

  const toggleAddressModal = () => {
    setAddressModal(!addressModal);
  };
  const toggleAddAddressModal = () => {
    setAddAddressModal(!addAddressModal);
  };
  const _getMyAdderss = (user_id) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('user_id', user_id);
    fetch(MY_ADDRESS, {
      method: "POST",
      body: formData
    }).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    }).then(([status, response]) => {
      if (status == 200) {
        // console.log(response.userShippingAddressList)
        if (response.userBillingAddress != null) {
          setBillingAddress(response.userBillingAddress);
        } else {
          setBillingAddress({});
        }
        setShippingAddressList(response.userShippingAddressList);
      }
    })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }
  const _addShippingAddress = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (entryFirstname == '') {
      setAddErrorMessage("Please enter First Name");
    } else if (entryStreetAddress == '') {
      setAddErrorMessage("Please enter Street Address");
    } else if (entryCity == '') {
      setAddErrorMessage("Please enter City");
    } else if (entryState == '') {
      setAddErrorMessage("Please enter State");
    } else if (entryPostcode == '') {
      setAddErrorMessage("Please enter Postcode");
    } else if (entryPhone == '') {
      setAddErrorMessage("Please enter Phone");
    } else if (entryPhone.length != 10) {
      setAddErrorMessage("Please enter valid Phone");
    } else if (entryEmail == '') {
      setAddErrorMessage("Please enter Email");
    } else if ((reg.test(entryEmail) === false)) {
      setAddErrorMessage("Please enter valid Email");
    } else {
      setIsLoading(true)
      const formData = new FormData();
      formData.append('user_id', userData.id);
      formData.append('address_type', addressType);
      formData.append('entry_firstname', entryFirstname);
      formData.append('entry_street_address', entryStreetAddress);
      formData.append('entry_city', entryCity);
      formData.append('entry_state', entryState);
      formData.append('entry_postcode', entryPostcode);
      formData.append('entry_phone', entryPhone);
      formData.append('entry_email', entryEmail);
      fetch(ADD_MY_ADDRESS, {
        method: "POST",
        body: formData
      }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      }).then(([status, response]) => {
        if (status == 200) {
          console.log(response)
          _getMyAdderss(userData.id)
          setEntryFirstname('')
          setEntryStreetAddress('')
          setEntryCity('')
          setEntryState('')
          setEntryPostcode('')
          setEntryPhone('')
          setEntryEmail('')
          setAddressType('')

        }
      })
        .catch((error) => console.log("error", error))
        .finally(() => {
          toggleAddAddressModal()
          setIsLoading(false)
        });
    }

  }

  const _updateShippingAddress = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (addressBookId == '') {
      setErrorMessage("No Address Selected! ");
    } else if (entryFirstname == '') {
      setErrorMessage("Please enter First Name");
    } else if (entryStreetAddress == '') {
      setErrorMessage("Please enter Street Address");
    } else if (entryCity == '') {
      setErrorMessage("Please enter City");
    } else if (entryState == '') {
      setErrorMessage("Please enter State");
    } else if (entryPostcode == '') {
      setErrorMessage("Please enter Postcode");
    } else if (entryPhone == '') {
      setAddErrorMessage("Please enter Phone");
    } else if (entryPhone.length != 10) {
      setErrorMessage("Please enter valid Phone");
    } else if (entryEmail == '') {
      setAddErrorMessage("Please enter Email");
    } else if ((reg.test(entryEmail) === false)) {
      setErrorMessage("Please enter valid Email");
    } else {
      setIsLoading(true)
      const formData = new FormData();
      formData.append('address_book_id', addressBookId);
      formData.append('entry_firstname', entryFirstname);
      formData.append('entry_street_address', entryStreetAddress);
      formData.append('entry_city', entryCity);
      formData.append('entry_state', entryState);
      formData.append('entry_postcode', entryPostcode);
      formData.append('entry_phone', entryPhone);
      formData.append('entry_email', entryEmail);
      fetch(UPDATE_SHIPPING_ADDRESS, {
        method: "POST",
        body: formData
      }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      }).then(([status, response]) => {
        if (status == 200) {
          console.log(response)
          _getMyAdderss(userData.id)
          setEntryFirstname('')
          setEntryStreetAddress('')
          setEntryCity('')
          setEntryState('')
          setEntryPostcode('')
          setEntryPhone('')
          setEntryEmail('')
          setAddressBookId('')
        }
      })
        .catch((error) => console.log("error", error))
        .finally(() => {
          toggleAddressModal()
          setIsLoading(false)
        });
    }

  }
  const _deleteShippingAddress = () => {
    console.log("addressBookId", addressBookId)
    fetch(DELETE_SHIPPING_ADDRESS + addressBookId, {
      method: "DELETE",
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {
        if (status == 200) {
          console.log(status, response);
          _getMyAdderss(userData.id)
          showMessage({
            message: response.message,
            type: "info",
            backgroundColor: "#808080",
          });
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {

        setIsLoading(false)
      });
  }
  const _setAddressData = async (address) => {
    setAddressBookId(address.address_book_id);
    setEntryStreetAddress(address.entry_street_address);
    setEntryCity(address.entry_city);
    setEntryState(address.entry_state);
    setEntryPostcode(address.entry_postcode);
    setEntryPhone(address.entry_phone);
    setEntryEmail(address.entry_email);
    setEntryFirstname(address.entry_firstname);
  }

  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('userData').then((userData) => {
        if (userData != null) {
          setIsLogin(true)
          setUserData(JSON.parse(userData))
          var userDetails = JSON.parse(userData)
          _getMyAdderss(userDetails.id);
        } else {
          setIsLogin(false)
        }
      })
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
          <Text style={styles.CategoryText2}>My Address</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>

          <View style={styles.card}>
            <View style={[styles.headerSection, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
              <Text style={styles.headerTitle}>Billing Address</Text>
              {Object.keys(billingAddressList).length === 0 ?
                <TouchableOpacity onPress={() => {
                  setAddressType('billing')
                  toggleAddAddressModal()
                }}>
                  <Text style={styles.editText} >Add Address</Text>
                </TouchableOpacity>
                :
                <AntDesign name="enviromento" style={styles.downicon} />
              }

              {/* <AntDesign name="enviromento" style={styles.downicon} /> */}
            </View>
            <View style={styles.headerSection}>
              {Object.keys(billingAddressList).length === 0 ?

                <>
                  <Text style={styles.text2}>Billing address not yet added</Text>
                </>
                :
                <>
                  <Text style={styles.text1}>{billingAddressList.entry_firstname}</Text>
                  <Text style={styles.text2}>{billingAddressList.entry_street_address}, {billingAddressList.entry_firstname}, {billingAddressList.entry_city}, {billingAddressList.entry_state}, {billingAddressList.entry_postcode}</Text>
                  <Text style={styles.text2}>Mobile: {billingAddressList.entry_phone}</Text>
                  <Text style={styles.text2}>Email: {billingAddressList.entry_email}</Text>
                </>
              }

            </View>
            <TouchableOpacity onPress={() => {
              _setAddressData(billingAddressList).then(() => {
                toggleAddressModal()
              })
            }}
            >
              <Text style={styles.editText} >Edit Address</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.card}>
            <View style={[styles.headerSection, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
              <Text style={styles.headerTitle}>Shipping Address</Text>
              <TouchableOpacity onPress={() => {
                setAddressType('shipping')
                toggleAddAddressModal()
              }}>
                <Text style={styles.editText} >Add Address</Text>
              </TouchableOpacity>
            </View>
            {shippingAddressList.length > 0 ?
              shippingAddressList.map((item, key) => (
                <View key={key}>
                  <View style={styles.headerSection}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={styles.text1}>{item.entry_firstname}</Text>
                      <TouchableOpacity onPress={() => {
                        // _deleteShippingAddress(item.address_book_id)
                        setAddressBookId(item.address_book_id);
                        actionSheetRef.current?.setModalVisible();
                      }}>

                        <AntDesign name="delete" style={styles.downicon} />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.text2}>{item.entry_street_address}, {item.entry_firstname}, {item.entry_city}, {item.entry_state}, {item.entry_postcode}</Text>
                    <Text style={styles.text2}>Mobile: {item.entry_phone}</Text>
                    <Text style={styles.text2}>Email: {item.entry_email}</Text>
                  </View>
                  <TouchableOpacity onPress={() => {
                    _setAddressData(item).then(() => {
                      toggleAddressModal()
                    })
                  }}>
                    <Text style={styles.editText} >Edit Address</Text>
                  </TouchableOpacity>
                </View>
              ))
              :
              <View style={styles.headerSection}>
                <Text style={styles.text2}>Shipping address not yet added</Text>
              </View>
            }
          </View>



        </ScrollView>
        <Footer navigation={navigation} />



        <Modal
          isVisible={addressModal}
          onBackdropPress={toggleAddressModal}
          style={{ marginVertical: Platform.OS == "android" ? 0 : 45, }}
        >
          <ScrollView style={styles.cancelPopup}>
            <View style={styles.headerPopup}>
              <Text style={styles.CategoryText2}>Edit Address</Text>
              <TouchableOpacity onPress={toggleAddressModal}>
                <AntDesign name="close" style={styles.closeBtn} />
              </TouchableOpacity>
            </View>
            {errorMsg != '' ?
              <View style={styles.headerPopup}>
                <Text style={styles.errorMessage}>{errorMsg}</Text>
              </View>
              :
              <></>
            }


            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Full Name'}
                style={[styles.textInput]}
                value={entryFirstname}
                onChangeText={(entryFirstname) => setEntryFirstname(entryFirstname)}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>
            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Street Address'}
                style={[styles.textInput]}
                value={entryStreetAddress}
                onChangeText={(entryStreetAddress) => setEntryStreetAddress(entryStreetAddress)}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>
            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Town / City'}
                style={[styles.textInput]}
                value={entryCity}
                onChangeText={(entryCity) => setEntryCity(entryCity)}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>
            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'State'}
                style={[styles.textInput]}
                value={entryState}
                onChangeText={(entryState) => setEntryState(entryState)}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>
            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Postcode / ZIP'}
                style={[styles.textInput]}
                value={entryPostcode}
                onChangeText={(entryPostcode) => setEntryPostcode(entryPostcode)}
                keyboardType={'phone-pad'}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>
            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Phone'}
                style={[styles.textInput]}
                value={entryPhone}
                onChangeText={(entryPhone) => setEntryPhone(entryPhone)}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>

            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Email Address'}
                style={[styles.textInput]}
                value={entryEmail}
                onChangeText={(entryEmail) => setEntryEmail(entryEmail)}
                keyboardType={'email-address'}
                onFocus={() => {
                  setErrorMessage('')
                }}
              />
            </View>

            <TouchableOpacity onPress={() => {
              _updateShippingAddress()
            }} style={styles.btnOuter}>
              <Text style={styles.btnMessage}>Submit </Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>

        <Modal
          isVisible={addAddressModal}
          onBackdropPress={toggleAddAddressModal}
          style={{ marginVertical: Platform.OS == "android" ? 0 : 45, }}
        >
          <ScrollView style={styles.cancelPopup}>
            <View style={styles.headerPopup}>
              <Text style={styles.CategoryText2}>Add Address</Text>
              <TouchableOpacity onPress={toggleAddAddressModal}>
                <AntDesign name="close" style={styles.closeBtn} />
              </TouchableOpacity>


            </View>
            {addErrorMsg != '' ?
              <View style={styles.headerPopup}>
                <Text style={styles.errorMessage}>{addErrorMsg}</Text>
              </View>
              :
              <></>
            }

            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Full Name'}
                style={[styles.textInput]}
                onChangeText={(entryFirstname) => setEntryFirstname(entryFirstname)}
                onFocus={() => {
                  setAddErrorMessage('')
                }}
              />
            </View>
            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Street Address'}
                style={[styles.textInput]}
                onChangeText={(entryStreetAddress) => setEntryStreetAddress(entryStreetAddress)}
                onFocus={() => {
                  setAddErrorMessage('')
                }}
              />
            </View>
            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Town / City'}
                style={[styles.textInput]}
                onChangeText={(entryCity) => setEntryCity(entryCity)}
                onFocus={() => {
                  setAddErrorMessage('')
                }}
              />
            </View>
            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'State'}
                style={[styles.textInput]}
                onChangeText={(entryState) => setEntryState(entryState)}
                onFocus={() => {
                  setAddErrorMessage('')
                }}
              />
            </View>
            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Postcode / ZIP'}
                style={[styles.textInput]}
                onChangeText={(entryPostcode) => setEntryPostcode(entryPostcode)}
                onFocus={() => {
                  setAddErrorMessage('')
                }}
              />
            </View>
            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Phone'}
                style={[styles.textInput]}
                onChangeText={(entryPhone) => setEntryPhone(entryPhone)}
                keyboardType={'phone-pad'}
                onFocus={() => {
                  setAddErrorMessage('')
                }}
              />
            </View>

            <View style={styles.textInputOuter}>
              <TextInput
                placeholder={'Email Address'}
                style={[styles.textInput]}
                onChangeText={(entryEmail) => setEntryEmail(entryEmail)}
                keyboardType={'email-address'}
                onFocus={() => {
                  setAddErrorMessage('')
                }}
              />
            </View>

            <TouchableOpacity onPress={() => {
              _addShippingAddress()
            }} style={styles.btnOuter}>
              <Text style={styles.btnMessage}>Submit </Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
        <ActionSheet ref={actionSheetRef}>
          <TouchableOpacity onPress={() => {
            _deleteShippingAddress()
            actionSheetRef.current?.hide();
          }} style={[styles.outerBtn, { marginTop: 10 }]}>
            <Text style={styles.btnText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            actionSheetRef.current?.hide();
          }} style={[styles.outerBtn, { backgroundColor: '#808080' }]}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </ActionSheet>
      </>
    )
  }
}


export default MyAddress;