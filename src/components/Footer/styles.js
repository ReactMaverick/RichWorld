import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    footerbox: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:20,
        paddingRight:20,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,        
        backgroundColor:'#fff',
        flexDirection:'row'
    },
    menuIcon:{
        fontSize:24
    },
    logo:{
        
    },
    userLogo:{
        width:50,
        height:50,
        borderRadius:25,
        marginTop:5
    },
    box1:{
        flex:1
    },
    box2:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    box3:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }

});
