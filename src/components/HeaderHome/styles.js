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
        padding: 10,
    },
    searchBoxAudio: {
        backgroundColor: "#AB0000",
        height: '100%',
        paddingLeft: 15,
        paddingRight: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIconMic: {
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
        justifyContent: 'space-between'
    },
    countOuter: {
        
        marginTop:-10,
        marginLeft:-3,
        width: 20,
        height: 20,
        backgroundColor: '#AB0000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1

    },
    countText: {
        fontSize: 10,
        color:'#fff'
    },
    listening:{ 
        backgroundColor: '#fff', 
        height: Dimensions.get('window').height / 4, 
        borderTopEndRadius: 20, 
        borderTopStartRadius: 20,
        justifyContent: 'center',
        alignItems: 'center', 
    }


});
