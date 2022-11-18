import { Dimensions, StyleSheet } from 'react-native';
import { BKColor } from '../../common/BKColor';
export default StyleSheet.create({
    backGround:{
        flex:1,
        
        backgroundColor:'#fff',
      
        borderRadius:5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,  
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        
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
        color:'#AB0000',
        fontSize:22,

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
        width:'85%'
      
    },
    textInputOuter:{
       
        backgroundColor:'#DBE2ED',
        marginBottom:30,
        borderRadius:7,
        padding:5,
        flexDirection:'row',
        alignItems:'center',
    },
    textInputOuterIos:{
       
        backgroundColor:'#DBE2ED',
        marginBottom:30,
        borderRadius:7,
        padding:5,
        flexDirection:'row',
        alignItems:'center',
        height:40,
    },
    btnOuter:{
        backgroundColor:'#AB0000',       
        margin:10,
        marginBottom:30,
       
        height:Platform.OS=="android"?60:50,
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
        color: '#AB0000',
       // lineHeight: 0,
        marginRight: Platform.OS=="android"?0:5,
    },
    btnIcon:{
        color:'#000',
        fontSize:20,
        lineHeight: 0,
    },
    socialLoginOuter:
    {
        flexDirection:'row', 
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    },
    socialLoginText:{
        fontFamily:'Poppins-Medium',
        color:BKColor.btnBackgroundColor1,
        fontSize:14,
    },
    errorMessage:{
        fontSize:14,
        fontFamily:'Poppins-Bold',
        color:'red',
        textAlign:'center',
        margin:10
    }

});
