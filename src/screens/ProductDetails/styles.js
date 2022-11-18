import { Dimensions, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/BKColor';
export default StyleSheet.create({

    filterBar: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    filterTextBox: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    CategoryText1: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: BKColor.btnBackgroundColor1,
        textTransform: 'uppercase'
    },
    CategoryText2: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: BKColor.btnBackgroundColor1,
        textTransform: 'uppercase'
    },
    productImageSection: {
        margin: 10,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start'
    },
    productZoomImage: {
        width: wp("65%"),
        height: hp("35%"),
        marginRight: 5
    },
    imageThumbSection: {
        flex: 1,
        height: 300,
    },
    productThumb: {
        height: 100,
        marginBottom: 5,
        
    },
    productTitle: {
        color: BKColor.btnBackgroundColor1,
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginLeft: 10
    },
    sellingPrice: {
        color: '#2E2E2E',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        marginLeft: 5
    },
    titleSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        // backgroundColor: '#fff'
    },
    shareIcon: {
        color: BKColor.btnBackgroundColor1,
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginRight: 10
    },
    mrpPrice: {
        color: '#888888',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        textDecorationLine: 'line-through'
    },
    ratingText: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    ratingSection: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff'
    },
    ratingStar: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center'
    },
    reviewText:{
        marginTop:7,
        marginLeft:3,
        color:'#E8A814'
    },
    productDetails:{
        backgroundColor:'#fff'
    },
    descriptionText:{
        margin:10,
        color:'#8F8F8F',
        fontFamily:'Poppins-Regular',
        fontSize:13
    },
    attribute:{
        flex:1,
        flexDirection:'row',
        padding:10,
        alignItems:'center'
    },
    attributeRight:{
        flex:1,
        flexDirection:'row',
        flexWrap: 'wrap'
        
    },
    attributeLeft:{
        flex:1,
        fontFamily:'Poppins-Regular',
        fontSize:14
    },
    attrimg:{
        height:40,
        width:40,
        borderRadius:20,
        marginLeft:10,
        borderWidth:1,
        borderColor:BKColor.btnBackgroundColor1,
        marginBottom:5,
    },
    attrimgActive:{
        height:40,
        width:40,
        borderRadius:20,
        marginLeft:10,
        borderWidth:3,
        borderColor:BKColor.btnBackgroundColor1,
        marginBottom:5,
    },
    attrbox:{
        // width:30,
        paddingHorizontal:10,
        paddingVertical:5,
        borderColor:BKColor.btnBackgroundColor1,
        borderWidth:1,
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:5,

    },
    attrboxActive:{
        // width:30,
        paddingHorizontal:10,
        paddingVertical:5,
        marginBottom:5,
        backgroundColor:BKColor.btnBackgroundColor1,
        borderWidth:1,
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center'

    },
    attrboxTxt:{
        color:'#000',
    },
    attrboxTxtActive:{
        color:'#fff',
    },
    quantityPlusBox:{
        width:30,
        height:30,             
        justifyContent:'center',
        alignItems:'center',
        borderLeftColor:'#DEDEDE',
        borderBottomColor:'#DEDEDE',
        borderTopColor:'#DEDEDE',
        borderBottomWidth:1,
        borderTopWidth:1,
        borderLeftWidth:1,
        marginLeft:10
    },
    quantityTextBox:{
        width:30,
        height:30,             
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#DEDEDE',
        borderWidth:1
    },
    quantityMinusBox:{
        width:30,
        height:30,             
        justifyContent:'center',
        alignItems:'center',
        borderRightColor:'#DEDEDE',
        borderBottomColor:'#DEDEDE',
        borderTopColor:'#DEDEDE',
        borderBottomWidth:1,
        borderTopWidth:1,
        borderRightWidth:1
    },
    pincodeCheckTitle:{
        margin:10,
        fontFamily:'Poppins-Bold',
        fontSize:14,
        color: BKColor.btnBackgroundColor1,
    },
    loyaltyPointBox:{
        backgroundColor:BKColor.btnBackgroundColor1,
        padding:10,
        margin:10,
        borderRadius:5
    },
    loyaltyPointText:{
        fontFamily:'Poppins-Regular',
        fontSize:14,
        color: '#fff',
    },
    textInput:{
        color:'#000',
        fontFamily:'Poppins-Regular',
        fontSize:12,
        width:'100%'
      
    },
    picodeCheckoutBox:{
        backgroundColor:'#fff',
        width:'60%',
        height:45,
        justifyContent:'center'
    },
    pincodeCheckoutBtn:{
        backgroundColor: BKColor.btnBackgroundColor1,
        width:'37%',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
        
    },
    pincodeCheckoutText:{
        fontSize:14,
        color:'#fff',
        fontFamily:'Poppins-Bold',
    },
    bulkTitle:{
        fontFamily:'Poppins-Bold',
        color: BKColor.btnBackgroundColor1,
        fontSize:13,
        flex:1
    },
    bulkText:{
        fontFamily:'Poppins-Regular',
        color: '#404040',
        fontSize:13,
        // flex:1
    },
    attToCartBtn:{        
        height:55,
        flexDirection:'row'
    },
    footerBtn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    btnTxt:{
        fontFamily:'Poppins-Bold',
        fontSize:14,
        color:'#fff'
    },
    tabheader:{
        flexDirection:'row',
        height:45,
        margin:10,
    },
    tab:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    tabActive:{
        flex:1,
        borderBottomColor:'#000',
        borderBottomWidth:3,
        justifyContent:'center',
        alignItems:'center'
    },
    tabContent1:{
        flex:1,
        // margin:10,
        // padding:10
    },
    tabContent2:{
        margin:10,
       
    },
    reviewBox:{
        backgroundColor:'#fff',
        padding:10,
        borderRadius:7

    },
    reviewTopSection:{
        flexDirection:'row',
        alignItems:'center',
        
    },
    reviewUserImage:{
        width:80,
        height:80,
        borderRadius:40,
        marginRight:10
    },
    reviewUserName:{
        fontFamily:'Poppins-Regular',
        color:'#000',
        fontSize:14
    },
    reviewDescription:{
        fontFamily:'Poppins-Regular',
        color:'#818181',
        fontSize:14
    },
    addReviewBox:{
        backgroundColor:'#fff',
        padding:10,
        borderRadius:7
    },
    reviewAddTextBox:{
      borderBottomColor:'#EEEEEE',
      borderBottomWidth:1,
      flex:1,
      height:100,
      marginTop:10

    },
    btnOuter:{
        height:50,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#AB0000'
    },
    heartIcon:{
        fontSize:25,
        color: BKColor.btnBackgroundColor1
    },
    quantityOuter: {
        flexDirection: 'row',
        marginTop: 10
    },
    quantityInner: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityInnerBtn: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A20101'
    },
    

});
