import { Dimensions, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

export default StyleSheet.create({

    filterBar: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    filterTextBox: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    CategoryText1: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#620000',
        textTransform: 'uppercase'
    },
    CategoryText2: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#620000',
        textTransform: 'uppercase'
    },
    textInput:{
        color:'#000',
        fontFamily:'Poppins-Regular',
        fontSize:12,
        width:'100%',
        paddingVertical: 5
    },
    textInputEdit:{
        color:'#000',
        fontFamily:'Poppins-Regular',
        fontSize:12,
        width:'90%',
        paddingVertical: 5
    },
    textInputOuter:{
        flex:1,
       
        borderBottomWidth:1,
        borderBottomColor:'#CCCCCC',
        marginBottom:10
    },
    btnOuter:{
        backgroundColor:'#AB0000',
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
    passChange:{
      
        paddingTop:20,
        paddingBottom:20,
        marginTop:40,
        flex:1
    },
    passChangeText:{
        color:'#620000',
        alignSelf:'center',
        fontFamily:'Poppins-Bold',
    },
    inputIcon:{
        fontSize: 20,
        color: '#AB0000',
       // lineHeight: 0,
        marginRight: Platform.OS=="android"?0:5,
        paddingVertical: 5
    },

});
