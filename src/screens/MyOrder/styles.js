import { Dimensions, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { BKColor } from '../../common/BKColor';
export default StyleSheet.create({

    filterBar: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    CategoryText2: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: BKColor.btnBackgroundColor1,
        textTransform: 'uppercase'
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,


        borderRadius: 5,

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    headerBox: {
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },
    headerText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#818181'
    },
    downIcon: {
        fontSize: 20,
        color: '#818181'
    },
    productDetails: {
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
    },
    productImage: {
        width: 100,
        height: 100
    },
    title1: {
        fontFamily: 'Poppins-Bold',
        color: BKColor.btnBackgroundColor1,
        fontSize: 15,
    },
    title2: {
        fontFamily: 'Poppins-Regular',
        color: '#818181',
        fontSize: 14,
    },
    priceOuter: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop:5,
        justifyContent: 'space-between',
        flexDirection: 'row'

    },
    priceText: {
        color: '#818181',
        fontFamily: 'Poppins-Regular',
        fontSize:14
    },
    priceText1: {
        color: BKColor.btnBackgroundColor1,
        fontFamily: 'Poppins-Bold',
        fontSize:14
    },
    trackOrderOuter:{
        borderTopColor: '#CCCCCC',
        borderTopWidth: 1,
        paddingBottom:10
    },
    viewAllBtn:{
        backgroundColor:BKColor.btnBackgroundColor1,
        padding:10,
        margin:10,
        borderRadius:5,
        alignItems:'center'
    },
    viewAllBtnText:{
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
    },
   



});
