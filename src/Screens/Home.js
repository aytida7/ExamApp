import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import QuestionSet from '../Data/QuestionSet'

const Home = ({navigation}) => {

  // here getting random questions from json data sourece i.e. QuestionSet
  const getRandomElements = (array, numElements) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
  };
  //passing question data to exam screen while navigating
const onSubmit = async () => {
  const randomQuestions = getRandomElements(QuestionSet, 5);
  navigation.navigate('QuizScreen', { randomQuestions: randomQuestions });
};

  return (
    <View style={{backgroundColor:'black',width:'100%',height:'100%'}}>
      <Text style={{color:'white',fontSize:50,alignSelf:'center',margin:30,fontWeight:700}}>Welcome!</Text>
      <Image source={require('../Assets/Takshlogo.jpeg')} style={{width:'60%',height:'30%',borderRadius:50,alignSelf:'center'}}/>
      <TouchableOpacity onPress={onSubmit} style={{borderColor:'white',borderWidth:3,alignSelf:'center',margin:50,borderRadius:10,backgroundColor:'purple',padding:10}}>
        <Text style={{color:'white',fontSize:25}}>Start MCQ Exam</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home