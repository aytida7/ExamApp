import { View, Text } from 'react-native'
import React from 'react'

const FeedbackItem = ({data}) => {
    // console.log(data.Options)
  return (
    <View>
        <View style={{backgroundColor:data.marked===data.correct?'green':'red',borderColor:'black' ,padding:10,margin:15,borderRadius:10,elevation: 10}}>
        <Text style={{color:'white',fontSize:20}}>{'QUESTION: '+data.question}</Text>
        <Text style={{color:'white',fontSize:20}}>{'YOUR ANSWER: '+(data.marked==1?data.Options[0]:data.marked==2?data.Options[1]:data.marked==3?data.Options[2]:data.marked==4?data.Options[3]:' ')}</Text>
        <Text style={{color:'white',fontSize:20}}>{'CORRECT ANSWER: '+(data.correct==1?data.Options[0]:data.correct==2?data.Options[1]:data.correct==3?data.Options[2]:data.Options[3])}</Text>
        </View> 
    </View>
  )
}

export default FeedbackItem