import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    headerMain: {
        height: 140,
        // alignContent: "space-around"
    },
    headerall: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    subheader: {
        justifyContent: "flex-start",
        flexDirection: 'row',
        alignItems: 'center',
    },
    subheader2: {
        justifyContent: "flex-end",
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBoxOuter: {

        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',

    },
    searchBoxIcon: {
        justifyContent: "flex-start",
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBoxAudio:{
        backgroundColor:"#AB0000",
        height: '100%',
        paddingLeft: 15,
        paddingRight: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIconMic:{
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 24,
        color: "#fff",
        paddingRight: 10,
    },
    menuIconSearch: {
        fontSize: 24,
        paddingLeft: 5,
    },
    headerBox: {
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    menuIcon: {
        fontSize: 24
    },
    menuIcon2: {
        fontSize: 24,
        paddingRight: 10,
    },
    logo: {

    },
    userLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 5
    },
    box1: {
        flex: 1
    },
    box2: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box3: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    headingSection:{
        justifyContent:'flex-start',
        marginLeft: 10,
        flexDirection:'row',
        alignItems: 'center',
        marginTop: 20,
    },
    menuText:{
        fontFamily:'Poppins-Bold',
        fontSize: 20,
        color: '#AB0000'
    },
    rewardImage:{
        width: 40,
        height: 40,
    },
    rewardImagSection:{
        flexDirection:'row',
        justifyContent: 'center',
    },
    rewardText:{
        fontFamily:'Poppins-Regular',
        fontSize: 16,
        color: '#000',
    },
    rewardText1:{
        fontFamily:'Poppins-Bold',
        fontSize: 17,
        color: '#AB0000',
    },
    rewardText2:{
        fontFamily:'Poppins-Bold',
        fontSize: 17,
        color: '#228B22',
    },
    rewardSection:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        flex: 1,
        padding:15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    rewardFullSection:{
        margin:10,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        flex: 1,
        elevation: 5,
        backgroundColor: '#fff'
    },
    rewardSectionText:{
        width: '80%',
    },
    rewardBorder:{
        borderWidth: 1,
        borderColor: "#000",
    },


});
