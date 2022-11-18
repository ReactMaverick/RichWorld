import { Dimensions, StyleSheet } from 'react-native';
import { BKColor } from '../../common/BKColor';

export default StyleSheet.create({
  outerMenu:{
    flex:1,
    // backgroundColor: 'cyan',
    paddingTop:'50%',
    paddingLeft:'8%'
  },
  menuItem:{
    flexDirection:'row',
    width:'100%',
    paddingTop: 15,   
    alignItems:'center'
  },
  menuIcon:{
    fontSize:25,
    marginRight:10,
    marginTop:-7,
    color:BKColor.btnBackgroundColor1
  },
  menuText:{
    fontFamily:'Poppins-Medium',
    color:BKColor.btnBackgroundColor1,
    fontSize:16
  }

});
