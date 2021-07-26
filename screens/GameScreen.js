import React, { useState, useRef, useEffect } from 'react';
import { View, Text , TextInput, StyleSheet, Button, Alert, ScrollView, FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles';
import MyButton from '../components/MyButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min,max,exclude) => {
    min = Math.ceil(min)
    max=Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max-min)) +min
    if (rndNum==exclude){
        return generateRandomBetween(min,max,exclude);
    }
    else{
        return rndNum
    }
}

const renderListItem = (listLength, itemData) => (
            <View style={styles.listItem}>
                <BodyText>#{listLength-itemData.index}</BodyText>
        	    <BodyText>{itemData.item}</BodyText>
            </View>
            )

const GameScreen = props =>{
    const initialGuess = generateRandomBetween(1,100,props.userChoice)
    const [currentGuess,setCurrentGuess] = useState(initialGuess)
    
    const [rounds,setRounds]=useState(0)
    //to output the guesses as list
    const [pastGuesses,setPastGuesses]=useState([initialGuess.toString()]);
    const currentLow = useRef(1)    
    const currentHigh = useRef(100)
    

    const {userChoice, onGameOver} = props;
    useEffect(()=>{
        if (currentGuess === userChoice){
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver])

    //will be executed when lower or greater is pressed
    //for validation if u r giving the right direction
    //direction will be lower or greater
    const nextGuessHandler = direction =>{
        if((direction==='lower'&& currentGuess<props.userChoice)||(direction==="greater" && currentGuess>props.userChoice)){
            //console.log('cheating')
            Alert.alert('Don\'t Mess with me',[{text:'sorry', style:'cancel'}])
            return
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess
        }
        else{
            currentLow.current=currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(currRound=>currRound+1) //counting number of times it takes to guess the number
        //storing all the past guesses
        setPastGuesses(currPastGuesses=>[nextNumber.toString(),...currPastGuesses])


    }
    
    
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponents Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
                <Card style={styles.buttonContainer}>
                    <MyButton onPress={nextGuessHandler.bind(this,'lower')}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MyButton>
                    <MyButton onPress={nextGuessHandler.bind(this,'greater')}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MyButton>
                </Card>
                <View style={styles.listContainer}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess,index)=>renderListItem(guess,pastGuesses.length - index))}
                    </ScrollView> */}
                    <FlatList 
                        keyExtractor={item=>item}
                        data={pastGuesses} 
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />

                </View>
        </View>
    )


}
const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop: 20,
        width: 400,
        maxWidth:'90%',

    },
    listItem:{
        borderColor:'#ccc',
        borderWidth:1,
        padding:15,
        marginVertical:10,
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'space-between',
        width:'100%'
    },
    listContainer:{
        flex:1,
        width:'60%',
    },
    list:{
        flexGrow:1,
        //alignItems:'center',
        justifyContent:'flex-end',
    }

})

export default GameScreen