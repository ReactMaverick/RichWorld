import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  


    productBox :{
        width:Dimensions.get('window').width/2-20,
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
        width:Dimensions.get('window').width/2-20,
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
        marginTop:5,
        
        justifyContent:'space-between'
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
    cartIcon:{
        fontSize:20,
        color:'#fff'
    },
    cartIconBox:{
        alignSelf:'flex-end',
        marginRight:10,
        backgroundColor: '#620000',
        width:36,
        height:36,
        borderRadius:18,
        justifyContent:'center',
        alignItems:'center'
    },
    filterBar:{
        backgroundColor:'#fff',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between',
        alignItems:'center'
    },
    filterTextBox:{
        flexDirection:'row',
        alignItems:'center'
       
    },
    CategoryText1: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#620000',
        textTransform:'uppercase'
    },
    CategoryText2: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#620000',
        textTransform:'uppercase'
    },
    filterAreaMain:{
      flex:1,
   
        backgroundColor: "#fff",
    },
    outerBtn:{
        height: 70,
        flexDirection:'row',
    },
    btn:{
        flex:1,      
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    btnTxt:{
        fontFamily:'Poppins-Bold',
        color:'#fff',
        fontSize:14
    },
    filterArea:{
        padding:10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        
    },
    filterAreaText:{
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        color: "#000"
    },
    filterClearText:{
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        color: "#AB0000"
    },
    filterOptionsMain:{
        margin:10,
       
        backgroundColor: "#fff",
       
        elevation: 5,
        borderRadius: 5,
    },
    filterOptions:{
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    filterOptionsText:{
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "#000"
    },
    dropdownIcon:{
        fontSize: 24,
    },
    filterOptionsTextOptions:{
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "#000",
        marginTop: 10,  
    },
    filterOptionsSection1:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width:Dimensions.get('window').width/2-30,
        
        
        
    },
    filterOptionsSectionBoth:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    rangeText:{
        fontFamily: "Poppins-Regular",
        color:'#A20101',
        fontSize:14
    }
    

});
