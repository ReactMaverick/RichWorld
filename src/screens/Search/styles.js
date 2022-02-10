import { Dimensions, StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({


    searchMainSection:{
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    searchSection: {
        borderWidth: 1,
        borderColor: "#A9A9A9",
        borderRadius: 3,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 5,
        // paddingTop: Platform.OS=="android"?3:10,
        paddingBottom: Platform.OS=="android"?3:10,
        flexDirection: 'row',
        justifyContent:'flex-start',
    },
    searchSectionText: {
        flexDirection: 'row',
        fontFamily: "Poppins-bold",
        fontSize: 14,
        color: "#000",
        paddingLeft: 5,
        width:'88%',
    },
    searchIcon: {
        fontSize: 20,
        color: "#989898",
    },
    searchBoxAudio:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        // width:'50%',
    },
    menuIconMic:{
        alignItems: 'center',
        fontSize: 20,
        color: "#989898",
        paddingRight: 10,
    },
    searchResult:{
        margin: 10,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
        paddingBottom: 10,
    },
    searchImage:{
        width: 50,
        height: 50,
    },
    searchResultText:{
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        color: "#000",
        marginRight: 10,
        marginLeft: 10,
    },
    searchResultTextCat:{
        fontFamily: "Poppins-Bold",
        fontSize: 12,
        color: "#AB0000",
        marginRight: 10,
        marginLeft: 10,
    },
    searchSeparator:{
        borderWidth: 1,
        borderColor: "#000",
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
