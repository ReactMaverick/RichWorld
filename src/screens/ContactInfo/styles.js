import { Dimensions, StyleSheet, Platform } from 'react-native';
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
    itemOuter:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20
    },
    itemLeft:{
        width:'10%'
    },
    itemRight:{
        flex:1
    },
    itemIcon:{
        fontSize:24,
        color:'#620000'
    },
    text1:{
        color:'#620000',
        fontFamily:'Poppins-Bold',
        fontSize:14
    },
    text2:{
        color:'#818181',
        fontFamily:'Poppins-Regular',
        fontSize:14
    },
    text3:{
        color:'#818181',
        fontFamily:'Poppins-Bold',
        fontSize:14
    },
    formTitle:{
        color:'#620000',
        fontFamily:'Poppins-Bold',
        fontSize:16,
        textAlign:'center',
        marginBottom:20
    },
    textInput:{
        color:'#000',
        fontFamily:'Poppins-Regular',
        fontSize:12,
        width:'100%',
        ...Platform.select({
            ios: {
                paddingVertical: 8
            },
            android: {
            },
            default: {
            }
        })
    },
    textInputOuter:{
        flex:1,
       
        borderBottomWidth:1,
        borderBottomColor:'#CCCCCC',
        marginBottom:10
    },
    btnOuter:{
        backgroundColor:'#620000',
        flex:1,
        marginTop:10,
        padding:10,
        justifyContent:'center',
        alignItems:'center'

    },
    btnMessage:{
        fontFamily:'Poppins-Bold',
        fontSize:15,
        textTransform:'uppercase',
        color:'#fff'
    }


});
