import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MY_ADDRESS, ADD_MY_ADDRESS, UPDATE_SHIPPING_ADDRESS } from '../../config/ApiConfig';
function MyAddress({ navigation }) {


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
        setBillingAddress(response.userBillingAddress);
        setShippingAddressList(response.userShippingAddressList);
      }
    })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }
  const _addShippingAddress = () => {
    if (entryFirstname == '') {
      setAddErrorMessage("Enter First Name");
    } else if (entryStreetAddress == '') {
      setAddErrorMessage("Enter Street Address");
    } else if (entryCity == '') {
      setAddErrorMessage("Enter City");
    } else if (entryState == '') {
      setAddErrorMessage("Enter State");
    } else if (entryPostcode == '') {
      setAddErrorMessage("Enter Postcode");
    } else if (entryPhone == '') {
      setAddErrorMessage("Enter Phone");
    } else if (entryEmail == '') {
      setAddErrorMessage("Enter Email");
    } else {
      setIsLoading(true)
      const formData = new FormData();
      formData.append('user_id', userData.id);
      formData.append('address_type', 'shipping');
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
        }
      })
        .catch((error) => console.log("error", error))
        .finally(() => {
          // toggleAddAddressModal()
          setIsLoading(false)
        });
    }

  }

  const _updateShippingAddress = () => {
    if (addressBookId == '') {
      setErrorMessage("No Address Selected! ");
    } else if (entryFirstname == '') {
      setErrorMessage("Enter First Name");
    } else if (entryStreetAddress == '') {
      setErrorMessage("Enter Street Address");
    } else if (entryCity == '') {
      setErrorMessage("Enter City");
    } else if (entryState == '') {
      setErrorMessage("Enter State");
    } else if (entryPostcode == '') {
      setErrorMessage("Enter Postcode");
    } else if (entryPhone == '') {
      setErrorMessage("Enter Phone");
    } else if (entryEmail == '') {
      setErrorMessage("Enter Email");
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
        }
      })
        .catch((error) => console.log("error", error))
        .finally(() => {
          toggleAddressModal()
          // setIsLoading(false)
        });
    }

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
  }, [navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>Privacy Policy</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>

        <View style={styles.card}>
          <View style={[styles.headerSection, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
            <Text style={styles.headerTitle}>Billing Address</Text>
            <AntDesign name="enviromento" style={styles.downicon} />
          </View>
          <View style={styles.headerSection}>
            <Text style={styles.text1}>{billingAddressList.entry_firstname}</Text>
            <Text style={styles.text2}>{billingAddressList.entry_street_address}, {billingAddressList.entry_firstname}, {billingAddressList.entry_city}, {billingAddressList.entry_state}, {billingAddressList.entry_postcode}</Text>
            <Text style={styles.text2}>Mobile: {billingAddressList.entry_phone}</Text>
            <Text style={styles.text2}>Email: {billingAddressList.entry_email}</Text>
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
            <TouchableOpacity onPress={
              toggleAddAddressModal
            } >
              <Text style={styles.editText} >Add Address</Text>
            </TouchableOpacity>
          </View>
          {shippingAddressList.map((item, key) => (
            <View key={key}>
              <View style={styles.headerSection}>
                <Text style={styles.text1}>{item.entry_firstname}</Text>
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
          ))}
        </View>



      </ScrollView>
      <Footer navigation={navigation} />



      <Modal isVisible={addressModal} onBackdropPress={toggleAddressModal}  >
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
              onFocus={() => {
                setErrorMessage('')
              }}
            />
          </View>

          <TouchableOpacity onPress={() => {
            _updateShippingAddress()
          }} style={styles.btnOuter}>
            <Text style={styles.btnMessage}>Send </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      <Modal isVisible={addAddressModal} onBackdropPress={toggleAddAddressModal}  >
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
              onFocus={() => {
                setAddErrorMessage('')
              }}
            />
          </View>

          <TouchableOpacity onPress={() => {
            _addShippingAddress()
          }} style={styles.btnOuter}>
            <Text style={styles.btnMessage}>Send </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

    </>
  )

}


export default MyAddress;