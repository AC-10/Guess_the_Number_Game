import React from 'react';
import { Text,View,StyleSheet } from 'react-native'; 

//to put the fonts for all the text

const BodyText=props=>{
    return(
        <Text style={{...styles.body,...props.style}}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    body:{
        fontFamily:'open-sans'
    }
})

export default BodyText ;