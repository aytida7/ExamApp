import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import FeedbackItem from '../Components/FeedbackItem';

const Feedback = ({route, navigation}) => {
  // console.log("this is asdfasd",route.params?.questions);
  const [fData, setFdata] = useState(route.params?.questions);
  return (
    <View style={{flex:1}}>
      <View>
        <Text
          style={{
            fontSize: 25,
            alignSelf: 'center',
            color: 'blue',
            fontWeight: 700,
          }}>
          Feedback
        </Text>
        <TouchableOpacity
          style={{
            borderColor: 'black',
            borderWidth: 3,
            marginRight: 20,
            padding: 3,
            borderRadius: 10,
            alignSelf: 'flex-end',
          }}
          onPress={() => {
            navigation.navigate('Home');
            setFdata(null);
          }}>
          <Text style={{fontSize: 20, fontWeight: 500, color: 'black'}}>
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={fData}
        renderItem={({item, index}) => {
          return <FeedbackItem data={item} />;
        }}
      />

    
    </View>
  );
};

export default Feedback;
