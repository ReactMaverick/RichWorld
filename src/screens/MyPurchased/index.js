import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, TextInput, Alert, ImageBackground } from 'react-native';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import Modal from "react-native-modal";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-crop-picker';
import { Rating } from 'react-native-ratings';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { MY_PURCHASED, SUBMIT_RATTINGS, RETURN_PRODUCT, UPLOAD_PRODUCTS_IMAGES } from '../../config/ApiConfig';

function MyPurchased({ navigation }) {

  const [cancelModal, setCancelModal] = useState(false);

  const [check, setCheck] = useState("1");

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [purchasedOrderList, setPurchasedOrderList] = useState([]);
  const [returnReasons, setReturnReasons] = useState([]);
  const [basePath, setBasePath] = useState("");
  const [errorMsg, setErrorMessage] = useState("")
  const [returnErrorMsg, setReturnErrorMessage] = useState("")

  const [productsId, setProductsId] = useState("");
  const [ordersId, setOrdersId] = useState("");
  const [images, setImages] = useState([]);
  const [starRatting, setStarRatting] = useState(5);
  const [reviewsText, setReviewsText] = useState("");
  const [returnReasonId, setReturnReasonId] = useState("");
  const [returnText, setReturnText] = useState("");

  const toggleCancelModal = () => {
    setCancelModal(!cancelModal);
    setReturnReasonId(returnReasons[0].return_reasons_id);
    setCheck(returnReasons[0].return_reasons_id);
    setReturnText("");
  };

  const [ratingModal, setRatingModal] = useState(false);

  const toggleRatingModal = () => {
    setRatingModal(!ratingModal);
    setStarRatting(5);
    setReviewsText("");
  };


  const [imageModal, setImageModal] = useState(false);

  const toggleImageModal = () => {
    setImageModal(!imageModal);
  };

  const stringFormat = (str) => {
    if (str.length > 50) {
      return str.substring(0, 50) + '...';
    } else {
      return str;
    }
  }

  const _getPurchasedOrders = async (user_id) => {
    const formData = new FormData();
    formData.append('user_id', user_id);
    fetch(MY_PURCHASED, {
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
          setBasePath(response.base_path);
          setReturnReasons(response.returnReasons);
          setPurchasedOrderList(response.completed_order_list);
        } else {
          console.log(status, response);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  }

  const _submitRaitings = async () => {
    if (starRatting == '') {
      setErrorMessage("Please Select Stars");
    } else if (reviewsText == '') {
      setErrorMessage("Please Enter Reviews Text");
    } else {
      const formData = new FormData();
      formData.append('user_id', userData.id);
      formData.append('first_name', userData.first_name);
      formData.append('products_id', productsId);
      formData.append('starRatting', starRatting);
      formData.append('reviews_text', reviewsText);
      // console.log(JSON.stringify(formData, null, " "));
      fetch(SUBMIT_RATTINGS, {
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
            console.log(JSON.stringify(response, null, " "));
          } else {
            console.log(status, response);
          }
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setIsLoading(false);
          toggleRatingModal();
          setStarRatting(5);
          setReviewsText("");
        });
    }

  }

  const _submitReturnRequest = async () => {
    if (returnReasonId == '') {
      setReturnErrorMessage("Please Select Return Reason");
    } else if (returnText == '') {
      setReturnErrorMessage("Please Enter Return Text");
    } else {
      const formData = new FormData();
      formData.append('user_id', userData.id);
      formData.append('products_id', productsId);
      formData.append('orders_id', ordersId);
      formData.append('return_reason', returnReasonId);
      formData.append('return_comment', returnText);
      // console.log(JSON.stringify(formData, null, " "));
      fetch(RETURN_PRODUCT, {
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
            console.log(JSON.stringify(response, null, " "));
          } else {
            console.log(status, response);
          }
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setIsLoading(false);
          toggleCancelModal();
          setStarRatting(5);
          setReviewsText("");
        });
    }

  }

  const _uploadProductImages = async () => {
    if (images.length > 0) {
      console.log("Please Select Image")
      // setReturnErrorMessage("Please Select Image");
    } else {
      const formData = new FormData();
      formData.append('user_id', userData.id);
      formData.append('products_id', productsId);
      formData.append('images', images);
      fetch(UPLOAD_PRODUCTS_IMAGES, {
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      })
        .then((response) => {

          const statusCode = response.status;
          const data = response.json();
          return Promise.all([statusCode, data]);
        })
        .then(([status, response]) => {
          if (status == 200) {
            console.log(JSON.stringify(response, null, " "));
          } else {
            console.log(status, response);
          }
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setIsLoading(false);
          toggleImageModal();
          setImages([])
        });
    }

  }

  const _removeImage = (key) => {
          // console.log(key)
          const UploadImages  = images;
          UploadImages.splice(key, 1);
          console.log(UploadImages)
          setImages(UploadImages);
  }
  useEffect(() => {

    AsyncStorage.getItem('userData').then((userData) => {
      if (userData != null) {
        setIsLogin(true)
        setUserData(JSON.parse(userData))
        var userDetails = JSON.parse(userData)
        // console.log(userDetails)
        _getPurchasedOrders(userDetails.id);
      } else {
        setIsLogin(false)
        navigation.navigate('Login');
      }
    })
  }, [navigation,images]);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.filterBar}>
        <Text style={styles.CategoryText2}>My Purchased</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {purchasedOrderList.map((item, key) => (
          <View style={styles.outerBox} key={key}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: basePath + "/" + item.image }} style={styles.userImage} />
              <View style={styles.leftBox}>
                <Text style={styles.leftText1}>{stringFormat(item.products_name)}</Text>
                <Text style={styles.leftText2}>₹{item.final_price}</Text>
                <Text style={styles.leftText2}>Order ID : {item.orders_id}</Text>
                <Text style={styles.leftText2}>Delivery Date : {item.delivery_date}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.leftText2}>Subtotal:</Text>
                  <Text style={styles.leftText1}>₹{item.final_price}	</Text>
                </View>

              </View>
            </View>

            <View style={styles.outerBtn}>

              {item.return_request == 0 && item.is_returnable == 1 ?
                <TouchableOpacity style={[styles.btn, { backgroundColor: '#A20101', flex: 1 }]} onPress={() => {
                  setOrdersId(item.orders_id);
                  setProductsId(item.products_id);
                  toggleCancelModal();
                }}>
                  <Text style={styles.btnTxt}>Return</Text>
                </TouchableOpacity>
                : <></>}

              <TouchableOpacity style={[styles.btn, { backgroundColor: '#620000', flex: 1 }]} onPress={() => {
                setProductsId(item.products_id);
                toggleRatingModal();
              }}>
                <Text style={styles.btnTxt}>Rating</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.btn, { backgroundColor: '#000000', flex: 1.5 }]} onPress={toggleImageModal}>
                <Text style={styles.btnTxt}>Upload images</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}


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
          {returnErrorMsg != '' ?
            <View style={styles.headerPopup}>
              <Text style={styles.errorMessage}>{returnErrorMsg}</Text>
            </View>
            :
            <></>
          }
          {returnReasons.map((item, key) => (
            <TouchableOpacity onPress={() => {
              setReturnReasonId(item.return_reasons_id);
              setCheck(item.return_reasons_id);
              setReturnErrorMessage('');
            }} style={styles.itemOuter} key={key}>
              <MaterialIcons style={{ fontSize: 20 }} name={check == item.return_reasons_id ? "radio-button-checked" : "radio-button-off"} />
              <Text style={styles.radioText}>{item.retutn_reason}</Text>
            </TouchableOpacity>
          ))}

          <Text style={[styles.leftText2, { color: '#000' }]}>Your Comment</Text>

          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={'Your Comment'}
              style={[styles.textInput, { height: 100 }]}
              multiline={true}
              numberOfLines={4}
              value={returnText}
              onChangeText={(returnText) => setReturnText(returnText)}
              onFocus={() => {
                setReturnErrorMessage('')
              }}
            />
          </View>

          <TouchableOpacity onPress={() => {
            _submitReturnRequest();
          }} style={styles.btnOuter}>
            <Text style={styles.btnMessage}>Send </Text>
          </TouchableOpacity>
        </View>
      </Modal>


      <Modal isVisible={ratingModal} onBackdropPress={toggleRatingModal}  >
        <View style={styles.cancelPopup}>
          <View style={styles.headerPopup}>
            <Text style={styles.CategoryText2}>Write Your Review</Text>
            <TouchableOpacity onPress={toggleRatingModal}>
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
          <Rating
            startingValue={starRatting}
            ratingCount={5}
            showRating={false}
            imageSize={20}
            onFinishRating={(value) => {
              setStarRatting(value);
            }}
            onStartRating={() => {
              setErrorMessage('')
            }}
            style={{ alignSelf: 'flex-start', marginTop: 20, marginBottom: 10 }}
          />

          <Text style={[styles.leftText2, { color: '#000' }]}>Your feedback</Text>

          <View style={styles.textInputOuter}>
            <TextInput
              placeholder={''}
              style={[styles.textInput, { height: 100 }]}
              multiline={true}
              numberOfLines={4}
              value={reviewsText}
              onChangeText={(reviewsText) => setReviewsText(reviewsText)}
              onFocus={() => {
                setAddErrorMessage('')
              }}
            />
          </View>

          <TouchableOpacity style={styles.btnOuter} onPress={() => {
            _submitRaitings();
          }}>
            <Text style={styles.btnMessage}>Send </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={imageModal} onBackdropPress={toggleImageModal}  >
        <View style={styles.cancelPopup}>
          <View style={styles.headerPopup}>
            <Text style={styles.CategoryText2}>Upload Your Images</Text>
            <TouchableOpacity onPress={() => {
                    toggleImageModal();
                    setImages([]);
                  }}>
              <AntDesign name="close" style={styles.closeBtn} />
            </TouchableOpacity>

          </View>
          <ScrollView>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {images.map((item, key) => (
                <ImageBackground style={styles.productBox} source={{ uri: item.path }} key={key} >
                  <TouchableOpacity onPress={() => {
                    _removeImage(key)
                  }}>
                  <AntDesign name="closecircle" style={[styles.closeBtn, {  alignSelf: 'flex-end', padding: 10,zIndex:2 }]} />
                  </TouchableOpacity>
                </ImageBackground>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.btnOuterImage} onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              multiple: true
            }).then(images => {
              setImages(images);
              console.log(images);
            });
          }}>
            <Text style={styles.btnImageText}>Upload Images </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOuter} onPress={() => {
                    _uploadProductImages()
                  }}>
            <Text style={styles.btnMessage}>Submit </Text>
          </TouchableOpacity>
        </View>
      </Modal>



    </>
  )

}



export default MyPurchased;