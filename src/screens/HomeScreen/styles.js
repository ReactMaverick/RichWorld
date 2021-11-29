import { Dimensions, StyleSheet } from 'react-native';

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
        color: '#620000'
    },
    titleStyle2: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#620000'
    },
    titleIcon: {
        fontSize: 24,
        color: '#fff',
        marginLeft:5
    },
    outerProductBox: {
        height: 300,
        flex: 1,

        margin: 10,
        flexDirection: 'row'
    },
    productLeft: {
        flex: 6,
        marginRight: 10,
        backgroundColor:'#fff',

    },
    productRight: {
        flex: 5
    },
    leftImage: {
        height: 220,
        width: '100%'
    },
    rightImage: {
        height: 80,
        width: '100%'
    },

    leftImageCategory: {
        height: 260,
        width: '100%'
    },
    rightImageCategory: {
        height: 115,
        width: '100%'
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
        marginTop: 5
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
        backgroundColor:'#AB0000',
        padding:10,
        borderRadius:5,
        alignItems:'center'
    },
    viewAllBtnText:{
        color: '#fff',
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
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    productSlideImage: {
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height/3,
        resizeMode: 'stretch'
    }


});
