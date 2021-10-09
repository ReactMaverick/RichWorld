import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  
    filterBar:{
        backgroundColor:'#fff',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between',
        alignItems:'center'
    },
   
    CategoryText2: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#620000',
        textTransform:'uppercase'
    },
    card:{
        flex:1,
        backgroundColor:'#fff',
        margin:10,
        padding:10,
        borderRadius:5,
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 3,
        // elevation: 5,   
    },
    outerBox:{
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#fff',
       
        flex:1,
        
    },
    userImage:{
        margin:10,
        height:Dimensions.get('window').width/3,
        height:Dimensions.get('window').width/3+20
    },
    outerBtn:{
        
        flex:1,
        flexDirection:'row'
    },
    btn:{
             
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    btnTxt:{
        fontFamily:'Poppins-Bold',
        color:'#fff',
        fontSize:14
    },
    leftBox:{
        marginTop:10
    },
    leftText1:{
        fontFamily:'Poppins-Bold',
        color:'#620000',
        fontSize:14
    },
    leftText2:{
        fontFamily:'Poppins-Regular',
        color:'#818181',
        fontSize:15
    },
    cancelPopup:{
        width:Dimensions.get('window').width-40,
        alignSelf:'center',
        backgroundColor:'#fff',
        padding:10,
        borderRadius:3
    },
    closeBtn:{
        fontSize:20,
        color:'#818181',
    },
    headerPopup:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#CCCCCC',
        paddingBottom:5
    },
    itemOuter:{
        flexDirection:'row',
        marginTop:5,
        alignItems:'center'
    },
    radioText:{
        marginLeft:5,
        fontFamily:'Poppins-Regular',
        marginTop:3
    },
    textInputOuter:{
        
       
        borderWidth:1,
        borderColor:'#CCCCCC',
        marginBottom:10
    },
    btnOuter:{
        backgroundColor:'#620000',
       
        marginTop:10,
        padding:10,
        justifyContent:'center',
        alignItems:'center'

    },
    btnMessage:{
        fontFamily:'Poppins-Bold',
        fontSize:15,
        textTransform:'uppercase',
        color:'#fff'
    },
    btnOuterImage:{
      
       borderColor:'#818181',
       borderWidth:1,
       padding:10,
       marginTop:10,
      
       justifyContent:'center',
       alignItems:'center'
    },
    btnImageText:{
        fontFamily:'Poppins-Bold',
        fontSize:15,
        textTransform:'uppercase',
        color:'#818181'
    },
    
    productBox :{
        width:Dimensions.get('window').width/2-50,
        height:Dimensions.get('window').width/2-50,
        backgroundColor:'#fff',
        margin:10,
        borderRadius:5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,    
    
    },
  
  
});
