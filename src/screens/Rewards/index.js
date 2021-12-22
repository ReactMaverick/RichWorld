import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, TextInput, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import styles from "./styles";
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { REWARDS } from '../../config/ApiConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";


function Rewards({ navigation }) {

    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [rewards, setRewards] = useState([]);

    const _getRewards = async (user_id) => {
        const formData = new FormData();
        formData.append('user_id', user_id);
        fetch(REWARDS, {
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
                    // console.log(JSON.stringify(response.loyalty_point_list, null, " "));
                    setRewards(response.loyalty_point_list);
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
            AsyncStorage.getItem('userData').then((userData) => {
                if (userData != null) {
                    setIsLogin(true)
                    setUserData(JSON.parse(userData))
                    var userDetails = JSON.parse(userData)
                    _getRewards(userDetails.id)
                } else {
                    setIsLogin(false)
                    navigation.navigate('Login');
                }
            })
        }
    }, [navigation, isFocused]);

    return (
        <View>
            <View style={styles.headerBox}>
                <TouchableOpacity style={styles.box1} onPress={() => {
                    navigation.openDrawer();
                }}>
                    <Entypo name="menu" style={styles.menuIcon} />
                </TouchableOpacity>
                <View style={styles.box2} >
                    <Image source={require('../../assets/Image/richworldlogo.png')} style={styles.logo} />

                </View>
                <View style={styles.box3} >

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Search');

                    }}>
                        <Feather name="search" style={styles.menuIcon2} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('MyCart',{shopNow: 0});

                    }}>
                        <AntDesign name="shoppingcart" style={styles.menuIcon} />
                    </TouchableOpacity>


                    {/* <Image source={require('../../assets/Image/userImage.png')} style={styles.userLogo} /> */}

                </View>

            </View>
            <View style={styles.headingSection}>

                <Image style={styles.rewardImage} source={require('../../assets/Image/loyalty.png')}></Image>
                <Text style={styles.menuText}>Rewards</Text>


            </View>

            <ScrollView>
                <View style={styles.rewardFullSection}>
                    {/* rewards */}
                    {rewards.map((item, key) => (
                        <View style={styles.rewardSection} key={key}>
                            {item.points_earn == 0 ?
                                <>
                                    <View style={styles.rewardSectionText}><Text style={styles.rewardText}>{item.orderProductStr}</Text></View>
                                    <View><Text style={styles.rewardText1}>-{item.points_spent}</Text></View>
                                </>
                                :
                                <>
                                    <View style={styles.rewardSectionText}><Text style={styles.rewardText}>{item.orderProductStr}</Text></View>
                                    <View><Text style={styles.rewardText2}>+{item.points_earn}</Text></View>
                                </>
                            }
                        </View>
                    ))}


                </View>
            </ScrollView>
        </View>
    )

}



export default Rewards;