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

    },
    cancelPopup:{
        width:Dimensions.get('window').width-40,
        alignSelf:'center',
        backgroundColor:'#fff',
        padding:10,
        borderRadius:3
    },
    closeBtn:{
        fontSize:20,
        color:'#818181',
    },
    headerPopup:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#CCCCCC',
        paddingBottom:5
    },
    itemOuter:{
        flexDirection:'row',
        marginTop:5,
        alignItems:'center'
    },
    btnOuter:{
        backgroundColor:'#620000',
       
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
       
        borderBottomWidth:1,
        borderBottomColor:'#CCCCCC',
        marginBottom:10
    },
 
    errorMessage: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: 'red',
        textAlign: 'center',
        margin: 10
    },
    outerBtn:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        padding:10,
        borderRadius:10,        
        backgroundColor:'#AB0000',
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        fontFamily:'Poppins-Regular',
        fontWeight:'700',
        fontSize:17,
        color:'#fff'
    }

});
