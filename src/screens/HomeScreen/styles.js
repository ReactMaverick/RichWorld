import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/BKColor';

export default StyleSheet.create({

    titleBox: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        padding: 10,
        alignItems:'center'

    },
    titleStyle1: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: BKColor.textColor1
    },
    titleStyle2: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: BKColor.textColor1,
    },
    titleIcon: {
        fontSize: 24,
        color: '#fff',
        marginLeft:5
    },
    outerProductBox: {
        flex: 1,
        
        margin: 10,
        flexDirection: 'row'
    },
    productLeft: {
        flex: 6,
        marginRight: 10,
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent:'center'
    },
    productRight: {
        flex: 5,
    },
    leftImage: {
        // height: wp("27%"),
        // width: wp("45%")
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    brandLeftImage: {
        height: wp("27%"),
        width: wp("45%")
       
    },
    rightImage: {
        width: wp("30%"),
        height: hp("10%"),
        alignSelf: 'center'
    },
    brandRightImage: {
        width: '100%',
        height: wp("22%"),
   
       alignSelf:'center'
    },

    leftImageCategory: {
        height: 260,
        width: '100%'
    },
    rightImageCategory: {
        width: wp("30%"),
        height: hp("15%"),
        alignSelf: 'center'
    },
    productInner:{
        backgroundColor:'#fff'
    },
    productTitle:{
        fontSize:13,
        fontFamily:'Poppins-Medium',
        marginLeft:5,
        marginTop:5
    },
    priceBox: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center'
    },
    sellingPrice: {
        color: '#2E2E2E',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        marginLeft: 5
    },
    mrpPrice: {
        color: '#888888',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        textDecorationLine: 'line-through'
    },
    categoryOuter: {
        width: Dimensions.get('window').width / 3,
        marginRight: 10,
        alignItems: 'center'

    },
    categoryImage: {
        width: Dimensions.get('window').width / 3 - 30,
        height: Dimensions.get('window').width / 3 - 30,
        borderRadius: (Dimensions.get('window').width / 3 - 30) / 2,
        borderWidth: 1,
        borderColor: '#707070'
    },
    categoryName: {
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#2E2E2E',
        marginTop: 5

    },

    viewAllBtn:{
        flexDirection:'row',
        backgroundColor: BKColor.btnBackgroundColor1,
        padding:10,
        borderRadius:5,
        alignItems:'center'
    },
    viewAllBtnText:{
        color: BKColor.white,
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
    },
    wrapper: {
        height: Dimensions.get('window').height/3,
    },
    slide: {
        height: Dimensions.get('window').height/3,
        width: Dimensions.get('window').width,
       // backgroundColor: '#9DD6EB'
    },

    text: {
        color: BKColor.white,
        fontSize: 30,
        fontWeight: 'bold'
    },
    productSlideImage: {
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height/3,
        resizeMode: 'stretch'
    }


});
