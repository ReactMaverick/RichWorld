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



    productBox: {
        width: Dimensions.get('window').width / 2 - 15,
       // height: Dimensions.get('window').width / 2 ,
        backgroundColor: '#fff',
       marginBottom:10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,

    },
    productImage: {
        width: Dimensions.get('window').width / 2 - 15,
        height: Dimensions.get('window').width / 2 -30 ,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    productTitle: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        
       
    },
    loadMorebtn: {
        backgroundColor: '#AB0000',
        padding: 5,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',


    },
    loadMoreTxt: {
        fontFamily: 'Poppins-Bold',
        color: '#fff',
        textTransform: 'uppercase'
    }

});
