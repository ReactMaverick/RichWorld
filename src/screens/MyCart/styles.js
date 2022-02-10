import { Dimensions, StyleSheet } from 'react-native';

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
    card: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 5,
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 3,
        // elevation: 5,   
    },
    textInput: {
        width: '60%',
        borderColor: '#eee',
        borderWidth: 1,

    },
    outerBox: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',

        flex: 1,

    },
    outerBoxAddress: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 15,
        paddingBottom: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    outerBoxAddressInner: {
        flexDirection: 'row',
        width: '70%',

    },
    userImage: {
        flex: 1,
        margin: 10,
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').width / 3 + 50
    },
    outerBtn: {

        flex: 1,
        flexDirection: 'row'
    },
    btn: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    changeAddress: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        fontFamily: 'Poppins-Bold',
        color: '#fff',
        fontSize: 14
    },
    leftBox: {
        marginTop: 10,
        flex: 1
    },
    leftText1: {
        fontFamily: 'Poppins-Bold',
        color: '#620000',
        fontSize: 14
    },
    leftText2: {
        fontFamily: 'Poppins-Regular',
        color: '#818181',
        fontSize: 15
    },
    quantityOuter: {
        flexDirection: 'row',
        marginTop: 10
    },
    quantityInner: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityInnerBtn: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A20101'
    },
    priceList: {

    },
    priceTitle: {
        fontFamily: 'Poppins-Regular',
        color: '#818181',
        fontSize: 15
    },
    outerBoxPrice: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-around',
    },
    couponBoxPrice: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#D4EDDA',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    priceLine: {
        borderWidth: 1,
        borderColor: "#eee",
        marginTop: 20,
    },
    priceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5
    },
    priceItemText: {
        fontFamily: 'Poppins-Regular',
        color: '#818181',
        fontSize: 14
    },
    outerBoxCheckout: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    checkoutbtnTxt: {
        fontFamily: 'Poppins-Bold',
        color: '#fff',
        fontSize: 14,
    },
    checkoutButton: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 50,
        paddingLeft: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addAddress: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#A20101',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceAmount: {
        fontFamily: 'Poppins-Bold',
        color: '#000',
        fontSize: 20,
        paddingLeft: 10,
    },
    changeAddressSection: {
        backgroundColor: "#F8F8F8",
        paddingTop: 10,
        paddingBottom: 10,
    },
    changeAddressHeadingSection: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    changeAddressSectionInner: {
        backgroundColor: "#fff",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    nameTitle: {
        fontFamily: "Poppins-Bold",
        fontSize: 14,
        color: "#000",
    },
    nameSubTitle: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "#000",
    },
    applyCoupon: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteIcon: {
        fontSize: 24,
        alignSelf: 'flex-end',
        margin: 10,
        marginTop: '15%',
        color: '#A20101'
    },
    errorOuter: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    error: {
        fontFamily: 'Poppins-Regular',
        color: 'red',
        fontSize: 14
    },
    
    cancelPopup: {
        width: Dimensions.get('window').width - 40,
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 3
    },
    closeBtn: {
        fontSize: 20,
        color: '#818181',
    },
    headerPopup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingBottom: 5
    },
    itemOuter: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center'
    },
    btnOuter: {
        backgroundColor: '#620000',

        marginTop: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    btnMessage: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        textTransform: 'uppercase',
        color: '#fff'
    },
    textInputModal: {
        color: '#000',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        width: '100%',
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
    textInputOuterModal: {

        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        marginBottom: 10
    },

    errorMessage: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: 'red',
        textAlign: 'center',
        margin: 10
    },
    outerBtn: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#AB0000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '700',
        fontSize: 17,
        color: '#fff'
    }
});
