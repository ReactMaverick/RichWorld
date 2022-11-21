import { Dimensions, StyleSheet } from 'react-native';
import { BKColor } from '../../common/BKColor';
export default StyleSheet.create({
    backGround:{
        flex:1,
        
        backgroundColor:'#fff',
      
        // borderRadius:5,
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 3,
        // elevation: 5,  
        // borderBottomLeftRadius:25,
        // borderBottomRightRadius:25,
        
    },
    footerPart:{
        height:80,
        justifyContent:'center',
        alignItems:'center'
        
    },
    pagenameBackGround:{
        width:Dimensions.get('window').width/2,
        height:Dimensions.get('window').width/2-50,
        alignSelf:'center',
        marginTop:60,
        resizeMode: "stretch" ,
        justifyContent:'center',
        alignItems:'center'             
    },
    loginText:{
        fontFamily:'Poppins-Medium',
        color:BKColor.btnBackgroundColor1,
        fontSize:22,

    },
    commentText: {
        fontFamily:'Poppins-Medium',
        color:BKColor.btnBackgroundColor1,
        fontSize:14,
        textAlign: 'center'
    },
    footerText:{
        fontFamily:'Poppins-Bold',
        color:BKColor.btnBackgroundColor1,
        fontSize:14,
        textTransform:'uppercase',
    },
    textInput:{
        color:'#000',
        fontFamily:'Poppins-Regular',
        fontSize:12,
        width:'100%'
      
    },
    textInputOuter:{
       
        backgroundColor:'#DBE2ED',
        marginBottom:30,
        borderRadius:7,
        padding:5,
        flexDirection:'row',
        alignItems:'center'
    },
    btnOuter:{
        backgroundColor:BKColor.btnBackgroundColor1,       
        margin:10,
        marginBottom:30,
       
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        height:60,
        flexDirection:'row'

    },
    btnMessage:{
        fontFamily:'Poppins-Bold',
        fontSize:15,
        textTransform:'uppercase',
        color:'#fff'
    },
    inputicon:{
        fontSize: 20,
        color: BKColor.btnBackgroundColor1,
       // lineHeight: 0,
        marginRight: Platform.OS=="android"?0:5,
    },
    btnIcon:{
        color:'#fff',
        fontSize:20,
        marginTop:-5,
        marginRight:5
    },
    otpBoxOuter:{
        width:Dimensions.get('window').width-150,
        alignSelf:'center',
       },
       otpBoxStyle:{ 
           height: 55, 
           width: '20%', 
        //    borderWidth: 1,  
           borderRadius: 5,
           marginTop:30,
           marginBottom:60,
           alignSelf:'center' 
       },
      
    signupText1:{
        color:BKColor.btnBackgroundColor1,
        fontFamily:'Poppins-Regular',
        fontSize:16,
        marginBottom:5,
        alignSelf:'center'
    },
    signupText2:{
        color:'#000',
        fontFamily:'Poppins-Bold',
        fontSize:16,
        alignSelf:'center'
    },
    resendButton:{
      
        alignSelf:'flex-end',
        marginRight:10
    },
    resendButtonText:{
        color:BKColor.btnBackgroundColor1,
        fontFamily:'Poppins-Medium',
        fontSize:14,
        alignSelf:'center',
        textDecorationLine:"underline"
    },
    errorMessage:{
        fontSize:14,
        fontFamily:'Poppins-Bold',
        color:'red',
        textAlign:'center',
        margin:10
    },
    backIconOuter: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        margin:10,
    },
    backIcon:{
        fontSize:25,
        color: BKColor.btnBackgroundColor1
    }

});
