import { Dimensions, StyleSheet } from 'react-native';

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
