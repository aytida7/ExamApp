import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  Modal,
  Alert,
  ToastAndroid
} from 'react-native';
import React, {useRef, useState,useEffect} from 'react';
import Question from '../Components/Question';
const {height, width} = Dimensions.get('window');
const QuizScreen = ({navigation, route }) => {
  
  const [currentIndex, setCurrentIndex] = useState(1);
  const [questions, setQuestions] = useState(route.params.randomQuestions);
  const listRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState(100);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => Math.max(prevTimer - 1, 0));
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

// automatic submission when time ends
  useEffect(() => {
    if (timer === 0) {
      handleSubmissionfortime();
    }
  }, [timer]);

  //for submitting answers within time
  const handleSubmission = () => {
    if (questions[currentIndex - 1].marked !== -1) {
      setModalVisible(true);
    }else{
      ToastAndroid.showWithGravityAndOffset(
        'Please select answer!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };
  //automatic submission function
  const handleSubmissionfortime = () => {
      setModalVisible(true);
  };

  // handling option selection
  const OnSelectOption = (index, x) => {
    const tempData = questions;
    tempData.map((item, ind) => {
      if (index == ind) {
        if (item.marked !== -1) {
          item.marked = -1;
        } else {
          item.marked = x;
        }
      }
    });
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    });
    setQuestions(temp);
  };
  // calculating exam score
  const getExamScore = () => {
    let marks = 0;
    questions?.map(item => {
      if (item.marked === item.correct) {
        marks = marks + 5;
      }
    });
    return marks;
  };
  // reseting fucntion for reset button and reinitializing screen
  const reset = () => {
    const tempData = questions;
    tempData?.map((item, ind) => {
      item.marked = -1;
    });
    let temp = [];
    tempData?.map(item => {
      temp.push(item);
    });
    setQuestions(temp);
  };

  useEffect(() => {
  reset();
  }, [])
  
  
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            marginLeft: 20,
            color: 'blue',
            borderColor:'black',
            borderWidth:2,
            padding:5,
            borderRadius:5
          }}>
          Exam Questions :{' ' + currentIndex + '/' + route.params.randomQuestions?.length}
        </Text>
        <Text
          style={{
            marginRight: 20,
            fontSize: 20,
            fontWeight: '600',
            color: 'orange',
            borderColor:'black',
            borderWidth:2,
            padding:5,
            borderRadius:5
          }}
          onPress={() => {
            reset();
            listRef.current.scrollToIndex({animated: true, index: 0});
            ToastAndroid.showWithGravityAndOffset(
              'All Answers got reset!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }}>
          Reset
        </Text>
      </View>
      <View style={{marginTop: 30}}>
        <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x / width + 1;
            setCurrentIndex(x.toFixed(0));
          }}
          data={questions}
          renderItem={({item, index}) => {
            return (
              <Question
                data={item}
                selectedOption={x => {
                  OnSelectOption(index, x);
                }}
              />
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          bottom: 50,
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: currentIndex > 1 ? 'blue' : 'gray',
            height: 50,
            width: 70,
            borderRadius: 10,
            marginLeft: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            console.log(parseInt(currentIndex) - 1);
            if (currentIndex > 1) {
              listRef.current.scrollToIndex({
                animated: true,
                index: parseInt(currentIndex) - 2,
              });
            }
          }}>
          <Text style={{color: '#fff',fontSize:15}}>Previous</Text>
        </TouchableOpacity>
        {currentIndex == 5 ? (
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              height: 50,
              width: 100,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleSubmission}>
            <Text style={{color: '#fff'}}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              height: 50,
              width: 70,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              console.log(currentIndex);
              if (questions[currentIndex - 1].marked !== -1) {
                if (currentIndex < questions.length) {
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: currentIndex,
                  });
                }
              }else{
                ToastAndroid.showWithGravityAndOffset(
                  'Please select Answer!',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              }
            }}>
            <Text style={{color: '#fff',fontSize:15}}>Next</Text>
          </TouchableOpacity>
        )}
        <Text style={{ marginRight: 10, fontSize: 15, fontWeight: '600', color: 'orange', borderColor: 'black', borderWidth: 2, padding: 5, borderRadius: 5 }}>
          Time Left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
        </Text>
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '800',
                alignSelf: 'center',
                marginTop: 20,
              }}>
              Exam Score
            </Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: '800',
                alignSelf: 'center',
                marginTop: 20,
                color: 'green',
              }}>
              {getExamScore()}
            </Text>
            <View style={{flexDirection:'row',alignSelf:'center'}}>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                height: 55,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 20,
                marginRight:20,
                backgroundColor:'red',
                justifyContent:'center'
                
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('Home')
              }}>
                <Text style={{color:'white',fontWeight:'600'}}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                height: 55,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 20,
                backgroundColor:'orange',
                justifyContent:'center'
              }}
              onPress={() => {
                navigation.navigate('Feedback',{questions})
                
              }}>
                <Text style={{color:'white',fontWeight:'600'}}>Feedback</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuizScreen;