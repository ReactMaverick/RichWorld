import { Dimensions, StyleSheet } from 'react-native';
import { BKColor } from '../../common/BKColor';

export default StyleSheet.create({
    outerSection:{
        margin: 15,
        marginTop: 30
    },
    checkoutTextHead:{
        fontFamily: "Poppins-Bold",
        fontSize: 16,
        color: "#AB0000"
    },
    checkoutInner:{
        marginTop:20,
        padding: 20,
        backgroundColor: "#fff",
        elevation: 5,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    bankdetailsOuter:{
        padding: 20,
        backgroundColor: "#fff",
        elevation: 5,
        borderRadius: 5,
        justifyContent: "flex-start",
    },
    viewAllBtn:{
        flexDirection:'row',
        backgroundColor:BKColor.btnBackgroundColor1,
        marginTop: 5,
        padding:10,
        borderRadius:5,
        justifyContent: 'center',
        alignItems:'center'
    },
    viewAllBtnText:{
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
    },
    checkoutTextInner:{
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "#000"
    },
    paymentIcon:{
        fontSize: 20,
        color: "#AB0000",
        marginRight: 15,
    }

});
