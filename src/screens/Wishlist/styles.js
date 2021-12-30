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
        width:Dimensions.get('window').width/3,
        height:Dimensions.get('window').width/3
    },
    outerBtn:{
        
        flex:1,
        flexDirection:'row'
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
    leftBox:{
        marginTop: 10,
        flex:1
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
    }

});
