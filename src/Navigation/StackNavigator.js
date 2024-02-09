import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import QuizScreen from '../Screens/QuizScreen';
import Feedback from '../Screens/Feedback';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="Feedback" component={Feedback} />
    </Stack.Navigator>
  );
}

export default StackNavigator