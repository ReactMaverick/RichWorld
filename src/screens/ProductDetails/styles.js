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


});
