import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  outerMenu:{
    flex:1,
    paddingTop:60,
    paddingLeft:10
  },
  menuItem:{
    flexDirection:'row',
    width:'100%',
    paddingTop:5,
    paddingBottom:5,    
    alignItems:'center'

    
  },
  menuIcon:{
    fontSize:25,
    marginRight:10,
    marginTop:-7,
    color:'#620000'
  },
  menuText:{
    fontFamily:'Poppins-Medium',
    color:'#620000',
    fontSize:16
  }

});
