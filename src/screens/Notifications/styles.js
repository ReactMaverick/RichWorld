import { Dimensions, StyleSheet } from 'react-native';
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
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 3,
        // elevation: 5,   
    },
    notificationOuter:{
      marginLeft:10,
      marginRight:10,
      marginTop:10,
        padding:5,
        backgroundColor:'#fff',
        borderRadius:7
    },
    orderTitle:{
        fontFamily:'Poppins-Bold',
        fontSize:13,
        color:BKColor.btnBackgroundColor1
    },
    orderDescription:{
        fontFamily:'Poppins-Regular',
        fontSize:13,
        color:'#818181'
    },
    orderDate:{
        fontFamily:'Poppins-Regular',
        fontSize:13,
        textAlign:'right'
    }

});
