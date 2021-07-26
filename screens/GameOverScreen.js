import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Colors from '../constants/colors';
import MyButton from '../components/MyButton';

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
const GameOverScreen = props =>{
    return(
        <View style={styles.screen}>
            <TitleText>Game Over</TitleText>
            <View style={styles.imageContainer}>
            <Image 
                fadeDuration={1000}
                source={require('..//assets/success.png')} 
                //source={{uri:'https://media.istockphoto.com/photos/mount-ama-dablam-within-clouds-picture-id938914580?k=6&m=938914580&s=612x612&w=0&h=-tQlNL-xuFYSRHAbQ12ms74LG7vjlLfvNwR0AjUPh-o='}}
                style={styles.image} 
                resizeMode='cover'
            />
            </View>
            <BodyText style={styles.resultText}>I needed <Text style={styles.highlight}>{props.roundsNumber}</Text> tries to guess <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
            <MyButton onPress={props.onRestart}>Start A New Game</MyButton>

        </View>
    )

}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    imageContainer:{
        width:300,
        height:300,
        borderRadius:150,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical:30,

    },
    image:{
        width:'100%',
        height:'100%',
    },
    highlight:{
        color:Colors.primary,
        fontFamily:'open-sans-bold',
    },
    resultText:{
        textAlign:'center',
        fontSize:20,
        marginBottom:20,
    }


})

export default GameOverScreen