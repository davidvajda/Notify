// import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Components/HomeScreen';
import AddNote from './Components/AddNote';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';

admob()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,
  })
  .then(() => {
    // Request config successfully set!
  });


const Snack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Snack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Snack.Screen name="HomeScreen" component={HomeScreen} />
        <Snack.Screen name="AddNote" component={AddNote} />
      </Snack.Navigator>
    </NavigationContainer>
  );
}
