import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import FSignUp from './src/Screen/FSignUp';
import LogInSignUpOption from './src/Screen/LogInSignUpOption';
const Stack = createStackNavigator();
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import LogIn from './src/Screen/LogIn';
import LoggedIN from './src/Screen/LoggedIN';
import ImagePicker from './src/Screen/ImagePicker';
import VideoShow from './src/Screen/VideoShow';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={LogInSignUpOption} />
        <Stack.Screen name="SignUPScreen" component={FSignUp} />
        <Stack.Screen name="LogInScreen" component={LogIn} />
        <Stack.Screen name="LoggedIN" component={LoggedIN} />
        <Stack.Screen name="ImagePicker" component={ImagePicker} />
        <Stack.Screen name="VideoShow" component={VideoShow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
