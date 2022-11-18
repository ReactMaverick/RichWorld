import { Dimensions, StyleSheet } from 'react-native';
import { BKColor } from '../../common/BKColor';
export default StyleSheet.create({
    headerSection:{
        height:150,
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end',
      
    },
    userImage:{
        height:120,
        width:120,
        borderRadius:60,
        borderWidth:3,
        borderColor:'#fff',
        backgroundColor: BKColor.textColor1,
        marginTop:-60,
        alignSelf:'center' 
    },
    userName:{
        alignSelf:'center' ,
        color:BKColor.btnBackgroundColor1,
        fontFamily:'Poppins-Bold',
        fontSize:14
    },
    menuItem:{
        flexDirection:'row',
        // marginLeft:10,
        marginBottom:20,
        alignItems:'center'
    },
    menuIcon:{
        fontSize:20,
        marginRight:10,
        color:BKColor.btnBackgroundColor1,
        width:20
    },
    menuText:{
        fontFamily: 'Poppins-Regular',
        color: BKColor.btnBackgroundColor1,
        fontSize: 18,
        fontWeight: '700'
    },
    camera:{
        fontSize:30,
        alignSelf:'flex-end',
        color:BKColor.btnBackgroundColor1,
        marginRight:10
    },
    outerBtn:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        padding:10,
        borderRadius:10,        
        backgroundColor:BKColor.btnBackgroundColor1,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        fontFamily:'Poppins-Regular',
        fontWeight:'700',
        fontSize:17,
        color:'#fff'
    }

});
