import { Dimensions, StyleSheet } from 'react-native';
import { BKColor } from '../../common/BKColor';

export default StyleSheet.create({
    title: {
        color: BKColor.btnBackgroundColor1,
        fontSize: 15,
        fontFamily: 'Poppins-Medium'
    },
   
    enterBtn:{
        backgroundColor:BKColor.btnBackgroundColor1,
        justifyContent:'center',
        alignItems:'center',
        height:60,
        margin:20,
        borderRadius:5
    },
    btnTxt:{
        color: '#fff',
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
    },
    thankyouText:{
        fontFamily:'Poppins-Regular',
        fontSize:30,
        color:BKColor.btnBackgroundColor1,
        marginTop:30
    },
    thankyouText1:{
        fontFamily:'Poppins-Light',
        fontSize:16,
        color:BKColor.btnBackgroundColor1,
    },
    thankyouText2:{
        fontFamily:'Poppins-Regular',
        fontSize:16,
        color:BKColor.btnBackgroundColor1,
    }

});
