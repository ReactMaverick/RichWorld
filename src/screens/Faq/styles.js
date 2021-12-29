import { Dimensions, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

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
        
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,   
    },


    outerBox:{
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#fff',
        margin:10,
        padding:10,
        borderRadius:10
    },
    boxheader:{
        flexDirection:'row',
        justifyContent:'space-between',
      
    },
    boxheaderTxt:{
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color:'#620000'
    },
    boxIcon:{
        fontSize:16,
        color:'#620000'
    },
    BoxDescription:{
        fontFamily: 'Poppins-Regular',
        fontSize: 12, 
        color:'#898989'
    },
 


});
