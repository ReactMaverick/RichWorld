import { Dimensions, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { BKColor } from '../../common/BKColor';

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
        color: BKColor.btnBackgroundColor1,
        textTransform:'uppercase'
    },
    card:{
        flex:1,
        backgroundColor:'#fff',
        margin:10,
        padding:10,
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'space-between',        
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,   
    },
    cartText:{
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: BKColor.btnBackgroundColor1,
    },
    text1:{
        color:'#868686',
        fontFamily:'Poppins-Regular',
        fontSize:16
    }
    
 


});
