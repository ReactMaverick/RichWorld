import { Dimensions, StyleSheet } from 'react-native';

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
        marginTop:-60,
        alignSelf:'center' 
    },
    userName:{
        alignSelf:'center' ,
        color:'#620000',
        fontFamily:'Poppins-Bold',
        fontSize:14
    },
    menuItem:{
        flexDirection:'row',
        marginLeft:10,
        marginBottom:8,
        alignItems:'center'
    },
    menuIcon:{
        fontSize:20,
        marginRight:10,
        color:'#AB0000',
        width:20
    },
    menuText:{
        fontFamily:'Poppins-Regular',
        color:'#818181',
        fontSize:14
    },
    camera:{
        fontSize:30,
        alignSelf:'flex-end',
        color:'#AB0000',
        marginRight:10
    },
    outerBtn:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        padding:10,
        borderRadius:10,        
        backgroundColor:'#AB0000',
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        fontFamily:'Roboto-Regular',
        fontWeight:'700',
        fontSize:17,
        color:'#fff'
    }

});
