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
      
        borderRadius:5,
        
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,   
    },
    headerSection:{
        padding:10,
        borderBottomColor:'#CCCCCC',
        borderBottomWidth:1,
        
    },
    headerTitle:{
        fontFamily:'Poppins-Bold',
        fontSize:14,
        color:'#000'
    },
    text1:{
        fontFamily:'Poppins-Regular',
        fontSize:14,
        color:'#000'
    },
    text2:{
        fontFamily:'Poppins-Regular',
        fontSize:14,
        color:'#818181'
    },
    editText:{
        fontFamily:'Poppins-Bold',
        fontSize:14,
        color:'#620000',
        alignSelf:'center',
        padding:10
    },
    downicon:{
        fontSize:20,

    }
 


});
