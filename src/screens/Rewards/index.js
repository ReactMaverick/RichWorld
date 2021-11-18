import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView,TextInput, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import styles from "./styles";
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'



function Rewards({ navigation }) {



    useEffect(() => {
    }, [navigation]);

    return (
        <View>
            <View style={styles.headerBox}>
        <TouchableOpacity style={styles.box1} onPress={()=>{
            navigation.openDrawer();
        }}>
       <Entypo name="menu" style={styles.menuIcon} />
        </TouchableOpacity>
        <View  style={styles.box2} >
        <Image source={require('../../assets/Image/richworldlogo.png')} style={styles.logo} />

        </View>
       <View  style={styles.box3} >
     
       <TouchableOpacity onPress={() => {
            navigation.navigate('Search');

          }}>
           <Feather name="search" style={styles.menuIcon2}  />
          </TouchableOpacity>
     
       <TouchableOpacity onPress={() => {
            navigation.navigate('MyCart');

          }}>
          <AntDesign name="shoppingcart" style={styles.menuIcon}  />
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
                    <View style={styles.rewardSection}>
                        <View style={styles.rewardSectionText}><Text style={styles.rewardText}>BIOTIQUE Bio Mountain Product</Text></View>
                        <View><Text style={styles.rewardText1}>-52</Text></View>
                    </View>

                    <View style={styles.rewardSection}>
                        <View style={styles.rewardSectionText}><Text style={styles.rewardText}>BIOTIQUE Bio Mountain Product</Text></View>
                        <View><Text style={styles.rewardText2}>+33</Text></View>
                    </View>


                    <View style={styles.rewardSection}>
                        <View style={styles.rewardSectionText}><Text style={styles.rewardText}>BIOTIQUE Bio Mountain Product</Text></View>
                        <View><Text style={styles.rewardText1}>-1</Text></View>
                    </View>


                    <View style={styles.rewardSection}>
                        <View style={styles.rewardSectionText}><Text style={styles.rewardText}>BIOTIQUE Bio Mountain Product</Text></View>
                        <View><Text style={styles.rewardText2}>+52</Text></View>
                    </View>


                    <View style={styles.rewardSection}>
                        <View style={styles.rewardSectionText}><Text style={styles.rewardText}>BIOTIQUE Bio Mountain Product</Text></View>
                        <View><Text style={styles.rewardText1}>-52</Text></View>
                    </View>

                    <View style={styles.rewardSection}>
                        <View style={styles.rewardSectionText}><Text style={styles.rewardText}>BIOTIQUE Bio Mountain Product</Text></View>
                        <View><Text style={styles.rewardText1}>-52</Text></View>
                    </View>
                    
                </View>
            </ScrollView>
        </View>
    )

}



export default Rewards;