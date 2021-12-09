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
    textInput:{
       width:'60%',
        borderColor:'#eee',
        borderWidth:1,
      
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
    userImage:{
        flex:1,
        margin:10,
        width:Dimensions.get('window').width/2,
        height:Dimensions.get('window').width/3+50
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
        flex:1
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
    priceList:{
        
    },
    priceTitle:{
        fontFamily: 'Poppins-Regular',
        color: '#818181',
        fontSize: 15
    },
    outerBoxPrice:{
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
    priceLine:{
        borderWidth: 1,
        borderColor: "#eee",
        marginTop: 20,
    },
    priceItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5,
        marginBottom:5
    },
    priceItemText:{
        fontFamily: 'Poppins-Regular',
        color: '#818181',
        fontSize: 14 
    },
    outerBoxCheckout:{
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
    checkoutbtnTxt:{
        fontFamily: 'Poppins-Bold',
        color: '#fff',
        fontSize: 14
    },
    checkoutButton:{
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 50,
        paddingLeft: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceAmount:{
        fontFamily: 'Poppins-Bold',
        color: '#000',
        fontSize: 20,
        paddingLeft: 10,
    },
    changeAddressSection:{
        backgroundColor:"#F8F8F8",
        paddingTop: 10,
        paddingBottom: 10,
    },
    changeAddressHeadingSection:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    changeAddressSectionInner:{
        backgroundColor: "#fff",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    nameTitle:{
        fontFamily:"Poppins-Bold",
        fontSize: 14,
        color: "#000",
    },
    nameSubTitle:{
        fontFamily:"Poppins-Regular",
        fontSize: 14,
        color: "#000",
    },
    applyCoupon:{
       padding:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteIcon:{
        fontSize:24,
        alignSelf:'flex-end',
       margin:10,
       marginTop:'15%',
       color:'#A20101'
    }


});
