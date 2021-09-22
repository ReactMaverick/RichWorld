import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  
    titleBox: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        padding: 10

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
        color: '#620000'
    },
    productBox :{
        width:Dimensions.get('window').width/2-50,
        height:Dimensions.get('window').width/2+50,
        backgroundColor:'#fff',
        margin:10,
        borderRadius:5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,    

    },
    productImage:{
        width:Dimensions.get('window').width/2-50,
        height:'60%',
        borderTopLeftRadius:5,
        borderTopRightRadius:5
    },
    productTitle:{
        fontSize:13,
        fontFamily:'Poppins-Medium',
        marginLeft:5,
        marginTop:5
    },
    priceBox:{
        flexDirection:'row',
        marginTop:5
    },
    sellingPrice:{
        color:'#2E2E2E',
        fontFamily:'Poppins-Regular',
        fontSize:16,
        marginLeft:5
    },
    mrpPrice:{
        color:'#888888',
        fontFamily:'Poppins-Regular',
        fontSize:12,
        textDecorationLine:'line-through'
    },
    categoryOuter:{
        width:Dimensions.get('window').width/3,
        marginRight:10,
        alignItems:'center'

    },
    categoryImage:{
        width:Dimensions.get('window').width/3-30,
        height:Dimensions.get('window').width/3-30,
        borderRadius:(Dimensions.get('window').width/3-30)/2,
        borderWidth:1,
        borderColor:'#707070'
    },
    categoryName:{
        textAlign:'center',
        fontFamily:'Poppins-Medium',
        fontSize:14,
        color:'#2E2E2E',
        marginTop:5

    },

    wrapper: {
        height:180,
    },
    slide: {
      height:180,
      width:Dimensions.get('window').width,
      backgroundColor: '#9DD6EB'
    },
   
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
    productSlideImage:{
        width:Dimensions.get('window').width
    }
    

});
