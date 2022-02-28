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

    CategoryText2: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#620000',
        textTransform: 'uppercase'
    },


    productImage: {
        width: Dimensions.get('window').width-40 ,
        height: 250,
        borderRadius: 5,
        
    },
    productTitle: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        marginLeft: 5,
        marginTop: 5
    },
    nextPrevOuter:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15
    },
    nextText:{
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#818181',
    },
    nexticon:{
        fontSize: 20,
        color: '#818181',
        marginTop:-2
    },
    card:{ flex: 1, backgroundColor:'#fff',padding:10,margin:10, borderRadius:5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,   },
    outerBox:{
        
        marginLeft:10,
        marginRight:10,
        marginBottom:20
    },
    text1:{
        fontSize: 13,
        fontFamily: 'Poppins-Bold',
        color: '#000',
    },
    text2:{
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color:'#818181'
    },
    textInput:{
        color:'#000',
        fontFamily:'Poppins-Regular',
        fontSize:12,
        width:'100%'
      
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
    titleIcon: {
        fontSize: 24,
        color: '#620000',
        marginLeft:5
    },
    shareIcon: {
        color: '#620000',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginRight: 10
    },
});
